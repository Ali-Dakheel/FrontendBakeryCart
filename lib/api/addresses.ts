import { apiClient } from "./client";
import type { Address, AddressForm, ApiResponse } from "@/lib/types";

// Get all user addresses
export async function getAddresses(): Promise<Address[]> {
  const response = await apiClient.get<ApiResponse<Address[]>>("/addresses");
  return response.data.success ? response.data.data : [];
}

// Get single address
export async function getAddress(id: number): Promise<Address> {
  const response = await apiClient.get<ApiResponse<Address>>(`/addresses/${id}`);
  if (!response.data.success) {
    throw new Error(response.data.message || "Address not found");
  }
  return response.data.data;
}

// Create address
export async function createAddress(data: AddressForm): Promise<Address> {
  const response = await apiClient.post<ApiResponse<Address>>("/addresses", data);
  if (!response.data.success) {
    throw new Error(response.data.message || "Failed to create address");
  }
  return response.data.data;
}

// Update address
export async function updateAddress(id: number, data: AddressForm): Promise<Address> {
  const response = await apiClient.put<ApiResponse<Address>>(`/addresses/${id}`, data);
  if (!response.data.success) {
    throw new Error(response.data.message || "Failed to update address");
  }
  return response.data.data;
}

// Delete address
export async function deleteAddress(id: number): Promise<void> {
  await apiClient.delete(`/addresses/${id}`);
}

// Set default address
export async function setDefaultAddress(id: number): Promise<Address> {
  const response = await apiClient.patch<ApiResponse<Address>>(`/addresses/${id}/default`);
  if (!response.data.success) {
    throw new Error(response.data.message || "Failed to set default address");
  }
  return response.data.data;
}
