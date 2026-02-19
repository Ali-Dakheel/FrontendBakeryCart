import { apiClient } from "./client";
import type { Category, ApiResponse } from "@/lib/types";

// Get all categories (includes parent categories with their children)
export async function getCategories(): Promise<Category[]> {
  const response = await apiClient.get<ApiResponse<Category[]>>("categories?include=translations,children,children.translations");
  // List endpoints return { data: [...] } without a top-level success field
  return (response.data as { data?: Category[] }).data || [];
}

// Get single category by ID or slug with products
export async function getCategory(idOrSlug: number | string): Promise<Category> {
  const response = await apiClient.get<ApiResponse<Category>>(
    `categories/${idOrSlug}?include=translations,children.translations,parent.translations,products.translations,products.images`
  );
  if (!response.data.data) {
    throw new Error("Category not found");
  }
  return response.data.data;
}
