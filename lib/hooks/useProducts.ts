import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import { productQueries } from "@/lib/queries/products";
import type { ProductFilters } from "@/lib/api/products";

export function useProducts(filters?: ProductFilters) {
  const locale = useLocale();
  return useQuery(productQueries.list(filters, locale));
}

export function useProduct(id: number) {
  const locale = useLocale();
  return useQuery({
    ...productQueries.detail(id, locale),
    enabled: !!id,
  });
}

export function useFeaturedProducts(limit?: number) {
  const locale = useLocale();
  return useQuery(productQueries.featured(limit, locale));
}

export function usePopularProducts(limit?: number) {
  const locale = useLocale();
  return useQuery(productQueries.popular(limit, locale));
}

export function useProductSuspense(id: number) {
  const locale = useLocale();
  return useSuspenseQuery(productQueries.detail(id, locale));
}
