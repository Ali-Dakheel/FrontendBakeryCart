import { apiClient } from "./client";
import type { WishlistItem } from "@/lib/types";

export interface WishlistResponse {
  data: WishlistItem[];
  count: number;
}

export interface ToggleWishlistResponse {
  in_wishlist: boolean;
}

export async function getWishlist(): Promise<WishlistResponse> {
  const response = await apiClient.get<WishlistResponse>("wishlist");
  return response.data;
}

export async function toggleWishlist(productId: number): Promise<ToggleWishlistResponse> {
  const response = await apiClient.post<ToggleWishlistResponse>(
    `wishlist/products/${productId}`
  );
  return response.data;
}
