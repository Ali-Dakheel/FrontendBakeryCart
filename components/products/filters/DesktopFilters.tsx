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
    <div className="hidden lg:flex items-center gap-3 flex-wrap">
      <FilterOptions
        filters={filters}
        categories={categories}
        categoriesLoading={categoriesLoading}
        onCategoryChange={onCategoryChange}
        onPriceRangeChange={onPriceRangeChange}
        onAvailabilityChange={onAvailabilityChange}
        layout="horizontal"
      />

      {/* Sort */}
      <div className="min-w-50">
        <Select value={filters.sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="h-11 bg-white border-sky/20 hover:border-sky/40 transition-all shadow-sm" aria-label="Sort products by">
            <SelectValue placeholder={t('products.sortBy')} />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="featured">{t('products.sortFeatured')}</SelectItem>
            <SelectItem value="-created_at">{t('products.sortNewest')}</SelectItem>
            <SelectItem value="created_at">{t('products.sortOldest')}</SelectItem>
            <SelectItem value="price">{t('products.sortPriceLow')}</SelectItem>
            <SelectItem value="-price">{t('products.sortPriceHigh')}</SelectItem>
            <SelectItem value="-sales_count">{t('products.sortPopular')}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button
          variant="ghost"
          onClick={onReset}
          className="h-11 text-navy hover:text-sky hover:bg-sky/10 transition-all"
        >
          <X className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
          {t('products.clearFilters')} ({activeFilterCount})
        </Button>
      )}
    </div>
  );
}
