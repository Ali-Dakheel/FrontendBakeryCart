/**
 * Product Query Options
 * Centralized query configurations for product-related queries
 *
 * Benefits:
 * - Reusable across hooks and components
 * - Testable independently
 * - Centralized cache time management
 * - Easy prefetching
 */

import { queryOptions } from "@tanstack/react-query";
import { queryKeys } from "@/lib/utils/queryKeys";
import {
  getProducts,
  getProduct,
  getFeaturedProducts,
  getPopularProducts,
  type ProductFilters,
} from "@/lib/api/products";

export const productQueries = {
  /**
   * Paginated products list with filters
   * Cache: 2 minutes (frequent user interaction)
   */
  list: (filters?: ProductFilters) =>
    queryOptions({
      queryKey: queryKeys.products.list(filters),
      queryFn: () => getProducts(filters),
      staleTime: 2 * 60 * 1000,
      gcTime: 5 * 60 * 1000,
    }),

  /**
   * Single product detail
   * Cache: 5 minutes (details update occasionally)
   */
  detail: (id: number) =>
    queryOptions({
      queryKey: queryKeys.products.detail(id),
      queryFn: () => getProduct(id),
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    }),

  /**
   * Featured products
   * Cache: 15 minutes (rarely change)
   */
  featured: (limit?: number) =>
    queryOptions({
      queryKey: queryKeys.products.featured(limit),
      queryFn: () => getFeaturedProducts(limit),
      staleTime: 15 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
    }),

  /**
   * Popular products
   * Cache: 10 minutes (change occasionally)
   */
  popular: (limit?: number) =>
    queryOptions({
      queryKey: queryKeys.products.popular(limit),
      queryFn: () => getPopularProducts(limit),
      staleTime: 10 * 60 * 1000,
      gcTime: 20 * 60 * 1000,
    }),
};
