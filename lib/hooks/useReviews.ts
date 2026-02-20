import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { reviewQueries } from "@/lib/queries/reviews";
import { queryKeys } from "@/lib/utils/queryKeys";
import { createReview, deleteReview, markReviewHelpful, type CreateReviewData } from "@/lib/api/reviews";

export function useProductReviews(productId: number, page = 1) {
  return useQuery(reviewQueries.list(productId, page));
}

export function useCreateReview(productId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateReviewData) => createReview(productId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.reviews.list(productId) });
      toast.success("Review submitted successfully");
    },
    onError: () => {
      toast.error("Failed to submit review. You may have already reviewed this product.");
    },
  });
}

export function useDeleteReview(productId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reviewId: number) => deleteReview(reviewId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.reviews.list(productId) });
      toast.success("Review deleted");
    },
    onError: () => {
      toast.error("Failed to delete review");
    },
  });
}

export function useMarkHelpful(productId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reviewId: number) => markReviewHelpful(reviewId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.reviews.list(productId) });
    },
    onError: () => {
      toast.error("Failed to mark review as helpful");
    },
  });
}
