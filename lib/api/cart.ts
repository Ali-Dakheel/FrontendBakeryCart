import { apiClient, initializeCsrf } from "./client";
import type { Cart, CartItem, ApiResponse } from "@/lib/types";

// Get current cart
export async function getCart(): Promise<Cart> {
  const response = await apiClient.get<ApiResponse<{ cart: Cart }>>("/cart");
  if (!response.data.success) {
    throw new Error(response.data.message || "Cart not found");
  }
  return response.data.data.cart;
}

// Add item to cart
export async function addToCart(data: {
  product_id: number;
  product_variant_id?: number;
  quantity: number;
}): Promise<CartItem> {
  // Initialize CSRF token for guests
  await initializeCsrf();

  const response = await apiClient.post<ApiResponse<{ item: CartItem }>>("/cart/items", data);
  if (!response.data.success) {
    throw new Error(response.data.message || "Failed to add item to cart");
  }
  return response.data.data.item;
}

// Update cart item quantity
export async function updateCartItem(itemId: number, quantity: number): Promise<CartItem> {
  await initializeCsrf();

  const response = await apiClient.patch<ApiResponse<{ item: CartItem }>>(`/cart/items/${itemId}`, { quantity });
  if (!response.data.success) {
    throw new Error(response.data.message || "Failed to update cart item");
  }
  return response.data.data.item;
}

// Remove item from cart
export async function removeFromCart(itemId: number): Promise<void> {
  await initializeCsrf();
  await apiClient.delete(`/cart/items/${itemId}`);
}

// Clear cart
export async function clearCart(): Promise<void> {
  await initializeCsrf();
  await apiClient.delete("/cart");
}
