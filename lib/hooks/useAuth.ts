import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { login, register, logout, changePassword } from "@/lib/api/auth";
import { toast } from "sonner";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "@/lib/types/api";
import { queryKeys } from "@/lib/utils/queryKeys";
import { authQueries } from "@/lib/queries/auth";

export function useUser() {
  return useQuery(authQueries.currentUser());
}

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: (user) => {
      queryClient.setQueryData(queryKeys.user.all(), user);

      queryClient.invalidateQueries({ queryKey: ["cart"] });

      toast.success(`Welcome back, ${user.name}!`);
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast.error(error.response?.data?.message || "Login failed");
    },
  });
}

export function useRegister() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: register,
    onSuccess: (user) => {
      queryClient.setQueryData(queryKeys.user.all(), user);

      queryClient.invalidateQueries({ queryKey: ["cart"] });

      toast.success(`Welcome to Easy Bake, ${user.name}!`);
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      const message = error.response?.data?.message || "Registration failed";

      if (error.response?.data?.errors) {
        const validationErrors = Object.values(error.response.data.errors).flat();
        validationErrors.forEach(err => toast.error(err));
      } else {
        toast.error(message);
      }
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.setQueryData(queryKeys.user.all(), null);

      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["addresses"] });

      toast.success("Logged out successfully");
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast.error(error.response?.data?.message || "Logout failed");
    },
  });
}

export function useChangePassword() {
  return useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      toast.success("Password changed successfully");
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast.error(error.response?.data?.message || "Failed to change password");
    },
  });
}
