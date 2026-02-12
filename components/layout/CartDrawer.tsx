"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useUIStore } from "@/lib/stores/ui-store";
import { useCart, useUpdateCartItem, useRemoveFromCart } from "@/lib/hooks/useCart";
import { usePriceCalculation } from "@/lib/hooks/usePriceCalculation";
import { PriceDisplay } from "@/components/shared/PriceDisplay";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { VAT_RATE } from "@/lib/utils/constants";
import { calculateVAT, calculateTotalWithVAT } from "@/lib/utils/formatters";
import { getValidImageUrl } from "@/lib/utils/image";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";

export function CartDrawer() {
  const { isCartOpen, closeCart } = useUIStore();
  const { data: cart, isLoading } = useCart();
  const updateCartItem = useUpdateCartItem();
  const removeFromCart = useRemoveFromCart();
  const t = useTranslations();
  const locale = useLocale();

  const cartItems = cart?.items || [];
  const { subtotal, vat, total } = usePriceCalculation(cartItems);

  const handleUpdateQuantity = (itemId: number, currentQty: number, change: number) => {
    const newQuantity = currentQty + change;
    if (newQuantity > 0) {
      updateCartItem.mutate({ itemId, quantity: newQuantity });
    }
  };

  const handleRemove = (itemId: number) => {
    removeFromCart.mutate(itemId);
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={closeCart}>
      <SheetContent
        side={locale === 'ar' ? 'left' : 'right'}
        className="w-full sm:max-w-lg bg-cream flex flex-col"
      >
        <SheetHeader>
          <SheetTitle className="font-display text-2xl text-navy">{t('cart.title')}</SheetTitle>
        </SheetHeader>

        {isLoading ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-navy/60">{t('cart.loadingCart')}</p>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center space-y-4">
            <ShoppingBag className="h-16 w-16 text-navy/20" />
            <p className="text-navy/60">{t('cart.empty')}</p>
            <Button onClick={closeCart} asChild>
              <Link href="/products">{t('cart.shopProducts')}</Link>
            </Button>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto space-y-4 py-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 bg-white rounded-lg border border-border p-4"
                >
                  {/* Product Image */}
                  <div className="relative h-20 w-20 flex-shrink-0 rounded-md overflow-hidden bg-cream-dark">
                    {(() => {
                      const { url: validUrl, isPlaceholder } = getValidImageUrl(item.product?.images, false);

                      return validUrl ? (
                        <Image
                          src={validUrl}
                          alt={item.product?.name || "Product"}
                          fill
                          className="object-cover"
                          unoptimized={isPlaceholder}
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-navy/30">
                          <ShoppingBag className="h-8 w-8" />
                        </div>
                      );
                    })()}
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-navy text-sm line-clamp-1">
                      {item.product?.name || "Product"}
                    </h4>
                    {item.variant && (
                      <p className="text-xs text-navy/60">{item.variant.name}</p>
                    )}
                    <PriceDisplay amount={item.price_snapshot} className="text-lg mt-1" />

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => handleUpdateQuantity(item.id, item.quantity, -1)}
                        disabled={updateCartItem.isPending}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="text-sm font-medium text-navy w-8 text-center">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => handleUpdateQuantity(item.id, item.quantity, 1)}
                        disabled={updateCartItem.isPending}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 ml-auto text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleRemove(item.id)}
                        disabled={removeFromCart.isPending}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="border-t pt-4 space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-navy/70">
                  <span>{t('common.subtotal')}</span>
                  <PriceDisplay amount={subtotal} className="text-sm font-normal" />
                </div>
                <div className="flex justify-between text-navy/70">
                  <span>{t('common.tax')} (10%)</span>
                  <PriceDisplay amount={vat} className="text-sm font-normal" />
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-navy text-base">
                  <span>{t('common.total')}</span>
                  <PriceDisplay amount={total} className="text-xl" />
                </div>
              </div>

              <Button asChild className="w-full bg-navy hover:bg-navy-light" size="lg">
                <Link href="/checkout">{t('cart.checkout')}</Link>
              </Button>
              <Button
                variant="outline"
                className="w-full"
                asChild
              >
                <Link href="/cart">{t('cart.viewFullCart')}</Link>
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
