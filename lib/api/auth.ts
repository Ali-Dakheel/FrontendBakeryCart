import { apiClient, initializeCsrf } from "./client";
import type { User, LoginForm, RegisterForm, ApiResponse } from "@/lib/types";

interface AuthResponse {
  user: User;
}

// Get current authenticated user
export async function getCurrentUser(): Promise<User> {
  const response = await apiClient.get<ApiResponse<{ user: User }>>("/auth/user");
  if (!response.data.data?.user) {
    throw new Error("User data not found");
  }
  return response.data.data.user;
}

// Login
export async function login(credentials: LoginForm): Promise<User> {
  // Initialize CSRF token first
  await initializeCsrf();

  const response = await apiClient.post<ApiResponse<AuthResponse>>("/auth/login", credentials);

  if (!response.data.data?.user) {
    throw new Error(response.data.message || "Login failed");
  }

  // Session cookie is set automatically by the backend
  return response.data.data.user;
}

// Register
export async function register(data: RegisterForm): Promise<User> {
  // Initialize CSRF token first
  await initializeCsrf();

  const response = await apiClient.post<ApiResponse<AuthResponse>>("/auth/register", data);

  if (!response.data.data?.user) {
    throw new Error(response.data.message || "Registration failed");
  }

  // Session cookie is set automatically by the backend
  return response.data.data.user;
}

// Logout
export async function logout(): Promise<void> {
  await apiClient.post("/auth/logout");
  // Cart token persists in HttpOnly cookie
  // Session cookie is cleared by backend
}

// Change password
export async function changePassword(data: {
  current_password: string;
  password: string;
  password_confirmation: string;
}): Promise<void> {
  const response = await apiClient.post<ApiResponse<null>>("/auth/change-password", data);

  if (!response.data.success) {
    throw new Error(response.data.message || "Password change failed");
  }
}
