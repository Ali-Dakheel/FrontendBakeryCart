import { queryOptions } from "@tanstack/react-query";
import { queryKeys } from "@/lib/utils/queryKeys";
import { getCurrentUser } from "@/lib/api/auth";

export const authQueries = {
  /**
   * Current user
   * Cache: 5 minutes
   */
  currentUser: () =>
    queryOptions({
      queryKey: queryKeys.user.all(),
      queryFn: getCurrentUser,
      retry: false,
      staleTime: 5 * 60 * 1000,
    }),
};
