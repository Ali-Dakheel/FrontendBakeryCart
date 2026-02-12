import { useMemo } from "react";
import { calculateVAT, calculateTotalWithVAT } from "@/lib/utils/formatters";
import { VAT_RATE } from "@/lib/utils/constants";
import type { CartItem } from "@/lib/types";

interface PriceCalculation {
  subtotal: number;
  vat: number;
  total: number;
}

/**
 * Hook to calculate cart prices (subtotal, VAT, total)
 * Handles type coercion for price_snapshot which can be string or number
 */
export function usePriceCalculation(items: CartItem[] = []): PriceCalculation {
  return useMemo(() => {
    const subtotal = items.reduce((sum, item) => {
      const price =
        typeof item.price_snapshot === "number"
          ? item.price_snapshot
          : parseFloat(item.price_snapshot);
      return sum + price * item.quantity;
    }, 0);

    const vat = calculateVAT(subtotal, VAT_RATE);
    const total = calculateTotalWithVAT(subtotal, VAT_RATE);

    return { subtotal, vat, total };
  }, [items]);
}
