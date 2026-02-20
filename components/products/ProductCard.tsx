"use client";

import { memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, ShoppingBag } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PriceDisplay } from "@/components/shared/PriceDisplay";
import { useAddToCart } from "@/lib/hooks/useCart";
import { useUIStore } from "@/lib/stores/ui-store";
import { getProduct } from "@/lib/api/products";
import type { Product } from "@/lib/types";
import { getValidImageUrl } from "@/lib/utils/image";
import { getPricingUnitKey } from "@/lib/utils/pricing";
import { WishlistButton } from "@/components/products/WishlistButton";

interface ProductCardProps {
  product: Product;
  index?: number;
}

function ProductCardComponent({ product, index = 0 }: ProductCardProps) {
  const t = useTranslations();
  const addToCart = useAddToCart();
  const { openCart } = useUIStore();
  const queryClient = useQueryClient();

  // Get primary image with validation
  const { url: validImageUrl, isPlaceholder, blurDataURL } = getValidImageUrl(product.images, true);

  // Prefetch product details on hover for faster navigation
  const handleMouseEnter = () => {
    queryClient.prefetchQuery({
      queryKey: ["product", product.id],
      queryFn: () => getProduct(product.id),
      staleTime: 60 * 1000, // Cache for 1 minute
    });
  };

  // Get display price - API returns price as number
  // Products list doesn't include variants array, only single product endpoint does
  const variantPrice = product.variants?.[0]?.price;
  const basePrice = product.price ?? product.base_price ?? 0;

  let displayPrice: number;
  if (variantPrice !== undefined && variantPrice !== null) {
    displayPrice = typeof variantPrice === 'number' ? variantPrice : parseFloat(String(variantPrice));
  } else {
    displayPrice = typeof basePrice === 'number' ? basePrice : parseFloat(String(basePrice));
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!product.is_available) return;

    const variantId = product.has_variants && product.variants?.[0]
      ? product.variants[0].id
      : undefined;

    addToCart.mutate(
      {
        product_id: product.id,
        product_variant_id: variantId,
        quantity: 1,
      },
      {
        onSuccess: () => {
          openCart();
        },
      }
    );
  };

  return (
    <div
      className="animate-fade-in-up"
      style={{ animationDelay: `${index * 100}ms` }}
      onMouseEnter={handleMouseEnter}
    >
      <Link href={`/products/${product.id}`}>
        <Card className="card-depth group h-full overflow-hidden border border-navy/10 hover:border-sky/30 transition-all duration-300 bg-white hover:scale-[1.01]">
          <CardContent className="p-0">
            {/* Product Image */}
            <div className="relative aspect-square overflow-hidden bg-cream">
              {validImageUrl ? (
                <Image
                  src={validImageUrl}
                  alt={product.name || "Product"}
                  fill
                  className="object-cover transition-all duration-500 ease-out group-hover:scale-110 group-hover:rotate-1"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={index !== undefined && index < 4}
                  placeholder={blurDataURL ? "blur" : "empty"}
                  blurDataURL={blurDataURL}
                  unoptimized={isPlaceholder}
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-cream-dark">
                  <ShoppingBag className="h-16 w-16 text-navy/20" />
                </div>
              )}

              {/* Badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-2">
                {product.is_featured && (
                  <Badge className="bg-sky text-white shadow-sm font-handwritten text-base">
                    {t('products.featured')}
                  </Badge>
                )}
                {!product.is_available && (
                  <Badge variant="destructive">{t('products.outOfStock')}</Badge>
                )}
              </div>

              {/* Wishlist button */}
              <div className="absolute top-3 right-3">
                <WishlistButton productId={product.id} variant="icon" />
              </div>
            </div>

            {/* Product Info */}
            <div className="p-5 sm:p-6 space-y-3">
              <div className="space-y-1.5">
                <h3 className="font-display font-semibold text-navy text-base md:text-lg line-clamp-2 group-hover:text-sky transition-colors duration-300">
                  {product.name || "Unnamed Product"}
                </h3>
                {product.short_description && (
                  <p className="text-xs md:text-sm text-navy/70 line-clamp-2 leading-relaxed">
                    {product.short_description}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-navy-subtle/50">
                <div className="flex flex-col space-y-1">
                  <PriceDisplay
                    amount={displayPrice}
                    className="text-xl md:text-2xl font-bold text-sky"
                    unit={t(getPricingUnitKey(product.name || "Unknown Product"))}
                  />
                  {product.has_variants && product.variants && product.variants.length > 0 && (
                    <span className="text-xs text-navy/60 font-medium">
                      {product.variants.length} {product.variants.length === 1 ? t('products.option') : t('products.options')}
                    </span>
                  )}
                </div>

                <Button
                  size="sm"
                  onClick={handleAddToCart}
                  disabled={!product.is_available || addToCart.isPending}
                  className="rtl:flex-row-reverse"
                >
                  {addToCart.isPending ? (
                    <>
                      <div className="h-4 w-4 mr-1 rtl:ml-1 rtl:mr-0 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {t('products.adding')}
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="h-4 w-4 mr-1 rtl:ml-1 rtl:mr-0" />
                      {t('products.add')}
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}

// Memoize to prevent unnecessary re-renders
export const ProductCard = memo(ProductCardComponent, (prevProps, nextProps) => {
  return (
    prevProps.product.id === nextProps.product.id &&
    prevProps.product.is_available === nextProps.product.is_available &&
    prevProps.product.price === nextProps.product.price &&
    prevProps.product.name === nextProps.product.name &&
    prevProps.index === nextProps.index &&
    JSON.stringify(prevProps.product.images) === JSON.stringify(nextProps.product.images)
  );
});

ProductCard.displayName = "ProductCard";
