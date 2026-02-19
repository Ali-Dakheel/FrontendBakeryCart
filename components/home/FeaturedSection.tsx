"use client";

// Static delay lookup — avoids dynamic class strings that Tailwind JIT would purge
const ITEM_DELAYS = ["", "animate-delay-100", "animate-delay-200", "animate-delay-300", "animate-delay-400", "animate-delay-500"] as const;

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductCard } from "@/components/products/ProductCard";
import { useFeaturedProducts } from "@/lib/hooks/useProducts";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function FeaturedSection() {
  // isPending (not isLoading) — isLoading is false during SSR because no fetch runs server-side,
  // causing a hydration mismatch. isPending is true whenever there's no data yet (server + client).
  const { data: featuredProducts, isPending } = useFeaturedProducts(6);
  const t = useTranslations();

  return (
    <section className="py-16 md:py-24 bg-cream paper-texture">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12 animate-fade-in-up">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-navy">
            {t("home.featured.title")}
          </h2>
          <p className="text-base md:text-lg text-navy/70 max-w-2xl mx-auto">
            {t("home.featured.subtitle")}
          </p>
        </div>

        {isPending ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className={`space-y-4 animate-fade-in-up ${ITEM_DELAYS[i]}`}>
                <Skeleton className="h-64 w-full rounded-lg" />
                <Skeleton className="h-6 w-3/4" />
                <div className="flex items-center justify-between">
                  <Skeleton className="h-8 w-1/3" />
                  <Skeleton className="h-8 w-20" />
                </div>
              </div>
            ))}
          </div>
        ) : featuredProducts && featuredProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {featuredProducts.map((product, index) => (
                <div key={product.id} className={`animate-fade-in-up ${ITEM_DELAYS[index] ?? ""}`}>
                  <ProductCard product={product} index={index} />
                </div>
              ))}
            </div>
            <div className="text-center animate-fade-in">
              <Button asChild variant="outline" size="lg">
                <Link href="/products">
                  {t("home.featured.viewAll")}
                  <ArrowRight className="ml-2 rtl:mr-2 rtl:ml-0 h-4 w-4 rtl:rotate-180" />
                </Link>
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-12 animate-fade-in">
            <p className="text-navy/60">{t("home.featured.noProducts")}</p>
          </div>
        )}
      </div>
    </section>
  );
}
