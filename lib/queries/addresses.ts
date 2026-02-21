import { queryOptions } from "@tanstack/react-query";
import { queryKeys } from "@/lib/utils/queryKeys";
import { getAddresses } from "@/lib/api/addresses";

export const addressQueries = {
  /**
   * All user addresses
   * Cache: 10 minutes (addresses don't change often)
   */
  all: () =>
    queryOptions({
      queryKey: queryKeys.addresses.all(),
      queryFn: getAddresses,
      staleTime: 10 * 60 * 1000,
      gcTime: 15 * 60 * 1000,
    }),
};
