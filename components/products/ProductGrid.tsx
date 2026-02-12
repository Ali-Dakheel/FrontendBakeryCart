"use client";

import { ProductCard } from "./ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import type { Product } from "@/lib/types";

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  emptyMessage?: string;
}

export function ProductGrid({ products, isLoading, emptyMessage = "No products found." }: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="space-y-4 animate-fade-in-up"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <Skeleton className="h-64 w-full rounded-lg" />
            <Skeleton className="h-6 w-3/4" />
            <div className="flex items-center justify-between">
              <Skeleton className="h-8 w-1/3" />
              <Skeleton className="h-8 w-20" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12 animate-fade-in">
        <p className="text-navy/60 text-lg">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  );
}
