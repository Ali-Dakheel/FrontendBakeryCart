// Category Types

import type { Product } from "./product";

export interface CategoryTranslation {
  id: number;
  category_id: number;
  locale: string;
  name: string;
  description?: string;
}

export interface Category {
  id: number;
  parent_id?: number;
  slug: string;
  icon?: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
  translations?: CategoryTranslation[];
  children?: Category[];
  parent?: Category;
  products?: Product[];
  // Computed properties from API
  name?: string;
  description?: string;
  products_count?: number;
}

// Extended category with parent name for display (used in ProductFilters)
export interface CategoryWithParent extends Category {
  parentName?: string;
  name?: string; // For display purposes
}
