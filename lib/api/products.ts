import { apiClient } from "./client";
import type { Product, PaginatedResponse, ApiResponse } from "@/lib/types";

type SortField = "price" | "created_at" | "sales_count" | "name";
export type SortOption = SortField | `-${SortField}`;

export interface ProductFilters {
  page?: number;
  per_page?: number;
  search?: string;
  category_id?: number;
  is_featured?: boolean;
  is_available?: boolean;
  min_price?: number;
  max_price?: number;
  sort?: SortOption;
}

// Get paginated products list
export async function getProducts(filters?: ProductFilters): Promise<PaginatedResponse<Product>> {
  const params = new URLSearchParams();

  if (filters) {
    if (filters.page) params.append("page", filters.page.toString());
    if (filters.per_page) params.append("per_page", filters.per_page.toString());
    if (filters.search) params.append("filter[search]", filters.search);
    if (filters.category_id) params.append("filter[category_id]", filters.category_id.toString());
    if (filters.is_featured !== undefined) params.append("filter[is_featured]", filters.is_featured ? "1" : "0");
    if (filters.is_available !== undefined) params.append("filter[is_available]", filters.is_available ? "1" : "0");
    // Price range filters using separate callback filters
    if (filters.min_price !== undefined) {
      params.append("filter[min_price]", filters.min_price.toString());
    }
    if (filters.max_price !== undefined) {
      params.append("filter[max_price]", filters.max_price.toString());
    }
    if (filters.sort) params.append("sort", filters.sort);
  }

  const url = `products?${params.toString()}`;
  const response = await apiClient.get<PaginatedResponse<Product>>(url);
  return response.data;
}

// Get single product by ID
export async function getProduct(id: number): Promise<Product> {
  const response = await apiClient.get<ApiResponse<Product>>(`products/${id}?include=translations,images,variants,category`);
  if (!response.data.success) {
    throw new Error(response.data.message || "Product not found");
  }
  return response.data.data;
}

// Get featured products
export async function getFeaturedProducts(limit: number = 6): Promise<Product[]> {
  const response = await apiClient.get<ApiResponse<Product[]>>(`products/featured?limit=${limit}`);
  return response.data.success ? response.data.data : [];
}

// Get popular products
export async function getPopularProducts(limit: number = 6): Promise<Product[]> {
  const response = await apiClient.get<ApiResponse<Product[]>>(`products/popular?limit=${limit}`);
  return response.data.success ? response.data.data : [];
}
