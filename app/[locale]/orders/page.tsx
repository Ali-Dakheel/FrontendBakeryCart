"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { Package, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/EmptyState";
import { Skeleton } from "@/components/ui/skeleton";
import { useOrders } from "@/lib/hooks/useOrders";
import { OrderCard } from "@/components/orders/OrderCard";
import { Pagination } from "@/components/products/Pagination";
import { useTranslations } from "next-intl";

export default function OrdersPage() {
  const t = useTranslations();
  const [currentPage, setCurrentPage] = useState(1);
  const { data: ordersResponse, isLoading } = useOrders(currentPage);

  const orders = ordersResponse?.data || [];
  const totalPages = ordersResponse?.meta?.last_page || 1;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cream">
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-10 w-48 mb-8" />
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-32 w-full" />
            ))}
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
          <Button
            variant="ghost"
            asChild
            className="mb-4 text-navy hover:text-sky"
          >
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t("auth.backToHome")}
            </Link>
          </Button>
          <div className="flex items-center space-x-3">
            <Package className="h-8 w-8 text-sky" />
            <h1 className="font-display text-4xl md:text-5xl font-bold text-navy">
              {t("orders.title")}
            </h1>
          </div>
          <p className="text-navy/70 mt-2">
            {t("orders.subtitle")}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        {orders.length === 0 ? (
          <EmptyState
            icon={Package}
            title={t("orders.noOrders")}
            description={t("orders.emptyDescription")}
            action={{
              label: t("wishlist.continueShopping"),
              href: "/products",
            }}
          />
        ) : (
          /* Orders List */
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="space-y-4">
              {orders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={(page) => {
                    setCurrentPage(page);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
