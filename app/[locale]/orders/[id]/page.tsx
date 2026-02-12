"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Package, MapPin, CreditCard, Calendar, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useOrder, useCancelOrder } from "@/lib/hooks/useOrders";
import { OrderStatusBadge } from "@/components/orders/OrderStatusBadge";
import { PriceDisplay } from "@/components/shared/PriceDisplay";
import { formatDateTime } from "@/lib/utils/formatters";
import { PAYMENT_METHOD_LABELS } from "@/lib/utils/constants";

export default function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const orderId = parseInt(resolvedParams.id);
  const router = useRouter();
  const { data: order, isLoading } = useOrder(orderId);
  const cancelOrder = useCancelOrder();
  const [cancelReason, setCancelReason] = useState("");

  const canCancel = order?.status === "pending" || order?.status === "confirmed";

  const handleCancelOrder = () => {
    if (!cancelReason.trim()) return;

    cancelOrder.mutate(
      { id: orderId, reason: cancelReason },
      {
        onSuccess: () => {
          setCancelReason("");
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cream">
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-10 w-32 mb-8" />
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <Skeleton className="h-96" />
            </div>
            <Skeleton className="h-96" />
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="font-display text-3xl text-navy">Order Not Found</h1>
          <Button asChild>
            <Link href="/orders">Back to Orders</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-gradient-to-br from-cream via-cream-dark to-flour border-b border-border/40">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-4 text-navy hover:text-sky"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Package className="h-8 w-8 text-sky" />
                <h1 className="font-display text-3xl md:text-4xl font-bold text-navy">
                  Order #{order.order_number}
                </h1>
              </div>
              <div className="flex items-center gap-3">
                <OrderStatusBadge status={order.status} />
                <span className="text-sm text-navy/60">
                  Placed {formatDateTime(order.created_at)}
                </span>
              </div>
            </div>
            {canCancel && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm">
                    <X className="h-4 w-4 mr-2" />
                    Cancel Order
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Cancel this order?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Please provide a reason for cancellation.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <div className="space-y-2">
                    <Label htmlFor="reason">Cancellation Reason</Label>
                    <Textarea
                      id="reason"
                      placeholder="Tell us why you're cancelling..."
                      value={cancelReason}
                      onChange={(e) => setCancelReason(e.target.value)}
                      rows={4}
                    />
                  </div>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Keep Order</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleCancelOrder}
                      disabled={!cancelReason.trim() || cancelOrder.isPending}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      {cancelOrder.isPending ? "Cancelling..." : "Cancel Order"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Order Details */}
          <div className="md:col-span-2 space-y-6">
            {/* Items */}
            <div className="bg-white rounded-lg border border-border p-6">
              <h2 className="font-semibold text-navy text-lg mb-4">Order Items</h2>
              <div className="space-y-4">
                {order.items?.map((item) => (
                  <div key={item.id} className="flex gap-4 pb-4 border-b last:border-0 last:pb-0">
                    <div className="flex-1">
                      <p className="font-medium text-navy">{item.product_name}</p>
                      {item.variant_name && (
                        <p className="text-sm text-navy/60">{item.variant_name}</p>
                      )}
                      <p className="text-sm text-navy/60 mt-1">SKU: {item.product_sku}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-navy">x{item.quantity}</p>
                      <PriceDisplay amount={item.subtotal} className="text-lg" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Address */}
            <div className="bg-white rounded-lg border border-border p-6">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="h-5 w-5 text-sky" />
                <h2 className="font-semibold text-navy text-lg">Delivery Address</h2>
              </div>
              <div className="text-sm text-navy/70 space-y-1">
                <p className="font-medium text-navy">{order.customer_name}</p>
                <p>{order.shipping_street_address}</p>
                {(order.shipping_building || order.shipping_flat) && (
                  <p>
                    {order.shipping_building && `Building ${order.shipping_building}`}
                    {order.shipping_building && order.shipping_flat && ", "}
                    {order.shipping_flat && `Flat ${order.shipping_flat}`}
                  </p>
                )}
                <p>
                  {order.shipping_area}
                  {order.shipping_block && `, Block ${order.shipping_block}`}
                </p>
                <p>{order.shipping_city}</p>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg border border-border p-6">
              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="h-5 w-5 text-sky" />
                <h2 className="font-semibold text-navy text-lg">Payment Method</h2>
              </div>
              <p className="text-navy/70">
                {PAYMENT_METHOD_LABELS[order.payment_method] || order.payment_method}
              </p>
              <p className="text-sm text-navy/50 mt-1">
                Status: <span className="capitalize">{order.payment_status}</span>
              </p>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-lg border border-border p-6 space-y-6 sticky top-20">
              <h2 className="font-semibold text-navy text-lg">Order Summary</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-navy/70">
                  <span>Subtotal</span>
                  <PriceDisplay amount={order.subtotal} className="text-sm font-normal" />
                </div>
                <div className="flex justify-between text-navy/70">
                  <span>VAT</span>
                  <PriceDisplay amount={order.tax_amount} className="text-sm font-normal" />
                </div>
                <div className="flex justify-between text-navy/70">
                  <span>Delivery Fee</span>
                  <PriceDisplay amount={order.shipping_fee} className="text-sm font-normal" />
                </div>
                {order.coupon_discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-<PriceDisplay amount={order.coupon_discount} className="text-sm font-normal" /></span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between font-semibold text-navy text-lg pt-2">
                  <span>Total</span>
                  <PriceDisplay amount={order.total} className="text-2xl" />
                </div>
              </div>

              {order.notes && (
                <>
                  <Separator />
                  <div>
                    <p className="font-semibold text-navy text-sm mb-2">Order Notes</p>
                    <p className="text-sm text-navy/70">{order.notes}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
