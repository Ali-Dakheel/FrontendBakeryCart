"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
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
  onSortChange: (value: string) => void;
  onReset: () => void;
}

export function DesktopFilters({
  filters,
  categories,
  categoriesLoading,
  onCategoryChange,
  onPriceRangeChange,
  onAvailabilityChange,
  onSortChange,
  onReset,
}: DesktopFiltersProps) {
  const t = useTranslations();
  const activeFilterCount = getActiveFilterCount(filters);
  const hasActiveFilters = activeFilterCount > 0;

  return (
    <div className="hidden lg:flex items-center gap-2">
      {/* Filter dropdowns */}
      <FilterOptions
        filters={filters}
        categories={categories}
        categoriesLoading={categoriesLoading}
        onCategoryChange={onCategoryChange}
        onPriceRangeChange={onPriceRangeChange}
        onAvailabilityChange={onAvailabilityChange}
        layout="horizontal"
      />

      <Separator orientation="vertical" className="h-5 mx-1 bg-border/60" />

      {/* Sort */}
      <Select value={filters.sortBy} onValueChange={onSortChange}>
        <SelectTrigger
          className="h-9 min-w-40 text-sm rounded-full bg-white border-border hover:border-sky/50 hover:bg-sky/5 transition-colors"
          aria-label="Sort products by"
        >
          <SelectValue placeholder={t("products.sortBy")} />
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectItem value="featured">{t("products.sortFeatured")}</SelectItem>
          <SelectItem value="-created_at">{t("products.sortNewest")}</SelectItem>
          <SelectItem value="created_at">{t("products.sortOldest")}</SelectItem>
          <SelectItem value="price">{t("products.sortPriceLow")}</SelectItem>
          <SelectItem value="-price">{t("products.sortPriceHigh")}</SelectItem>
          <SelectItem value="-sales_count">{t("products.sortPopular")}</SelectItem>
        </SelectContent>
      </Select>

      {/* Clear Filters */}
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
