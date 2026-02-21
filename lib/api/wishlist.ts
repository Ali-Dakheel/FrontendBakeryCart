import { apiClient } from "./client";
import type { WishlistItem } from "@/lib/types";

export async function getWishlist(): Promise<WishlistItem[]> {
  const response = await apiClient.get("wishlist");
  return (response.data as { data?: { wishlist?: WishlistItem[] } }).data?.wishlist ?? [];
}

export async function toggleWishlist(productId: number): Promise<boolean> {
  const response = await apiClient.post(`wishlist/products/${productId}`);
  return (response.data as { data?: { in_wishlist?: boolean } }).data?.in_wishlist ?? false;
}
