// Review Types

export interface Review {
  id: number;
  product_id: number;
  user_id?: number;
  order_id?: number;
  rating: number;
  title?: string;
  comment?: string;
  is_verified_purchase: boolean;
  is_approved: boolean;
  helpful_count: number;
  admin_response?: string;
  responded_at?: string;
  user?: { id: number; name: string };
  created_at: string;
}

export interface ReviewStats {
  average_rating: number;
  reviews_count: number;
}
