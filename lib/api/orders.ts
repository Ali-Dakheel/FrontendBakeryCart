import { apiClient } from "./client";
import type { Order, CheckoutForm, ApiResponse, PaginatedResponse } from "@/lib/types";

// Get user orders
export async function getOrders(page: number = 1): Promise<PaginatedResponse<Order>> {
  const response = await apiClient.get<PaginatedResponse<Order>>(`/orders?page=${page}&include=items`);
  return response.data;
}

// Get single order
export async function getOrder(id: number): Promise<Order> {
  const response = await apiClient.get<ApiResponse<Order>>(`/orders/${id}?include=items,status_histories`);
  if (!response.data.success) {
    throw new Error(response.data.message || "Order not found");
  }
  return response.data.data;
}

// Create order (checkout)
export async function createOrder(data: CheckoutForm): Promise<Order> {
  const response = await apiClient.post<ApiResponse<Order>>("/orders", data);
  if (!response.data.success) {
    throw new Error(response.data.message || "Failed to create order");
  }
  return response.data.data;
}

// Cancel order
export async function cancelOrder(id: number, reason: string): Promise<Order> {
  const response = await apiClient.post<ApiResponse<Order>>(`/orders/${id}/cancel`, { reason });
  if (!response.data.success) {
    throw new Error(response.data.message || "Failed to cancel order");
  }
  return response.data.data;
}
