import { queryOptions } from "@tanstack/react-query";
import { queryKeys } from "@/lib/utils/queryKeys";
import { getCart } from "@/lib/api/cart";

export const cartQueries = {
  /**
   * Current cart
   * Cache: Minimal (cart changes frequently)
   */
  current: () =>
    queryOptions({
      queryKey: queryKeys.cart.all(),
      queryFn: getCart,
      retry: 1,
    }),
};
