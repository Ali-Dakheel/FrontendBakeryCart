"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import dynamic from "next/dynamic";
import { ArrowLeft, ShoppingCart, Package, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useProduct } from "@/lib/hooks/useProducts";
import { useAddToCart } from "@/lib/hooks/useCart";
import { useUIStore } from "@/lib/stores/ui-store";
import { VariantSelector } from "@/components/products/VariantSelector";
import { WishlistButton } from "@/components/products/WishlistButton";
import { ProductReviews } from "@/components/products/ProductReviews";

const ProductImageGallery = dynamic(
  () => import("@/components/products/ProductImageGallery").then((m) => ({ default: m.ProductImageGallery })),
  { loading: () => <Skeleton className="aspect-square w-full rounded-lg" /> }
);
import { PriceDisplay } from "@/components/shared/PriceDisplay";
import { QuantityControl } from "@/components/shared/QuantityControl";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export function ProductDetailClient() {
  const { id } = useParams<{ id: string }>();
  const productId = parseInt(id);
  const router = useRouter();
  const { data: product, isLoading } = useProduct(productId);
  const addToCart = useAddToCart();
  const { openCart } = useUIStore();
  const t = useTranslations();

  const [selectedVariantId, setSelectedVariantId] = useState<number | undefined>();
  const [quantity, setQuantity] = useState(1);

  // Set default variant when product loads
  if (product && !selectedVariantId && product.has_variants && product.variants?.length) {
    const availableVariant = product.variants.find((v) => v.is_available);
    if (availableVariant) {
      setSelectedVariantId(availableVariant.id);
    }
  }

  const selectedVariant = product?.variants?.find((v) => v.id === selectedVariantId);
  const displayPrice = selectedVariant?.price || product?.price || product?.base_price || 0;
  const maxStock = selectedVariant
    ? (selectedVariant.stock_quantity || 0)
    : product?.stock_quantity || 0;
  const isAvailable = selectedVariant
    ? (selectedVariant.is_available ?? true)
    : product?.is_available || false;

  const handleAddToCart = () => {
    if (!product || !isAvailable) return;

    addToCart.mutate(
      {
        product_id: product.id,
        product_variant_id: selectedVariantId,
        quantity,
      },
      {
        onSuccess: () => {
          openCart();
          setQuantity(1); // Reset quantity after adding
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cream">
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-10 w-32 mb-8" />
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <Skeleton className="aspect-square rounded-lg" />
            <div className="space-y-6">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-2/3" />
              <Skeleton className="h-32 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="font-display text-3xl text-navy">{t('products.productNotFound')}</h1>
          <Button asChild>
            <Link href="/products">{t('products.backToProducts')}</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-6 text-navy hover:text-sky"
        >
          <ArrowLeft className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0 rtl:rotate-180" />
          {t('products.backToProducts')}
        </Button>

        {/* Product Details */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12" id="product-main">
          {/* Image Gallery */}
          <div>
            <ProductImageGallery
              images={product.images || []}
              productName={product.name || "Product"}
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Title & Badges */}
            <div className="space-y-3">
              <div className="flex gap-2">
                {product.is_featured && (
                  <Badge className="bg-sky text-white">{t('products.featured')}</Badge>
                )}
                {!isAvailable && <Badge variant="destructive">{t('products.outOfStock')}</Badge>}
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-navy">
                {product.name}
              </h1>
              {product.short_description && (
                <p className="text-lg text-navy/70">{product.short_description}</p>
              )}
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2">
              <PriceDisplay amount={displayPrice} className="text-4xl" />
              {product.has_variants && <span className="text-navy/60">{t('products.perPack')}</span>}
            </div>

            <Separator />

            {/* Variants */}
            {product.has_variants && product.variants && (
              <>
                <VariantSelector
                  variants={product.variants}
                  selectedVariantId={selectedVariantId}
                  onVariantChange={setSelectedVariantId}
                />
                <Separator />
              </>
            )}

            {/* Quantity */}
            <div className="space-y-3">
              <label className="text-base font-semibold text-navy">{t('common.quantity')}</label>
              <div className="flex items-center gap-4">
                <QuantityControl
                  value={quantity}
                  min={1}
                  max={maxStock}
                  onChange={setQuantity}
                  size="md"
                  productName={product?.name}
                />
                {maxStock > 0 && maxStock < 10 && isAvailable && (
                  <p className="text-sm text-orange-600">
                    {t('products.onlyLeft')} {maxStock} {t('products.leftInStock')}
                  </p>
                )}
              </div>
            </div>

            {/* Add to Cart + Wishlist */}
            <div className="flex gap-3">
              <Button
                size="lg"
                onClick={handleAddToCart}
                disabled={!isAvailable || addToCart.isPending}
                className="flex-1 bg-navy hover:bg-navy-light text-lg"
              >
                {addToCart.isPending ? (
                  t('products.adding')
                ) : !isAvailable ? (
                  t('products.outOfStock')
                ) : (
                  <>
                    <ShoppingCart className="h-5 w-5 mr-2 rtl:ml-2 rtl:mr-0" />
                    {t('products.addToCart')}
                  </>
                )}
              </Button>
              <WishlistButton productId={productId} variant="full" />
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="flex items-start gap-3 p-4 bg-cream-dark rounded-lg">
                <Package className="h-5 w-5 text-sky shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-navy text-sm">{t('products.freshDaily')}</p>
                  <p className="text-xs text-navy/60">{t('products.freshDailyDesc')}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-cream-dark rounded-lg">
                <Clock className="h-5 w-5 text-sky shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-navy text-sm">{t('products.openHours')}</p>
                  <p className="text-xs text-navy/60">
                    {t('businessHours.openTime')} - {t('businessHours.closeTime')}
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Description */}
            {product.description && (
              <div className="space-y-3">
                <h3 className="font-semibold text-navy text-lg">{t('products.description')}</h3>
                <p className="text-navy/70 leading-relaxed">{product.description}</p>
              </div>
            )}
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-12 pt-8 border-t border-navy/10">
          <ProductReviews productId={productId} />
        </div>
      </div>
    </div>
  );
}
