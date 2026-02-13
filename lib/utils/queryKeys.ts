/**
 * Query Key Factory
 * Centralized query keys for TanStack Query
 *
 * Benefits:
 * - TypeScript autocomplete for all query keys
 * - No typos or key mismatches
 * - Hierarchical cache invalidation
 * - Single source of truth
 *
 * @example
 * // Use in hooks
 * queryKey: queryKeys.products.detail(id)
 *
 * // Invalidate all products
 * queryClient.invalidateQueries({ queryKey: queryKeys.products.all() })
 *
 * // Invalidate only product lists (not details)
 * queryClient.invalidateQueries({ queryKey: queryKeys.products.lists() })
 */

import type { ProductFilters } from "@/lib/api/products";

export const queryKeys = {
  products: {
    all: () => ["products"] as const,
    lists: () => [...queryKeys.products.all(), "list"] as const,
    list: (filters?: ProductFilters) => [...queryKeys.products.lists(), { filters }] as const,
    detail: (id: number) => [...queryKeys.products.all(), id] as const,
    featured: (limit?: number) => [...queryKeys.products.all(), "featured", limit] as const,
    popular: (limit?: number) => [...queryKeys.products.all(), "popular", limit] as const,
  },
  cart: {
    all: () => ["cart"] as const,
  },
  orders: {
    all: () => ["orders"] as const,
    lists: () => [...queryKeys.orders.all(), "list"] as const,
    list: (page: number) => [...queryKeys.orders.lists(), page] as const,
    detail: (id: number) => [...queryKeys.orders.all(), id] as const,
  },
  addresses: {
    all: () => ["addresses"] as const,
    lists: () => [...queryKeys.addresses.all(), "list"] as const,
    detail: (id: number) => [...queryKeys.addresses.all(), id] as const,
  },
  user: {
    all: () => ["user"] as const,
  },
  categories: {
    all: () => ["categories"] as const,
    lists: () => [...queryKeys.categories.all(), "list"] as const,
    detail: (slug: string) => [...queryKeys.categories.all(), slug] as const,
  },
} as const;
