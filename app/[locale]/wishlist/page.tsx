"use client";

import Image from "next/image";
import { Link, useRouter } from "@/i18n/navigation";
import { Heart, ShoppingCart, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PriceDisplay } from "@/components/shared/PriceDisplay";
import { EmptyState } from "@/components/shared/EmptyState";
import { WishlistButton } from "@/components/products/WishlistButton";
import { useWishlist } from "@/lib/hooks/useWishlist";
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-64 w-full rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) return null;

  const items = wishlistData?.data ?? [];

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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map((item) => (
              <Card
                key={item.id}
                className="group overflow-hidden border border-navy/10 hover:border-sky/30 transition-all duration-300 bg-white hover:scale-[1.01]"
              >
                <CardContent className="p-0">
                  {/* Image */}
                  <div className="relative aspect-square bg-cream overflow-hidden">
                    <Link href={`/products/${item.product.id}`}>
                      {item.product.image ? (
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center">
                          <ShoppingBag className="h-16 w-16 text-navy/20" />
                        </div>
                      )}
                    </Link>

                    {/* Wishlist toggle (remove) */}
                    <div className="absolute top-2 right-2">
                      <WishlistButton productId={item.product.id} variant="icon" />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4 space-y-3">
                    <Link href={`/products/${item.product.id}`}>
                      <h3 className="font-display font-semibold text-navy line-clamp-2 hover:text-sky transition-colors">
                        {item.product.name}
                      </h3>
                    </Link>

                    <div className="flex items-center justify-between gap-2">
                      <PriceDisplay
                        amount={
                          typeof item.product.price === "number"
                            ? item.product.price
                            : parseFloat(String(item.product.price))
                        }
                        className="text-xl font-bold text-sky"
                      />

                      {item.product.is_available ? (
                        <Button
                          size="sm"
                          onClick={() =>
                            addToCart.mutate(
                              { product_id: item.product.id, quantity: 1 },
                              { onSuccess: () => openCart() }
                            )
                          }
                          disabled={addToCart.isPending}
                        >
                          <ShoppingCart className="h-4 w-4 mr-1 rtl:ml-1 rtl:mr-0" />
                          {t("products.add")}
                        </Button>
                      ) : (
                        <span className="text-xs text-destructive font-medium">
                          {t("products.outOfStock")}
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
