"use client";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { useCart, useClearCart } from "@/lib/hooks/useCart";
import { usePriceCalculation } from "@/lib/hooks/usePriceCalculation";
import { CartItem } from "@/components/cart/CartItem";
import { CartSummary } from "@/components/cart/CartSummary";
import { EmptyState } from "@/components/shared/EmptyState";
import { Skeleton } from "@/components/ui/skeleton";
import { ShoppingBag, ArrowLeft, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useTranslations } from "next-intl";

export default function CartPage() {
  const t = useTranslations();
  const { data: cart, isLoading } = useCart();
  const clearCart = useClearCart();

  const cartItems = cart?.items || [];
  const { subtotal } = usePriceCalculation(cartItems);

  const handleClearCart = () => {
    clearCart.mutate();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cream">
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-10 w-48 mb-8" />
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-32 w-full" />
              ))}
            </div>
            <Skeleton className="h-96" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-linear-to-br from-cream via-cream-dark to-flour border-b border-border/40">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <ShoppingBag className="h-8 w-8 text-sky" />
              <h1 className="font-display text-4xl md:text-5xl font-bold text-navy">
                {t("cart.title")}
              </h1>
            </div>
            <Button variant="ghost" asChild className="text-navy hover:text-sky">
              <Link href="/products">
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t("cart.continueShopping")}
              </Link>
            </Button>
          </div>
          {cartItems.length > 0 && (
            <p className="text-navy/70">
              {t("cart.itemCount", { count: cartItems.length })}
            </p>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        {cartItems.length === 0 ? (
          <EmptyState
            icon={ShoppingBag}
            title={t("cart.empty")}
            description={t("cart.emptyDescription")}
            action={{
              label: t("cart.startShopping"),
              href: "/products",
            }}
          />
        ) : (
          /* Cart with Items */
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {/* Clear Cart Button */}
              <div className="flex justify-between items-center">
                <h2 className="font-semibold text-navy text-lg">
                  {t("cart.cartItems", { count: cartItems.length })}
                </h2>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      {t("cart.clearCart")}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>{t("cart.clearCartTitle")}</AlertDialogTitle>
                      <AlertDialogDescription>
                        {t("cart.clearCartDesc")}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>{t("common.cancel")}</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleClearCart}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        {t("cart.clearCart")}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>

              {/* Items List */}
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <CartSummary subtotal={subtotal} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
