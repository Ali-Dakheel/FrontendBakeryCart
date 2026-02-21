"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Trash2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PriceDisplay } from "@/components/shared/PriceDisplay";
import { QuantityControl } from "@/components/shared/QuantityControl";
import { useUpdateCartItem, useRemoveFromCart } from "@/lib/hooks/useCart";
import { getValidImageUrl } from "@/lib/utils/image";
import { toNumber } from "@/lib/utils/formatters";
import type { CartItem as CartItemType } from "@/lib/types";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const updateCartItem = useUpdateCartItem();
  const removeFromCart = useRemoveFromCart();

  const itemTotal = toNumber(item.price_snapshot) * item.quantity;

  // Get primary image with validation
  const { url: validImageUrl, isPlaceholder } = getValidImageUrl(item.product?.images, true);

  const handleUpdateQuantity = (newQuantity: number) => {
    if (newQuantity > 0) {
      updateCartItem.mutate({ itemId: item.id, quantity: newQuantity });
    }
  };

  const handleRemove = () => {
    removeFromCart.mutate(item.id);
  };

  return (
    <div className="flex gap-4 sm:gap-6 bg-white rounded-lg border border-border p-4 sm:p-6">
      {/* Product Image */}
      <Link
        href={`/products/${item.product_id}`}
        className="relative h-24 w-24 sm:h-32 sm:w-32 shrink-0 rounded-md overflow-hidden bg-cream-dark hover:opacity-90 transition-opacity"
      >
        {validImageUrl ? (
          <Image
            src={validImageUrl}
            alt={item.product?.name || "Product"}
            fill
            className="object-cover"
            unoptimized={isPlaceholder}
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-navy/30">
            <ShoppingBag className="h-12 w-12" />
          </div>
        )}
      </Link>

      {/* Product Info */}
      <div className="flex-1 min-w-0 space-y-3">
        <div>
          <Link
            href={`/products/${item.product_id}`}
            className="font-semibold text-navy text-lg hover:text-sky transition-colors line-clamp-2"
          >
            {item.product?.name || "Product"}
          </Link>
          {item.variant && (
            <p className="text-sm text-navy/60 mt-1">
              {item.variant.name} ({item.variant.quantity} pieces)
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          {/* Price */}
          <div className="space-y-1">
            <PriceDisplay amount={item.price_snapshot} className="text-lg" />
            <p className="text-xs text-navy/50">
              per {item.variant ? "pack" : "item"}
            </p>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center gap-3">
            <QuantityControl
              value={item.quantity}
              min={1}
              onChange={handleUpdateQuantity}
              disabled={updateCartItem.isPending}
              size="lg"
              productName={item.product?.name}
            />

            {/* Item Total */}
            <div className="hidden sm:block text-right min-w-25">
              <PriceDisplay amount={itemTotal} className="text-xl" />
            </div>

            {/* Remove Button - 44x44px touch target */}
            <Button
              variant="ghost"
              size="icon"
              className="h-11 w-11 text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={handleRemove}
              disabled={removeFromCart.isPending}
            >
              <Trash2 className="h-5 w-5" />
              <span className="sr-only">Remove item</span>
            </Button>
          </div>
        </div>

        {/* Mobile Item Total */}
        <div className="sm:hidden pt-2 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-sm text-navy/60">Item Total:</span>
            <PriceDisplay amount={itemTotal} className="text-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
