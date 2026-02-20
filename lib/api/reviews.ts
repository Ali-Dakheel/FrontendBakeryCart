import { apiClient } from "./client";
import type { ApiResponse, Review, ReviewStats } from "@/lib/types";

// Shape returned by the backend
interface ReviewsApiData {
  reviews: Review[];
  meta: { current_page: number; last_page: number; per_page: number; total: number };
  product_stats: ReviewStats;
}

// Normalized shape used by the frontend
export interface ReviewsResponse {
  data: Review[];
  stats: ReviewStats;
  meta?: { current_page: number; last_page: number; total: number };
}

export interface CreateReviewData {
  rating: number;
  title?: string;
  comment?: string;
}

export async function getProductReviews(productId: number, page = 1): Promise<ReviewsResponse> {
  const response = await apiClient.get<{ data: ReviewsApiData }>(
    `products/${productId}/reviews?page=${page}`
  );
  const { reviews, product_stats, meta } = response.data.data;
  return {
    data: reviews ?? [],
    stats: product_stats,
    meta,
  };
}

export async function createReview(productId: number, data: CreateReviewData): Promise<Review> {
  const response = await apiClient.post<ApiResponse<Review>>(
    `products/${productId}/reviews`,
    data
  );
  if (!response.data.data) throw new Error("Failed to create review");
  return response.data.data;
}

export async function deleteReview(reviewId: number): Promise<void> {
  await apiClient.delete(`reviews/${reviewId}`);
}

export async function markReviewHelpful(reviewId: number): Promise<void> {
  await apiClient.post(`reviews/${reviewId}/helpful`);
}
