// Cart Types

import type { Product, ProductVariant } from "./product";

export interface CartItem {
  id: number;
  cart_id: number;
  product_id: number;
  product_variant_id?: number;
  quantity: number;
  price_snapshot: number;
  created_at: string;
  updated_at: string;
  product?: Product;
  variant?: ProductVariant;
}

export interface Cart {
  id: number;
  user_id?: number;
  session_id?: string;
  expires_at?: string;
  created_at: string;
  updated_at: string;
  items?: CartItem[];
}
