"use client";

import { useState, useEffect } from "react";
import { useRouter } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, ShoppingBag, CheckCircle, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslations } from "next-intl";
import { useCart } from "@/lib/hooks/useCart";
import { useUser } from "@/lib/hooks/useAuth";
import { useAddresses } from "@/lib/hooks/useAddresses";
import { useCreateOrder } from "@/lib/hooks/useOrders";
import { usePriceCalculation } from "@/lib/hooks/usePriceCalculation";
import { AddressSelector } from "@/components/checkout/AddressSelector";
import { AddressForm } from "@/components/checkout/AddressForm";
import dynamic from "next/dynamic";

const PaymentMethodSelector = dynamic(
  () => import("@/components/checkout/PaymentMethodSelector").then((m) => ({ default: m.PaymentMethodSelector })),
  { loading: () => <Skeleton className="h-48 w-full rounded-lg" /> }
);
import { PriceDisplay } from "@/components/shared/PriceDisplay";
import { EmptyState } from "@/components/shared/EmptyState";
import { PAYMENT_METHODS } from "@/lib/utils/constants";
import { toNumber } from "@/lib/utils/formatters";
import type { AddressForm as AddressFormData } from "@/lib/types";

export default function CheckoutPage() {
  const router = useRouter();
  const t = useTranslations("checkout");
  const tCommon = useTranslations("common");
  const tCart = useTranslations("cart");
  const tNav = useTranslations("nav");
  const tAuth = useTranslations("auth");
  const { data: user, isLoading: userLoading } = useUser();
  const { data: cart, isLoading: cartLoading } = useCart();
  const { data: addresses, isLoading: addressesLoading } = useAddresses();
  const createOrder = useCreateOrder();

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState<number | undefined>();
  const [newAddress, setNewAddress] = useState<AddressFormData | undefined>();
  const [paymentMethod, setPaymentMethod] = useState<string>(PAYMENT_METHODS.CASH);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (addresses && !selectedAddressId && !showAddressForm) {
      const defaultAddr = addresses.find((a) => a.is_default) || addresses[0];
      if (defaultAddr) {
        setSelectedAddressId(defaultAddr.id);
      }
    }
  }, [addresses, selectedAddressId, showAddressForm]);

  const cartItems = cart?.items || [];
  const { subtotal, vat, total: cartTotal } = usePriceCalculation(cartItems);
  const deliveryFee = 0;
  const total = cartTotal + deliveryFee;

  const handlePlaceOrder = async () => {
    if (!selectedAddressId && !newAddress) {
      return;
    }

    const orderData = {
      address_id: selectedAddressId,
      address: newAddress,
      payment_method: paymentMethod,
      notes: notes || undefined,
    };

    createOrder.mutate(orderData, {
      onSuccess: (order) => {
        router.push(`/checkout/success?order=${order.order_number}`);
      },
    });
  };

  if (userLoading || cartLoading || addressesLoading) {
    return (
      <div className="min-h-screen bg-cream">
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-10 w-48 mb-8" />
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Skeleton className="h-96" />
            </div>
            <Skeleton className="h-96" />
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="max-w-md w-full text-center space-y-6 p-8">
          <div className="mx-auto w-20 h-20 rounded-full bg-sky/20 flex items-center justify-center">
            <LogIn className="h-10 w-10 text-sky" />
          </div>
          <div className="space-y-2">
            <h1 className="font-display text-3xl font-bold text-navy">
              {t("loginRequired")}
            </h1>
            <p className="text-navy/60">
              {t("loginRequiredDesc")}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="bg-navy hover:bg-navy-light">
              <Link href="/login">{tNav("login")}</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/register">{tAuth("createAccount")}</Link>
            </Button>
          </div>
          <Button asChild variant="ghost" className="text-navy/60 hover:text-navy">
            <Link href="/cart">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t("backToCart")}
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <EmptyState
          icon={ShoppingBag}
          title={tCart("empty")}
          description={tCart("shopProducts")}
          action={{ label: tCart("shopProducts"), href: "/products" }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <div className="bg-linear-to-br from-cream via-cream-dark to-flour border-b border-border/40">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <Button
            variant="ghost"
            asChild
            className="mb-4 text-navy hover:text-sky"
          >
            <Link href="/cart">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t("backToCart")}
            </Link>
          </Button>
          <div className="flex items-center space-x-3">
            <ShoppingBag className="h-8 w-8 text-sky" />
            <h1 className="font-display text-4xl md:text-5xl font-bold text-navy">
              {t("title")}
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-lg border border-border p-6">
              {showAddressForm ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="font-display text-2xl font-bold text-navy">
                      {t("addNewAddress")}
                    </h2>
                    {addresses && addresses.length > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowAddressForm(false)}
                      >
                        {tCommon("cancel")}
                      </Button>
                    )}
                  </div>
                  <AddressForm
                    onChange={(data) => {
                      setNewAddress(data);
                      setSelectedAddressId(undefined);
                    }}
                  />
                </div>
              ) : (
                <AddressSelector
                  addresses={addresses || []}
                  selectedAddressId={selectedAddressId}
                  onAddressChange={(id) => {
                    setSelectedAddressId(id);
                    setNewAddress(undefined);
                  }}
                  onAddNew={() => setShowAddressForm(true)}
                />
              )}
            </div>

            <div className="bg-white rounded-lg border border-border p-6">
              <PaymentMethodSelector
                selectedMethod={paymentMethod}
                onMethodChange={setPaymentMethod}
              />
            </div>

            <div className="bg-white rounded-lg border border-border p-6 space-y-4">
              <h3 className="font-semibold text-navy">{t("orderNotes")}</h3>
              <div className="space-y-2">
                <Label htmlFor="notes">{t("additionalInstructions")}</Label>
                <Textarea
                  id="notes"
                  placeholder={t("notesPlaceholder")}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                />
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-lg border border-border p-6 space-y-6 sticky top-20">
              <h2 className="font-display text-2xl font-bold text-navy">
                {t("orderSummary")}
              </h2>

              <div className="space-y-3 max-h-60 overflow-y-auto scrollbar-thin">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3 text-sm">
                    <div className="flex-1">
                      <p className="font-medium text-navy">
                        {item.product?.name}
                      </p>
                      {item.variant && (
                        <p className="text-xs text-navy/60">
                          {item.variant.name}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-navy">x{item.quantity}</p>
                      <PriceDisplay
                        amount={toNumber(item.price_snapshot) * item.quantity}
                        className="text-sm"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-navy/70">
                  <span>{tCommon("subtotal")}</span>
                  <PriceDisplay amount={subtotal} className="text-sm font-normal" />
                </div>
                <div className="flex justify-between text-navy/70">
                  <span>{t("vat")}</span>
                  <PriceDisplay amount={vat} className="text-sm font-normal" />
                </div>
                <div className="flex justify-between text-navy/70">
                  <span>{t("deliveryFee")}</span>
                  <span className="text-sm">{t("deliveryFeeCalculated")}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-navy text-lg pt-2">
                  <span>{tCommon("total")}</span>
                  <PriceDisplay amount={total} className="text-2xl" />
                </div>
              </div>

              <Button
                size="lg"
                className="w-full bg-navy hover:bg-navy-light"
                onClick={handlePlaceOrder}
                disabled={
                  (!selectedAddressId && !newAddress) ||
                  createOrder.isPending
                }
              >
                {createOrder.isPending ? (
                  t("processing")
                ) : (
                  <>
                    <CheckCircle className="mr-2 h-5 w-5" />
                    {t("placeOrder")}
                  </>
                )}
              </Button>

              <p className="text-xs text-navy/60 text-center">
                {t("terms")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
