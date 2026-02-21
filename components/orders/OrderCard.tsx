"use client";

import { memo } from "react";
import { Link } from "@/i18n/navigation";
import { Package, Calendar, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PriceDisplay } from "@/components/shared/PriceDisplay";
import { formatDate } from "@/lib/utils/formatters";
import { ORDER_STATUS_COLORS, ORDER_STATUS_LABELS } from "@/lib/utils/constants";
import type { Order } from "@/lib/types";

interface OrderCardProps {
  order: Order;
  index?: number;
}

function OrderCardComponent({ order, index = 0 }: OrderCardProps) {
  const statusColor = (ORDER_STATUS_COLORS as Record<string, string>)[order.status] || "bg-gray-100 text-gray-800";
  const statusLabel = (ORDER_STATUS_LABELS as Record<string, string>)[order.status] || order.status;

  return (
    <div
      className="animate-slide-in-left"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <Link href={`/orders/${order.id}`}>
        <Card className="flour-texture group hover:shadow-xl transition-all duration-300 hover:scale-[1.01] border-border bg-white">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              {/* Order Info */}
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-sky/10 flex items-center justify-center shrink-0 transition-all duration-300 group-hover:bg-sky/20 group-hover:scale-110">
                    <Package className="h-6 w-6 text-sky transition-transform duration-300 group-hover:rotate-12" />
                  </div>
                  <div>
                    <p className="font-mono font-semibold text-navy group-hover:text-sky transition-colors duration-200">
                      #{order.order_number}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-navy/60 mt-0.5">
                      <Calendar className="h-3 w-3" />
                      {formatDate(order.created_at)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge className={`${statusColor} shadow-sm`}>{statusLabel}</Badge>
                  <span className="text-sm text-navy/60">
                    {order.items?.length || 0} items
                  </span>
                </div>
              </div>

              {/* Price & Action */}
              <div className="flex sm:flex-col items-center sm:items-end gap-4 sm:gap-2">
                <PriceDisplay amount={order.total} className="text-2xl" />
                <Button size="sm" variant="ghost" className="text-sky hover:text-sky-dark transition-all duration-200 hover:scale-105">
                  View Details
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
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
export const OrderCard = memo(OrderCardComponent, (prevProps, nextProps) => {
  return prevProps.order.id === nextProps.order.id &&
         prevProps.order.status === nextProps.order.status &&
         prevProps.index === nextProps.index;
});

OrderCard.displayName = "OrderCard";
