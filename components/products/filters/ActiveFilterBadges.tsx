"use client";

import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import type { CategoryWithParent } from "@/lib/types";
import type { FilterValues } from "../ProductFilters";

interface ActiveFilterBadgesProps {
  filters: FilterValues;
  categories: CategoryWithParent[];
  onCategoryChange: (value: string) => void;
  onPriceRangeChange: (value: string) => void;
  onAvailabilityChange: (value: string) => void;
}

export function ActiveFilterBadges({
  filters,
  categories,
  onCategoryChange,
  onPriceRangeChange,
  onAvailabilityChange,
}: ActiveFilterBadgesProps) {
  const t = useTranslations();

  const hasActiveFilters =
    filters.priceRange !== "all" ||
    filters.availability !== "all" ||
    filters.categoryId !== null ||
    filters.search !== "" ||
    (filters.sortBy !== "featured" && filters.sortBy !== "");

  if (!hasActiveFilters) {
    return null;
  }

  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      {filters.categoryId && (
        <button
          onClick={() => onCategoryChange("all")}
          className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-sky/10 text-sky border border-sky/20 hover:bg-sky/20 transition-colors"
        >
          {categories?.find((c: CategoryWithParent) => c.id === filters.categoryId)?.name ||
            categories?.find((c: CategoryWithParent) => c.id === filters.categoryId)?.translations?.[0]?.name ||
            "Category"}
          <X className="h-3 w-3 shrink-0" />
        </button>
      )}
      {filters.priceRange !== "all" && (
        <button
          onClick={() => onPriceRangeChange("all")}
          className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-sky/10 text-sky border border-sky/20 hover:bg-sky/20 transition-colors"
        >
          {filters.priceRange} {t('common.currency')}
          <X className="h-3 w-3 shrink-0" />
        </button>
      )}
      {filters.availability !== "all" && (
        <button
          onClick={() => onAvailabilityChange("all")}
          className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-sky/10 text-sky border border-sky/20 hover:bg-sky/20 transition-colors"
        >
          {filters.availability === "in-stock" ? t("products.inStock") : t("products.outOfStock")}
          <X className="h-3 w-3 shrink-0" />
        </button>
      )}
    </div>
  );
}
