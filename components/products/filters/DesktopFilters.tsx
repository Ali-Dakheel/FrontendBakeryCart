"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CategoryWithParent } from "@/lib/types";
import type { FilterValues } from "../ProductFilters";
import { FilterOptions, getActiveFilterCount } from "./FilterOptions";
import { useTranslations } from "next-intl";

interface DesktopFiltersProps {
  filters: FilterValues;
  categories: CategoryWithParent[];
  categoriesLoading: boolean;
  onCategoryChange: (value: string) => void;
  onPriceRangeChange: (value: string) => void;
  onAvailabilityChange: (value: string) => void;
  onReset: () => void;
}

export function DesktopFilters({
  filters,
  categories,
  categoriesLoading,
  onCategoryChange,
  onPriceRangeChange,
  onAvailabilityChange,
  onReset,
}: DesktopFiltersProps) {
  const t = useTranslations();
  const activeFilterCount = getActiveFilterCount(filters);
  const hasActiveFilters = activeFilterCount > 0;

  return (
    <div className="hidden lg:flex items-center gap-2 flex-wrap">
      <FilterOptions
        filters={filters}
        categories={categories}
        categoriesLoading={categoriesLoading}
        onCategoryChange={onCategoryChange}
        onPriceRangeChange={onPriceRangeChange}
        onAvailabilityChange={onAvailabilityChange}
        layout="horizontal"
      />

      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onReset}
          className="h-9 text-sm rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/60 gap-1.5"
        >
          <X className="h-3.5 w-3.5" />
          {t("products.clearFilters")} ({activeFilterCount})
        </Button>
      )}
    </div>
  );
}
