"use client";

import { X } from "lucide-react";
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
    <div className="flex items-center gap-2 flex-wrap pt-2">
      <span className="text-sm text-navy/60">Active:</span>
      {filters.categoryId && (
        <Badge variant="secondary" className="gap-1">
          {categories?.find((c: CategoryWithParent) => c.id === filters.categoryId)?.name ||
            categories?.find((c: CategoryWithParent) => c.id === filters.categoryId)?.translations?.[0]?.name ||
            "Category"}
          <button onClick={() => onCategoryChange("all")} className="hover:text-sky">
            <X className="h-3 w-3" />
          </button>
        </Badge>
      )}
      {filters.priceRange !== "all" && (
        <Badge variant="secondary" className="gap-1">
          {filters.priceRange} BHD
          <button onClick={() => onPriceRangeChange("all")} className="hover:text-sky">
            <X className="h-3 w-3" />
          </button>
        </Badge>
      )}
      {filters.availability !== "all" && (
        <Badge variant="secondary" className="gap-1">
          {filters.availability === "in-stock" ? "In Stock" : "Out of Stock"}
          <button onClick={() => onAvailabilityChange("all")} className="hover:text-sky">
            <X className="h-3 w-3" />
          </button>
        </Badge>
      )}
    </div>
  );
}
