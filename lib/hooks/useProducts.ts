import { useQuery } from "@tanstack/react-query";
import {
  getProducts,
  getProduct,
  getFeaturedProducts,
  getPopularProducts,
  type ProductFilters,
} from "@/lib/api/products";

// Get paginated products list
export function useProducts(filters?: ProductFilters) {
  return useQuery({
    queryKey: ["products", filters],
    queryFn: () => getProducts(filters),
    staleTime: 2 * 60 * 1000, // 2 minutes - filtered lists change with user interaction
    gcTime: 5 * 60 * 1000, // Keep in cache for 5 minutes
  });
}

// Get single product
export function useProduct(id: number) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,   // 5 minutes - product details update occasionally
    gcTime: 10 * 60 * 1000,      // Keep in cache for 10 minutes
  });
}

// Get featured products
export function useFeaturedProducts(limit?: number) {
  return useQuery({
    queryKey: ["products", "featured", limit],
    queryFn: () => getFeaturedProducts(limit),
    staleTime: 15 * 60 * 1000,  // 15 minutes - featured products rarely change
    gcTime: 30 * 60 * 1000,      // Keep in cache for 30 minutes
  });
}

// Get popular products
export function usePopularProducts(limit?: number) {
  return useQuery({
    queryKey: ["products", "popular", limit],
    queryFn: () => getPopularProducts(limit),
    staleTime: 10 * 60 * 1000,  // 10 minutes - popular products change occasionally
    gcTime: 20 * 60 * 1000,      // Keep in cache for 20 minutes
  });
}
