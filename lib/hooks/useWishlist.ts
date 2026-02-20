import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { wishlistQueries } from "@/lib/queries/wishlist";
import { queryKeys } from "@/lib/utils/queryKeys";
import { toggleWishlist } from "@/lib/api/wishlist";

export function useWishlist() {
  return useQuery(wishlistQueries.current());
}

export function useToggleWishlist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: number) => toggleWishlist(productId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.wishlist.all() });
      toast.success(data.in_wishlist ? "Added to wishlist" : "Removed from wishlist");
    },
    onError: () => {
      toast.error("Failed to update wishlist");
    },
  });
}
