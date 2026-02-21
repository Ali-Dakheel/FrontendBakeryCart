import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import { categoryQueries } from "@/lib/queries/categories";

export function useCategories() {
  const locale = useLocale();
  return useQuery(categoryQueries.all(locale));
}

export function useCategory(slug: string) {
  const locale = useLocale();
  return useQuery({
    ...categoryQueries.detail(slug, locale),
    enabled: !!slug && slug !== "undefined", // Only fetch if slug is valid
  });
}
