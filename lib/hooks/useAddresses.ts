import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAddress,
  createAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} from "@/lib/api/addresses";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { ApiErrorResponse, AddressForm } from "@/lib/types";
import { queryKeys } from "@/lib/utils/queryKeys";
import { addressQueries } from "@/lib/queries/addresses";

export function useAddresses() {
  return useQuery(addressQueries.all());
}

export function useAddress(id: number) {
  return useQuery({
    queryKey: ["address", id],
    queryFn: () => getAddress(id),
    enabled: !!id,
  });
}

export function useCreateAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.addresses.all() });
      toast.success("Address added successfully");
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast.error(error.response?.data?.message || "Failed to add address");
    },
  });
}

export function useUpdateAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: AddressForm }) => updateAddress(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.addresses.all() });
      toast.success("Address updated successfully");
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast.error(error.response?.data?.message || "Failed to update address");
    },
  });
}

export function useDeleteAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.addresses.all() });
      toast.success("Address deleted successfully");
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast.error(error.response?.data?.message || "Failed to delete address");
    },
  });
}

export function useSetDefaultAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: setDefaultAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.addresses.all() });
      toast.success("Default address updated");
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast.error(error.response?.data?.message || "Failed to set default address");
    },
  });
}
