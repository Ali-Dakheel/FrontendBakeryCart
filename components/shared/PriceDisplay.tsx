import { formatBHD } from "@/lib/utils/formatters";
import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";

interface PriceDisplayProps {
  amount: number | string;
  className?: string;
  showCurrency?: boolean;
  unit?: string; // e.g., "per kg", "per box", "per piece"
  showUnit?: boolean;
}

export function PriceDisplay({
  amount,
  className,
  showCurrency = true,
  unit,
  showUnit = true
}: PriceDisplayProps) {
  const locale = useLocale();

  return (
    <div className="flex flex-col items-start">
      <span className={cn("font-handwritten font-bold text-navy", className)}>
        {showCurrency ? formatBHD(amount, locale) : typeof amount === "string" ? parseFloat(amount).toFixed(3) : amount.toFixed(3)}
      </span>
      {showUnit && unit && (
        <span className="text-xs text-navy/60 font-medium -mt-1">
          {unit}
        </span>
      )}
    </div>
  );
}
