import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAddresses,
  getAddress,
  createAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} from "@/lib/api/addresses";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { ApiErrorResponse, AddressForm } from "@/lib/types";

// Get all addresses
export function useAddresses() {
  return useQuery({
    queryKey: ["addresses"],
    queryFn: getAddresses,
  });
}

// Get single address
export function useAddress(id: number) {
  return useQuery({
    queryKey: ["address", id],
    queryFn: () => getAddress(id),
    enabled: !!id,
  });
}

// Create address mutation
export function useCreateAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
      toast.success("Address added successfully");
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast.error(error.response?.data?.message || "Failed to add address");
    },
  });
}

// Update address mutation
export function useUpdateAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: AddressForm }) => updateAddress(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
      toast.success("Address updated successfully");
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast.error(error.response?.data?.message || "Failed to update address");
    },
  });
}

// Delete address mutation
export function useDeleteAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
      toast.success("Address deleted successfully");
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast.error(error.response?.data?.message || "Failed to delete address");
    },
  });
}

// Set default address mutation
export function useSetDefaultAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: setDefaultAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
      toast.success("Default address updated");
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast.error(error.response?.data?.message || "Failed to set default address");
    },
  });
}
