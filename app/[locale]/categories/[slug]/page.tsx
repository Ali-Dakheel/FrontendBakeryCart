"use client";

import { use } from "react";
import { useCategory } from "@/lib/hooks/useCategories";
import { ProductCard } from "@/components/products/ProductCard";
import { Link } from "@/i18n/navigation";
import { ChevronRight, ArrowLeft } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { data: category, isLoading } = useCategory(slug);
  const t = useTranslations();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Skeleton className="h-12 w-64 mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} className="h-96 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="font-display text-3xl font-bold text-navy mb-4">
          {t('categories.notFound')}
        </h1>
        <p className="text-navy/60 mb-8">
          {t('categories.notFoundDescription')}
        </p>
        <Button asChild>
          <Link href="/categories">
            <ArrowLeft className="mr-2 rtl:ml-2 rtl:mr-0 h-4 w-4 rtl:rotate-180" />
            {t('common.back')}
          </Link>
        </Button>
      </div>
    );
  }

  const hasChildren = category.children && category.children.length > 0;
  const hasProducts = category.products && category.products.length > 0;

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-navy/60 mb-8">
        <Link href="/" className="hover:text-sky transition-colors">
          {t('nav.home')}
        </Link>
        <ChevronRight className="w-4 h-4 rtl:rotate-180" />
        <Link href="/categories" className="hover:text-sky transition-colors">
          {t('nav.categories')}
        </Link>
        {category.parent && (
          <>
            <ChevronRight className="w-4 h-4 rtl:rotate-180" />
            <Link
              href={`/categories/${category.parent.slug}`}
              className="hover:text-sky transition-colors"
            >
              {category.parent.name}
            </Link>
          </>
        )}
        <ChevronRight className="w-4 h-4 rtl:rotate-180" />
        <span className="text-navy font-medium">{category.name}</span>
      </nav>

      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-4">
          {category.icon && (
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-sky/10 to-sky-dark/10 flex items-center justify-center text-5xl">
              {category.icon}
            </div>
          )}
          <div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-navy">
              {category.name}
            </h1>
            {category.products_count !== undefined && (
              <p className="text-navy/60 mt-2">
                {category.products_count} {category.products_count === 1 ? t('products.product') : t('products.products')}
              </p>
            )}
          </div>
        </div>
        {category.description && (
          <p className="text-navy/70 text-lg max-w-3xl">
            {category.description}
          </p>
        )}
      </div>

      {/* Subcategories */}
      {hasChildren && (
        <div className="mb-16">
          <h2 className="font-display text-2xl font-bold text-navy mb-6">
            {t('categories.subcategories')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {category.children?.map((child) => (
              <Link
                key={child.id}
                href={`/categories/${child.slug}`}
                className="group bg-white rounded-xl border-2 border-sky/20 p-6 hover:border-sky hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-2">
                  {child.icon && (
                    <span className="text-3xl group-hover:scale-110 transition-transform">
                      {child.icon}
                    </span>
                  )}
                  <ChevronRight className="w-5 h-5 text-sky opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="font-semibold text-navy group-hover:text-sky transition-colors">
                  {child.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Products */}
      {hasProducts && (
        <div>
          <h2 className="font-display text-2xl font-bold text-navy mb-6">
            {hasChildren ? t('categories.allProducts') : t('categories.products')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {category.products?.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!hasChildren && !hasProducts && (
        <div className="text-center py-20">
          <div className="w-24 h-24 rounded-full bg-sky/10 flex items-center justify-center mx-auto mb-6">
            <span className="text-5xl">{category.icon || "📦"}</span>
          </div>
          <h2 className="font-display text-2xl font-bold text-navy mb-2">
            {t('categories.noProductsYet')}
          </h2>
          <p className="text-navy/60 mb-8">
            {t('categories.noProductsDescription')}
          </p>
          <Button asChild variant="outline">
            <Link href="/categories">
              <ArrowLeft className="mr-2 rtl:ml-2 rtl:mr-0 h-4 w-4 rtl:rotate-180" />
              {t('categories.browseOther')}
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
