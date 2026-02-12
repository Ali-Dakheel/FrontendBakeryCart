import { Badge } from "@/components/ui/badge";
import { ORDER_STATUS_COLORS, ORDER_STATUS_LABELS } from "@/lib/utils/constants";

interface OrderStatusBadgeProps {
  status: string;
  className?: string;
}

export function OrderStatusBadge({ status, className }: OrderStatusBadgeProps) {
  const statusColor = ORDER_STATUS_COLORS[status] || "bg-gray-100 text-gray-800";
  const statusLabel = ORDER_STATUS_LABELS[status] || status;

  return (
    <Badge className={`${statusColor} ${className}`}>
      {statusLabel}
    </Badge>
  );
}
