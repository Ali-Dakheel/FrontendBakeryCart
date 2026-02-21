import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAddress,
  createAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} from "@/lib/api/addresses";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
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
  const t = useTranslations("addresses");
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.addresses.all() });
      toast.success(t("addSuccess"));
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast.error(error.response?.data?.message || "Failed to add address");
    },
  });
}

export function useUpdateAddress() {
  const t = useTranslations("addresses");
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: AddressForm }) => updateAddress(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.addresses.all() });
      toast.success(t("updateSuccess"));
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast.error(error.response?.data?.message || "Failed to update address");
    },
  });
}

export function useDeleteAddress() {
  const t = useTranslations("addresses");
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.addresses.all() });
      toast.success(t("deleteSuccess"));
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast.error(error.response?.data?.message || "Failed to delete address");
    },
  });
}

export function useSetDefaultAddress() {
  const t = useTranslations("addresses");
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: setDefaultAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.addresses.all() });
      toast.success(t("setDefaultSuccess"));
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast.error(error.response?.data?.message || "Failed to set default address");
    },
  });
}
