/**
 * Server-side API functions for Server Components
 * Uses native fetch with Next.js caching and revalidation
 */
import 'server-only';

import type { Product, Category } from "@/lib/types";

const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000/api/v1')
  .replace(/\/api\/v1$/, '')
  .replace(/\/api$/, '');

/**
 * Get featured products for server components
 * Cached for 15 minutes (featured products rarely change)
 */
export async function getFeaturedProductsServer(limit: number = 6): Promise<Product[]> {
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
    throw new Error(`Failed to fetch featured products: ${response.status}`);
  }

  const data = await response.json() as { data?: Product[]; success?: boolean };
  return data.data || [];
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
      return [];
    }

    const data = await response.json() as { data?: Product[] };
    return data.data || [];
  } catch {
    return [];
  }
}

/**
 * Get single product for server components
 * Cached for 5 minutes
 */
export async function getProductServer(id: number, locale = 'en'): Promise<Product | null> {
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
          'Accept-Language': locale,
        },
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Failed to fetch product: ${response.status}`);
    }

    const data = await response.json() as { data?: Product };
    return data.data ?? null;
  } catch {
    return null;
  }
}

/**
 * Get single category by slug for server components
 * Cached for 10 minutes
 */
export async function getCategoryServer(slug: string, locale = 'en'): Promise<Category | null> {
  try {
    const response = await fetch(
      `${API_URL}/api/v1/categories/${slug}?include=translations,children,children.translations,products,products.translations,products.images`,
      {
        next: {
          revalidate: 600, // 10 minutes
          tags: ['categories', `category-${slug}`]
        },
        headers: {
          'Accept': 'application/json',
          'Accept-Language': locale,
        },
      }
    );

    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error(`Failed to fetch category: ${response.status}`);
    }

    const data = await response.json() as { data?: Category };
    return data.data ?? null;
  } catch {
    return null;
  }
}
