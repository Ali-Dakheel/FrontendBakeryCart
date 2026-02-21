import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { productQueries } from "@/lib/queries/products";
import type { ProductFilters } from "@/lib/api/products";

export function useProducts(filters?: ProductFilters) {
  return useQuery(productQueries.list(filters));
}

export function useProduct(id: number) {
  return useQuery({
    ...productQueries.detail(id),
    enabled: !!id, 
  });
}

export function useFeaturedProducts(limit?: number) {
  return useQuery(productQueries.featured(limit));
}

export function usePopularProducts(limit?: number) {
  return useQuery(productQueries.popular(limit));
}

export function useProductSuspense(id: number) {
  return useSuspenseQuery(productQueries.detail(id));
}
