
import type { ProductFilters } from "@/lib/api/products";

export const queryKeys = {
  products: {
    all: () => ["products"] as const,
    lists: () => [...queryKeys.products.all(), "list"] as const,
    list: (filters?: ProductFilters, locale?: string) => [...queryKeys.products.lists(), locale, { filters }] as const,
    detail: (id: number, locale?: string) => [...queryKeys.products.all(), id, locale] as const,
    featured: (limit?: number, locale?: string) => [...queryKeys.products.all(), "featured", locale, limit] as const,
    popular: (limit?: number, locale?: string) => [...queryKeys.products.all(), "popular", locale, limit] as const,
  },
  cart: {
    all: () => ["cart"] as const,
  },
  orders: {
    all: () => ["orders"] as const,
    lists: () => [...queryKeys.orders.all(), "list"] as const,
    list: (page: number) => [...queryKeys.orders.lists(), page] as const,
    detail: (id: number) => [...queryKeys.orders.all(), id] as const,
  },
  addresses: {
    all: () => ["addresses"] as const,
    lists: () => [...queryKeys.addresses.all(), "list"] as const,
    detail: (id: number) => [...queryKeys.addresses.all(), id] as const,
  },
  user: {
    all: () => ["user"] as const,
  },
  categories: {
    all: () => ["categories"] as const,
    list: (locale?: string) => [...queryKeys.categories.all(), "list", locale] as const,
    detail: (slug: string, locale?: string) => [...queryKeys.categories.all(), slug, locale] as const,
  },
  reviews: {
    all: () => ["reviews"] as const,
    list: (productId: number, page?: number) => [...queryKeys.reviews.all(), productId, page] as const,
  },
  wishlist: {
    all: () => ["wishlist"] as const,
    current: (locale?: string) => [...queryKeys.wishlist.all(), locale] as const,
  },
} as const;
