import { queryOptions } from "@tanstack/react-query";
import { queryKeys } from "@/lib/utils/queryKeys";
import { getCategories, getCategory } from "@/lib/api/categories";

export const categoryQueries = {
  all: (locale?: string) =>
    queryOptions({
      queryKey: queryKeys.categories.list(locale),
      queryFn: getCategories,
      staleTime: 60 * 60 * 1000,
      gcTime: 120 * 60 * 1000,
    }),

  detail: (slug: string, locale?: string) =>
    queryOptions({
      queryKey: queryKeys.categories.detail(slug, locale),
      queryFn: () => getCategory(slug),
      staleTime: 60 * 60 * 1000,
      gcTime: 120 * 60 * 1000,
    }),
};
