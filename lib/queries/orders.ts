/**
 * Order Query Options
 * Centralized query configurations for order-related queries
 */

import { queryOptions } from "@tanstack/react-query";
import { queryKeys } from "@/lib/utils/queryKeys";
import { getOrders, getOrder } from "@/lib/api/orders";

export const orderQueries = {
  /**
   * Paginated orders list
   * Cache: 5 minutes (orders don't change often)
   */
  list: (page: number = 1) =>
    queryOptions({
      queryKey: queryKeys.orders.list(page),
      queryFn: () => getOrders(page),
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    }),

  /**
   * Single order detail
   * Cache: 5 minutes
   */
  detail: (id: number) =>
    queryOptions({
      queryKey: queryKeys.orders.detail(id),
      queryFn: () => getOrder(id),
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    }),
};
