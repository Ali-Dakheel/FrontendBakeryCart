import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrder, cancelOrder } from "@/lib/api/orders";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { ApiErrorResponse } from "@/lib/types";
import { queryKeys } from "@/lib/utils/queryKeys";
import { orderQueries } from "@/lib/queries/orders";

export function useOrders(page: number = 1) {
  return useQuery(orderQueries.list(page));
}

export function useOrder(id: number) {
  return useQuery({
    ...orderQueries.detail(id),
    enabled: !!id, 
  });
}

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.all() });
      queryClient.invalidateQueries({ queryKey: queryKeys.cart.all() });
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast.error(error.response?.data?.message || "Failed to create order");
    },
  });
}

export function useCancelOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, reason }: { id: number; reason: string }) =>
      cancelOrder(id, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.all() });
      toast.success("Order cancelled successfully");
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast.error(error.response?.data?.message || "Failed to cancel order");
    },
  });
}
