/**
 * Server-side API functions for Server Components
 * Uses native fetch with Next.js caching and revalidation
 */

import type { Product, ApiResponse } from "@/lib/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

/**
 * Get featured products for server components
 * Cached for 15 minutes (featured products rarely change)
 */
export async function getFeaturedProductsServer(limit: number = 6): Promise<Product[]> {
  try {
    const response = await fetch(`${API_URL}/api/v1/products/featured?limit=${limit}`, {
      next: {
        revalidate: 900, // 15 minutes
        tags: ['products', 'featured']
      },
      headers: {
        'Accept': 'application/json',
        'Accept-Language': 'en',
      },
    });

    if (!response.ok) {
      console.error(`Failed to fetch featured products: ${response.status}`);
      return [];
    }

    const data: ApiResponse<Product[]> = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }
}

/**
 * Get popular products for server components
 * Cached for 10 minutes
 */
export async function getPopularProductsServer(limit: number = 6): Promise<Product[]> {
  try {
    const response = await fetch(`${API_URL}/api/v1/products/popular?limit=${limit}`, {
      next: {
        revalidate: 600, // 10 minutes
        tags: ['products', 'popular']
      },
      headers: {
        'Accept': 'application/json',
        'Accept-Language': 'en',
      },
    });

    if (!response.ok) {
      console.error(`Failed to fetch popular products: ${response.status}`);
      return [];
    }

    const data: ApiResponse<Product[]> = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching popular products:', error);
    return [];
  }
}

/**
 * Get single product for server components
 * Cached for 5 minutes
 */
export async function getProductServer(id: number): Promise<Product | null> {
  try {
    const response = await fetch(
      `${API_URL}/api/v1/products/${id}?include=translations,images,variants,category`,
      {
        next: {
          revalidate: 300, // 5 minutes
          tags: ['products', `product-${id}`]
        },
        headers: {
          'Accept': 'application/json',
          'Accept-Language': 'en',
        },
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Failed to fetch product: ${response.status}`);
    }

    const data: ApiResponse<Product> = await response.json();
    return data.data || null;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    return null;
  }
}
