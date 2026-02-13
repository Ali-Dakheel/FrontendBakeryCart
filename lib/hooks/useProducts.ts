import { useQuery } from "@tanstack/react-query";
import { productQueries } from "@/lib/queries/products";
import type { ProductFilters } from "@/lib/api/products";

// Get paginated products list
export function useProducts(filters?: ProductFilters) {
  return useQuery(productQueries.list(filters));
}

// Get single product
export function useProduct(id: number) {
  return useQuery({
    ...productQueries.detail(id),
    enabled: !!id, // Hook-specific logic
  });
}

// Get featured products
export function useFeaturedProducts(limit?: number) {
  return useQuery(productQueries.featured(limit));
}

// Get popular products
export function usePopularProducts(limit?: number) {
  return useQuery(productQueries.popular(limit));
}
