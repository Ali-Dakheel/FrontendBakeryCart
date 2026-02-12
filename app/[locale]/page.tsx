"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, ChefHat, Clock, MapPin } from "lucide-react";
import { useFeaturedProducts } from "@/lib/hooks/useProducts";
import { ProductCard } from "@/components/products/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

/**
 * Homepage - Client Component with CSS Animations
 * Uses client-side data fetching for compatibility
 */
export default function Home() {
  const { data: featuredProducts, isLoading } = useFeaturedProducts(6);
  const t = useTranslations();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-white py-20 md:py-32 border-b border-navy/10">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center space-y-8">
            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="font-display text-5xl md:text-7xl font-bold text-navy leading-tight animate-fade-in-up">
                {t('home.hero.title')}
                <br />
                <span className="text-sky font-handwritten text-6xl md:text-8xl">{t('home.hero.titleAccent')}</span>
              </h1>
              <p className="text-base md:text-lg text-navy/70 max-w-2xl mx-auto leading-relaxed animate-fade-in-up animate-delay-100">
                {t('home.hero.subtitle')}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up animate-delay-200">
              <Button asChild size="lg">
                <Link href="/products">
                  {t('home.hero.cta')}
                  <ArrowRight className="ml-2 rtl:mr-2 rtl:ml-0 h-5 w-5 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
              {[
                { icon: ChefHat, text: t('home.quickInfo.artisanQuality') },
                { icon: Clock, text: `${t('businessHours.openTime')} - ${t('businessHours.closeTime')}` },
                { icon: MapPin, text: t('home.quickInfo.location') }
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center space-y-2 text-navy/70 group animate-fade-in-up"
                  style={{ animationDelay: `${300 + i * 100}ms` }}
                >
                  <item.icon className="h-6 w-6 text-sky" />
                  <p className="text-sm font-medium">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24 bg-cream paper-texture">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12 animate-fade-in-up">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-navy">
              {t('home.featured.title')}
            </h2>
            <p className="text-base md:text-lg text-navy/70 max-w-2xl mx-auto">
              {t('home.featured.subtitle')}
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="space-y-4 animate-fade-in-up"
                  style={{ animationDelay: `${i * 100}ms` }}
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
          ) : featuredProducts && featuredProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {featuredProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <ProductCard product={product} index={index} />
                  </div>
                ))}
              </div>

              <div className="text-center animate-fade-in">
                <Button asChild variant="outline" size="lg">
                  <Link href="/products">
                    {t('home.featured.viewAll')}
                    <ArrowRight className="ml-2 rtl:mr-2 rtl:ml-0 h-4 w-4 rtl:rotate-180" />
                  </Link>
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center py-12 animate-fade-in">
              <p className="text-navy/60">{t('home.featured.noProducts')}</p>
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-24 bg-navy text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center space-y-6 animate-fade-in-up">
            <h2 className="font-display text-4xl md:text-5xl font-bold">
              {t('brand.name')}
            </h2>
            <p className="text-lg text-white/80">
              {t('home.aboutSection.description')}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
