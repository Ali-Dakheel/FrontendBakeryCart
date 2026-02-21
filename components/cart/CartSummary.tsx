import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { PriceDisplay } from "@/components/shared/PriceDisplay";
import { ShoppingCart, Tag } from "lucide-react";
import { VAT_RATE } from "@/lib/utils/constants";
import { calculateVAT, calculateTotalWithVAT } from "@/lib/utils/formatters";

interface CartSummaryProps {
  subtotal: number;
  deliveryFee?: number;
  discount?: number;
  showCouponInput?: boolean;
}

export function CartSummary({
  subtotal,
  deliveryFee = 0,
  discount = 0,
  showCouponInput = true,
}: CartSummaryProps) {
  const vat = calculateVAT(subtotal, VAT_RATE);
  const total = calculateTotalWithVAT(subtotal, VAT_RATE) + deliveryFee - discount;

  return (
    <div className="bg-white rounded-lg border border-border p-6 space-y-6 sticky top-20">
      <h2 className="font-display text-2xl font-bold text-navy">Order Summary</h2>

      {/* Coupon Input */}
      {showCouponInput && (
        <>
          <div className="space-y-2">
            <label className="text-sm font-medium text-navy">Have a coupon code?</label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-navy/40" />
                <Input placeholder="Enter code" className="pl-10" />
              </div>
              <Button variant="outline" className="shrink-0">
                Apply
              </Button>
            </div>
          </div>
          <Separator />
        </>
      )}

      {/* Price Breakdown */}
      <div className="space-y-3 text-sm">
        <div className="flex justify-between text-navy/70">
          <span>Subtotal</span>
          <PriceDisplay amount={subtotal} className="text-sm font-normal" />
        </div>

        <div className="flex justify-between text-navy/70">
          <span>VAT (10%)</span>
          <PriceDisplay amount={vat} className="text-sm font-normal" />
        </div>

        {deliveryFee > 0 && (
          <div className="flex justify-between text-navy/70">
            <span>Delivery Fee</span>
            <PriceDisplay amount={deliveryFee} className="text-sm font-normal" />
          </div>
        )}

        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span>-<PriceDisplay amount={discount} className="text-sm font-normal" /></span>
          </div>
        )}

        <Separator />

        <div className="flex justify-between font-semibold text-navy text-lg pt-2">
          <span>Total</span>
          <PriceDisplay amount={total} className="text-2xl" />
        </div>
      </div>

      {/* Checkout Button */}
      <Button asChild size="lg" className="w-full bg-navy hover:bg-navy-light">
        <Link href="/checkout">
          <ShoppingCart className="mr-2 h-5 w-5" />
          Proceed to Checkout
        </Link>
      </Button>

      <Button asChild variant="outline" size="lg" className="w-full">
        <Link href="/products">Continue Shopping</Link>
      </Button>

      {/* Info Note */}
      <p className="text-xs text-navy/60 text-center">
        Delivery fee will be calculated at checkout based on your location
      </p>
    </div>
  );
}
