import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCart, addToCart, updateCartItem, removeFromCart, clearCart } from "@/lib/api/cart";
import { toast } from "sonner";
import type { AxiosError } from "axios";
import type { Cart, CartItem, ApiErrorResponse } from "@/lib/types";

// Get cart query
export function useCart() {
  return useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
    retry: 1,
  });
}

// Add to cart mutation with optimistic updates
export function useAddToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addToCart,
    onMutate: async (newItem) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["cart"] });

      // Snapshot previous value
      const previousCart = queryClient.getQueryData<{ cart: Cart }>(["cart"]);

      // Optimistically add item to cart
      queryClient.setQueryData<{ cart: Cart }>(["cart"], (old) => {
        if (!old?.cart) return old;

        // Check if item already exists in cart
        const existingItemIndex = old.cart.items?.findIndex(
          (item: CartItem) =>
            item.product_id === newItem.product_id &&
            item.product_variant_id === newItem.product_variant_id
        );

        let updatedItems: CartItem[];

        if (existingItemIndex !== undefined && existingItemIndex !== -1) {
          // Update existing item quantity
          updatedItems = old.cart.items?.map((item: CartItem, index: number) =>
            index === existingItemIndex
              ? { ...item, quantity: item.quantity + newItem.quantity }
              : item
          ) || [];
        } else {
          // Add new item (we'll use temporary data until server responds)
          const tempItem: Partial<CartItem> = {
            id: Date.now(), // Temporary ID
            product_id: newItem.product_id,
            product_variant_id: newItem.product_variant_id,
            quantity: newItem.quantity,
            // Other fields will be filled by server response
          };
          updatedItems = [...(old.cart.items || []), tempItem as CartItem];
        }

        return {
          cart: {
            ...old.cart,
            items: updatedItems,
          },
        };
      });

      return { previousCart };
    },
    onSuccess: () => {
      toast.success("Added to cart!");
    },
    onError: (error: AxiosError<ApiErrorResponse>, _variables, context) => {
      // Rollback on error
      if (context?.previousCart) {
        queryClient.setQueryData(["cart"], context.previousCart);
      }
      toast.error(error.response?.data?.message || "Failed to add item to cart");
    },
    onSettled: () => {
      // Refresh cart with server data
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}

// Update cart item mutation with optimistic updates
export function useUpdateCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ itemId, quantity }: { itemId: number; quantity: number }) =>
      updateCartItem(itemId, quantity),
    onMutate: async ({ itemId, quantity }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["cart"] });

      // Snapshot previous value
      const previousCart = queryClient.getQueryData<{ cart: Cart }>(["cart"]);

      // Optimistically update cart
      queryClient.setQueryData<{ cart: Cart }>(["cart"], (old) => {
        if (!old?.cart) return old;

        return {
          cart: {
            ...old.cart,
            items: old.cart.items?.map((item: CartItem) =>
              item.id === itemId
                ? { ...item, quantity, subtotal: item.price_snapshot * quantity }
                : item
            ),
          },
        };
      });

      return { previousCart };
    },
    onError: (error: AxiosError<ApiErrorResponse>, _variables, context) => {
      // Rollback on error
      if (context?.previousCart) {
        queryClient.setQueryData(["cart"], context.previousCart);
      }
      toast.error(error.response?.data?.message || "Failed to update cart item");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}

// Remove from cart mutation with optimistic updates
export function useRemoveFromCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeFromCart,
    onMutate: async (itemId: number) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["cart"] });

      // Snapshot previous value
      const previousCart = queryClient.getQueryData<{ cart: Cart }>(["cart"]);

      // Optimistically remove item
      queryClient.setQueryData<{ cart: Cart }>(["cart"], (old) => {
        if (!old?.cart) return old;

        return {
          cart: {
            ...old.cart,
            items: old.cart.items?.filter((item: CartItem) => item.id !== itemId),
          },
        };
      });

      return { previousCart };
    },
    onSuccess: () => {
      toast.success("Item removed from cart");
    },
    onError: (error: AxiosError<ApiErrorResponse>, _variables, context) => {
      // Rollback on error
      if (context?.previousCart) {
        queryClient.setQueryData(["cart"], context.previousCart);
      }
      toast.error(error.response?.data?.message || "Failed to remove item");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}

// Clear cart mutation
export function useClearCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: clearCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Cart cleared");
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast.error(error.response?.data?.message || "Failed to clear cart");
    },
  });
}
