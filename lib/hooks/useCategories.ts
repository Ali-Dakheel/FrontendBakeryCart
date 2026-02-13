import { useQuery } from "@tanstack/react-query";
import { categoryQueries } from "@/lib/queries/categories";

export function useCategories() {
  return useQuery(categoryQueries.all());
}

export function useCategory(slug: string) {
  return useQuery({
    ...categoryQueries.detail(slug),
    enabled: !!slug && slug !== "undefined", // Only fetch if slug is valid
  });
}
