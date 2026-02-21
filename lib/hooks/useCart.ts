import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addToCart, updateCartItem, removeFromCart, clearCart } from "@/lib/api/cart";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import type { AxiosError } from "axios";
import type { Cart, CartItem, ApiErrorResponse } from "@/lib/types";
import { queryKeys } from "@/lib/utils/queryKeys";
import { cartQueries } from "@/lib/queries/cart";

export function useCart() {
  return useQuery(cartQueries.current());
}

export function useAddToCart() {
  const t = useTranslations("cart");
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addToCart,
    onMutate: async (newItem) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.cart.all() });

      const previousCart = queryClient.getQueryData<{ cart: Cart }>(queryKeys.cart.all());

      queryClient.setQueryData<{ cart: Cart }>(queryKeys.cart.all(), (old) => {
        if (!old?.cart) return old;

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
      toast.success(t("itemAdded"));
    },
    onError: (error: AxiosError<ApiErrorResponse>, _variables, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(queryKeys.cart.all(), context.previousCart);
      }
      toast.error(error.response?.data?.message || "Failed to add item to cart");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cart.all() });
    },
  });
}

export function useUpdateCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ itemId, quantity }: { itemId: number; quantity: number }) =>
      updateCartItem(itemId, quantity),
    onMutate: async ({ itemId, quantity }) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.cart.all() });

      const previousCart = queryClient.getQueryData<{ cart: Cart }>(queryKeys.cart.all());

      queryClient.setQueryData<{ cart: Cart }>(queryKeys.cart.all(), (old) => {
        if (!old?.cart) return old;

        return {
          cart: {
            ...old.cart,
            items: old.cart.items?.map((item: CartItem) =>
              item.id === itemId
                ? { ...item, quantity, subtotal: Number(item.price_snapshot) * quantity }
                : item
            ),
          },
        };
      });

      return { previousCart };
    },
    onError: (error: AxiosError<ApiErrorResponse>, _variables, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(queryKeys.cart.all(), context.previousCart);
      }
      toast.error(error.response?.data?.message || "Failed to update cart item");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cart.all() });
    },
  });
}

export function useRemoveFromCart() {
  const t = useTranslations("cart");
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeFromCart,
    onMutate: async (itemId: number) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.cart.all() });

      const previousCart = queryClient.getQueryData<{ cart: Cart }>(queryKeys.cart.all());

      queryClient.setQueryData<{ cart: Cart }>(queryKeys.cart.all(), (old) => {
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
      toast.success(t("itemRemoved"));
    },
    onError: (error: AxiosError<ApiErrorResponse>, _variables, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(queryKeys.cart.all(), context.previousCart);
      }
      toast.error(error.response?.data?.message || "Failed to remove item");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cart.all() });
    },
  });
}

export function useClearCart() {
  const t = useTranslations("cart");
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: clearCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cart.all() });
      toast.success(t("cleared"));
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast.error(error.response?.data?.message || "Failed to clear cart");
    },
  });
}
