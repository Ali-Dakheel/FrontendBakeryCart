import { queryOptions } from "@tanstack/react-query";
import { queryKeys } from "@/lib/utils/queryKeys";
import { getWishlist } from "@/lib/api/wishlist";

export const wishlistQueries = {
  current: () =>
    queryOptions({
      queryKey: queryKeys.wishlist.all(),
      queryFn: getWishlist,
      staleTime: 2 * 60 * 1000,
      gcTime: 5 * 60 * 1000,
    }),
};
