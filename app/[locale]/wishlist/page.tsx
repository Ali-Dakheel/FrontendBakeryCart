"use client";

import Image from "next/image";
import { Link, useRouter } from "@/i18n/navigation";
import { Heart, ShoppingCart, Croissant, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { PriceDisplay } from "@/components/shared/PriceDisplay";
import { EmptyState } from "@/components/shared/EmptyState";
import { useWishlist, useToggleWishlist } from "@/lib/hooks/useWishlist";
import { useAddToCart } from "@/lib/hooks/useCart";
import { useUser } from "@/lib/hooks/useAuth";
import { useUIStore } from "@/lib/stores/ui-store";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

export default function WishlistPage() {
  const t = useTranslations();
  const router = useRouter();
  const { data: user, isLoading: authLoading } = useUser();
  const isLoggedIn = !!user;

  const { data: wishlistData, isPending } = useWishlist();
  const toggle = useToggleWishlist();
  const addToCart = useAddToCart();
  const { openCart } = useUIStore();

  useEffect(() => {
    if (!authLoading && !isLoggedIn) {
      router.replace("/login");
    }
  }, [authLoading, isLoggedIn, router]);

  if (authLoading || isPending) {
    return (
      <div className="min-h-screen bg-cream">
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-10 w-48 mb-8" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-72 w-full rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) return null;

  const items = wishlistData ?? [];

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-linear-to-br from-cream via-cream-dark to-flour border-b border-border/40">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="flex items-center gap-3">
            <Heart className="h-8 w-8 text-rose-500 fill-rose-500" />
            <h1 className="font-display text-4xl md:text-5xl font-bold text-navy">
              {t("wishlist.title")}
            </h1>
          </div>
          {items.length > 0 && (
            <p className="text-navy/70 mt-2">
              {items.length}{" "}
              {items.length === 1 ? t("categories.product") : t("categories.products")}
            </p>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        {items.length === 0 ? (
          <EmptyState
            icon={Heart}
            title={t("wishlist.empty")}
            description={t("wishlist.emptyDescription")}
            action={{ label: t("wishlist.continueShopping"), href: "/products" }}
          />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="group flex flex-col rounded-2xl overflow-hidden bg-white border border-navy/8 hover:border-sky/30 hover:shadow-md transition-all duration-300"
              >
                {/* Image — fixed height, no aspect-square */}
                <div className="relative h-44 sm:h-48 bg-cream overflow-hidden">
                  <Link href={`/products/${item.product.id}`} className="block h-full">
                    {item.product.image ? (
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-sky/5">
                        <Croissant className="h-14 w-14 text-sky/25" />
                      </div>
                    )}
                  </Link>

                  {/* Hover gradient */}
                  <div className="absolute inset-0 bg-linear-to-t from-navy/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  {/* Remove button */}
                  <button
                    onClick={() => toggle.mutate(item.product.id)}
                    disabled={toggle.isPending}
                    aria-label={t("wishlist.remove")}
                    className="absolute top-2 right-2 rtl:left-2 rtl:right-auto z-10 p-1.5 rounded-full bg-white shadow-sm text-navy/40 hover:text-rose-500 hover:bg-rose-50 transition-all hover:scale-110 disabled:opacity-50"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>

                  {/* Out of stock overlay */}
                  {!item.product.is_available && (
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-end pb-3 justify-center pointer-events-none">
                      <span className="text-xs font-semibold text-destructive bg-white px-3 py-1 rounded-full shadow-sm">
                        {t("products.outOfStock")}
                      </span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex flex-col flex-1 p-3 gap-2.5">
                  <Link href={`/products/${item.product.id}`}>
                    <h3 className="font-semibold text-navy text-sm leading-snug line-clamp-2 hover:text-sky transition-colors">
                      {item.product.name}
                    </h3>
                  </Link>

                  <PriceDisplay
                    amount={
                      typeof item.product.price === "number"
                        ? item.product.price
                        : parseFloat(String(item.product.price))
                    }
                    className="text-base font-bold text-sky"
                  />

                  <Button
                    size="sm"
                    className="w-full mt-auto gap-1.5 bg-navy hover:bg-navy-light text-white text-xs h-8"
                    onClick={() =>
                      addToCart.mutate(
                        { product_id: item.product.id, quantity: 1 },
                        { onSuccess: () => openCart() }
                      )
                    }
                    disabled={!item.product.is_available || addToCart.isPending}
                  >
                    <ShoppingCart className="h-3.5 w-3.5" />
                    {t("products.add")}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
