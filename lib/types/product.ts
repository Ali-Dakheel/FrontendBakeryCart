// Product Types

import type { Category } from "./category";

export interface ProductTranslation {
  id: number;
  product_id: number;
  locale: string;
  name: string;
  description?: string;
  short_description?: string;
}

export interface ProductImage {
  id: number;
  product_id?: number;
  image_path?: string; // Legacy field
  url?: string; // New API field
  alt_text?: string;
  alt?: string; // New API field
  sort_order?: number;
  is_primary: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface ProductVariant {
  id: number;
  product_id?: number;
  name: string;
  quantity?: number;
  pack_quantity?: number;
  sku: string;
  price: number;
  stock_quantity?: number;
  is_available?: boolean;
  sort_order?: number;
  created_at?: string;
  updated_at?: string;
}

export interface Product {
  id: number;
  category_id?: number;
  sku: string;
  slug?: string;
  price: number;
  base_price?: number; // Legacy field, some APIs might use this
  compare_at_price?: number | null;
  stock_quantity?: number;
  in_stock?: boolean;
  is_available: boolean;
  is_featured: boolean;
  has_variants?: boolean;
  views_count?: number;
  sales_count?: number;
  created_at: string;
  updated_at?: string;
  translations?: ProductTranslation[];
  images?: ProductImage[];
  variants?: ProductVariant[];
  category?: Category;
  // Computed properties from API
  name?: string;
  description?: string;
  short_description?: string;
  primary_image?: string;
}
