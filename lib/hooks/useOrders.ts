import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getOrders, getOrder, createOrder, cancelOrder } from "@/lib/api/orders";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { ApiErrorResponse } from "@/lib/types";

// Get orders list
export function useOrders(page: number = 1) {
  return useQuery({
    queryKey: ["orders", page],
    queryFn: () => getOrders(page),
  });
}

// Get single order
export function useOrder(id: number) {
  return useQuery({
    queryKey: ["order", id],
    queryFn: () => getOrder(id),
    enabled: !!id,
  });
}

// Create order mutation
export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast.error(error.response?.data?.message || "Failed to create order");
    },
  });
}

// Cancel order mutation
export function useCancelOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, reason }: { id: number; reason: string }) =>
      cancelOrder(id, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Order cancelled successfully");
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast.error(error.response?.data?.message || "Failed to cancel order");
    },
  });
}
