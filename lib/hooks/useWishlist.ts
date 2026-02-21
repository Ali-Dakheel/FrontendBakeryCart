import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import { toast } from "sonner";
import { wishlistQueries } from "@/lib/queries/wishlist";
import { queryKeys } from "@/lib/utils/queryKeys";
import { toggleWishlist } from "@/lib/api/wishlist";

export function useWishlist() {
  const locale = useLocale();
  return useQuery(wishlistQueries.current(locale));
}

export function useToggleWishlist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: number) => toggleWishlist(productId),
    onSuccess: (inWishlist) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.wishlist.all() });
      toast.success(inWishlist ? "Added to wishlist" : "Removed from wishlist");
    },
    onError: () => {
      toast.error("Failed to update wishlist");
    },
  });
}
