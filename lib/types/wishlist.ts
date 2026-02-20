// Wishlist Types

export interface WishlistItem {
  id: number;
  product: {
    id: number;
    sku: string;
    name: string;
    price: number;
    image?: string;
    is_available: boolean;
  };
  added_at: string;
}
