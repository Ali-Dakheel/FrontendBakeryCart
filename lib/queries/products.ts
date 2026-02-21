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
  list: (filters?: ProductFilters, locale?: string) =>
    queryOptions({
      queryKey: queryKeys.products.list(filters, locale),
      queryFn: () => getProducts(filters),
      staleTime: 30 * 60 * 1000,
      gcTime: 60 * 60 * 1000,
    }),

  detail: (id: number, locale?: string) =>
    queryOptions({
      queryKey: queryKeys.products.detail(id, locale),
      queryFn: () => getProduct(id),
      staleTime: 30 * 60 * 1000,
      gcTime: 60 * 60 * 1000,
    }),

  featured: (limit?: number, locale?: string) =>
    queryOptions({
      queryKey: queryKeys.products.featured(limit, locale),
      queryFn: () => getFeaturedProducts(limit),
      staleTime: 60 * 60 * 1000,
      gcTime: 120 * 60 * 1000,
    }),

  popular: (limit?: number, locale?: string) =>
    queryOptions({
      queryKey: queryKeys.products.popular(limit, locale),
      queryFn: () => getPopularProducts(limit),
      staleTime: 45 * 60 * 1000,
      gcTime: 90 * 60 * 1000,
    }),
};
