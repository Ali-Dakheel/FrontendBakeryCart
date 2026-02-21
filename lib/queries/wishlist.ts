import { queryOptions } from "@tanstack/react-query";
import { queryKeys } from "@/lib/utils/queryKeys";
import { getWishlist } from "@/lib/api/wishlist";

export const wishlistQueries = {
  current: (locale?: string) =>
    queryOptions({
      queryKey: queryKeys.wishlist.current(locale),
      queryFn: getWishlist,
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    }),
};
