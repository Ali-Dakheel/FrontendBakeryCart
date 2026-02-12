"use client";

import { useCategories } from "@/lib/hooks/useCategories";
import Link from "next/link";
import { ChevronRight, Package } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function CategoriesPage() {
  const { data: categories, isLoading } = useCategories();

  // Get only parent categories (no parent_id)
  const parentCategories = categories?.filter((cat) => !cat.parent) || [];

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <Skeleton className="h-12 w-64 mb-4" />
          <Skeleton className="h-6 w-96" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-48 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-gradient-to-br from-cream via-cream-dark to-flour border-b border-border/40">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="text-center space-y-4">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-navy">
              Browse by Category
            </h1>
            <p className="text-navy/70 max-w-2xl mx-auto text-base md:text-lg">
              Discover our wide selection of artisan baked goods, from buttery croissants to wholesome breads
            </p>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {parentCategories.map((category) => {
          // Skip categories without slugs (database needs reseeding)
          if (!category.slug) return null;

          const hasChildren = categories?.some((cat) => cat.parent?.id === category.id);
          const productCount = category.products_count || 0;

          return (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="group relative bg-white rounded-xl border-2 border-sky/20 p-8 hover:border-sky hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Icon */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-sky/10 to-sky-dark/10 flex items-center justify-center text-4xl group-hover:scale-110 transition-transform">
                  {category.icon || "📦"}
                </div>
                <ChevronRight className="w-6 h-6 text-sky opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Content */}
              <h2 className="font-display text-2xl font-bold text-navy mb-2 group-hover:text-sky transition-colors">
                {category.name}
              </h2>
              <p className="text-navy/60 text-sm mb-4 line-clamp-2">
                {category.description}
              </p>

              {/* Meta Info */}
              <div className="flex items-center gap-4 text-xs text-navy/50">
                {hasChildren && (
                  <span className="flex items-center gap-1">
                    <Package className="w-3 h-3" />
                    Subcategories available
                  </span>
                )}
                {productCount > 0 && (
                  <span className="font-medium">
                    {productCount} {productCount === 1 ? "product" : "products"}
                  </span>
                )}
              </div>

              {/* Hover Effect Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-sky/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </Link>
          );
        })}
        </div>

        {/* Empty State */}
      {parentCategories.length === 0 && !isLoading && (
        <div className="text-center py-20">
          <div className="w-24 h-24 rounded-full bg-sky/10 flex items-center justify-center mx-auto mb-6">
            <Package className="w-12 h-12 text-sky" />
          </div>
          <h2 className="font-display text-2xl font-bold text-navy mb-2">
            No categories found
          </h2>
          <p className="text-navy/60">
            Check back soon as we add more categories!
          </p>
        </div>
        )}
      </div>
    </div>
  );
}
