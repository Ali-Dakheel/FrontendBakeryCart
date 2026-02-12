// Order Types

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  product_variant_id?: number;
  product_name: string;
  product_sku: string;
  variant_name?: string;
  quantity: number;
  price_snapshot: number;
  subtotal: number;
  created_at: string;
  updated_at: string;
}

export interface OrderStatusHistory {
  id: number;
  order_id: number;
  status: string;
  changed_by?: number;
  notes?: string;
  created_at: string;
}

export interface Order {
  id: number;
  user_id?: number;
  order_number: string;
  status: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address_id?: number;
  shipping_street_address: string;
  shipping_building?: string;
  shipping_flat?: string;
  shipping_area: string;
  shipping_city: string;
  shipping_block?: string;
  subtotal: number;
  tax_amount: number;
  shipping_fee: number;
  coupon_discount: number;
  total: number;
  payment_method: string;
  payment_status: string;
  notes?: string;
  created_at: string;
  updated_at: string;
  items?: OrderItem[];
  status_histories?: OrderStatusHistory[];
}
