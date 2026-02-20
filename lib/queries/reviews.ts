import { queryOptions } from "@tanstack/react-query";
import { queryKeys } from "@/lib/utils/queryKeys";
import { getProductReviews } from "@/lib/api/reviews";

export const reviewQueries = {
  list: (productId: number, page = 1) =>
    queryOptions({
      queryKey: queryKeys.reviews.list(productId, page),
      queryFn: () => getProductReviews(productId, page),
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    }),
};
