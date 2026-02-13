/**
 * Category Query Options
 * Centralized query configurations for category-related queries
 */

import { queryOptions } from "@tanstack/react-query";
import { queryKeys } from "@/lib/utils/queryKeys";
import { getCategories, getCategory } from "@/lib/api/categories";

export const categoryQueries = {
  /**
   * All categories
   * Cache: 5 minutes (categories don't change often)
   */
  all: () =>
    queryOptions({
      queryKey: queryKeys.categories.all(),
      queryFn: getCategories,
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    }),

  /**
   * Single category by slug
   * Cache: 5 minutes
   */
  detail: (slug: string) =>
    queryOptions({
      queryKey: queryKeys.categories.detail(slug),
      queryFn: () => getCategory(slug),
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    }),
};
