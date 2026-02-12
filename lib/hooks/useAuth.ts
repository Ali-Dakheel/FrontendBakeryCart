import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCurrentUser, login, register, logout, changePassword } from "@/lib/api/auth";
import { toast } from "sonner";
import type { AxiosError } from "axios";

interface ApiErrorResponse {
  message?: string;
}

// Get current user
export function useUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Login mutation
export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user);

      // Backend handles cart merging automatically via cookies
      queryClient.invalidateQueries({ queryKey: ["cart"] });

      toast.success(`Welcome back, ${user.name}!`);
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast.error(error.response?.data?.message || "Login failed");
    },
  });
}

// Register mutation
export function useRegister() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: register,
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user);

      // Backend handles cart merging automatically via cookies
      queryClient.invalidateQueries({ queryKey: ["cart"] });

      toast.success(`Welcome to Easy Bake, ${user.name}!`);
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast.error(error.response?.data?.message || "Registration failed");
    },
  });
}

// Logout mutation
export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.setQueryData(["user"], null);

      // Cart token persists - user becomes guest with same cart
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

// Change password mutation
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
