import axios from "axios";
import axiosRetry from "axios-retry";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";
const BASE_URL = API_URL.replace("/api/v1", "").replace("/api", ""); // Get base URL without /api

// Configure axios defaults for Laravel Sanctum SPA authentication
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

// Create axios instance
export const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  withXSRFToken: true, // Automatically read XSRF-TOKEN cookie and send as X-XSRF-TOKEN header
  timeout: 30000, // 30 second timeout for all requests
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Configure retry logic for transient failures
axiosRetry(apiClient, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error) => {
    // Retry on network errors or 5xx server errors
    return axiosRetry.isNetworkOrIdempotentRequestError(error) ||
           (error.response?.status ?? 0) >= 500;
  },
  onRetry: (retryCount, error, requestConfig) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[API] Retry attempt ${retryCount} for ${requestConfig.url}`);
    }
  },
});

// Request interceptor - Add locale header and logging
apiClient.interceptors.request.use(
  (config) => {
    // Add Accept-Language header based on current locale from URL pathname
    // URL format: /en/products or /ar/categories
    if (typeof window !== 'undefined') {
      const pathSegments = window.location.pathname.split('/').filter(Boolean);
      const locale = pathSegments[0] === 'ar' ? 'ar' : 'en'; // Default to 'en' if not 'ar'
      config.headers['Accept-Language'] = locale;
    }

    if (process.env.NODE_ENV === 'development') {
      console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`);
    }
    return config;
  },
  (error) => {
    console.error("[API] Request error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors
apiClient.interceptors.response.use(
  (response) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[API] ✓ ${response.config.method?.toUpperCase()} ${response.config.url}`);
    }
    return response;
  },
  (error) => {
    // Handle timeout errors
    if (error.code === 'ECONNABORTED') {
      console.error("[API] Request timeout");
      error.message = "Request timed out. Please try again.";
    }

    // Handle 419 CSRF token mismatch (Laravel)
    if (error.response?.status === 419) {
      if (process.env.NODE_ENV === 'development') {
        console.error("[API] CSRF token mismatch. Please refresh the page.");
      }
      error.message = "Session expired. Please refresh the page.";
    }

    // Handle distinct HTTP status codes with user-friendly messages
    const status = error.response?.status;
    if (status === 400) error.message = "Bad request. Please check your input.";
    if (status === 403) error.message = "You do not have permission to do this.";
    if (status === 404) error.message = "The requested item was not found.";
    if (status === 429) {
      console.error("[API] Rate limit exceeded");
      error.message = "Too many requests. Please slow down.";
    }
    if (status === 500) error.message = "Server error. Please try again later.";
    if (status === 503) error.message = "Service temporarily unavailable. Please try again later.";

    // Handle network errors
    if (!error.response && error.message === 'Network Error') {
      error.message = "Network error. Please check your connection.";
    }

    // Note: We don't auto-redirect on 401 since guest users are allowed
    // Each component will handle authentication requirements individually

    // Only log unexpected errors in development (skip 401 as it's expected for guests)
    if (process.env.NODE_ENV === 'development' && error.response?.status !== 401) {
      console.error(`[API] ✗ ${error.config?.method?.toUpperCase()} ${error.config?.url}`, error.message);
    }

    return Promise.reject(error);
  }
);

// Initialize CSRF cookie for Sanctum
export async function initializeCsrf() {
  try {
    await axios.get(`${BASE_URL}/sanctum/csrf-cookie`, {
      withCredentials: true,
    });
  } catch (error) {
    // Only log errors in development
    if (process.env.NODE_ENV === 'development') {
      console.error("[CSRF] Failed to initialize CSRF token:", error);
    }
  }
}
