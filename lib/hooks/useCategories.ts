import { useQuery } from "@tanstack/react-query";
import { getCategories, getCategory } from "@/lib/api/categories";

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 5, // 5 minutes - categories don't change often
  });
}

export function useCategory(slug: string) {
  return useQuery({
    queryKey: ["category", slug],
    queryFn: () => getCategory(slug),
    enabled: !!slug && slug !== "undefined", // Only fetch if slug is valid
    staleTime: 1000 * 60 * 5, // 5 minutes - categories don't change often
  });
}
