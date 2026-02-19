"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Filter } from "lucide-react";
import type { CategoryWithParent } from "@/lib/types";
import type { FilterValues } from "../ProductFilters";
import { useTranslations } from "next-intl";

interface FilterOptionsProps {
  filters: FilterValues;
  categories: CategoryWithParent[];
  categoriesLoading: boolean;
  onCategoryChange: (value: string) => void;
  onPriceRangeChange: (value: string) => void;
  onAvailabilityChange: (value: string) => void;
  layout?: "horizontal" | "vertical";
}

/** Returns the number of non-default filters currently applied. */
export function getActiveFilterCount(filters: FilterValues): number {
  return [
    filters.priceRange !== "all",
    filters.availability !== "all",
    filters.categoryId !== null,
    filters.search !== "",
    filters.sortBy !== "featured" && filters.sortBy !== "",
  ].filter(Boolean).length;
}

export function FilterOptions({
  filters,
  categories,
  categoriesLoading,
  onCategoryChange,
  onPriceRangeChange,
  onAvailabilityChange,
  layout = "horizontal",
}: FilterOptionsProps) {
  const t = useTranslations();
  const isVertical = layout === "vertical";

  const categorySelect = (
    <Select
      value={filters.categoryId?.toString() || "all"}
      onValueChange={onCategoryChange}
    >
      <SelectTrigger
        className={isVertical ? "w-full" : "h-11 bg-white border-sky/20 hover:border-sky/40 transition-all shadow-sm"}
        aria-label="Filter by category"
      >
        {!isVertical && <Filter className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0 text-sky" />}
        <SelectValue placeholder={t('products.allCategories')} />
      </SelectTrigger>
      <SelectContent className={isVertical ? undefined : "bg-white"}>
        <SelectItem value="all">{t('products.allCategories')}</SelectItem>
        {!categoriesLoading && categories?.map((category: CategoryWithParent) => (
          <SelectItem key={category.id} value={category.id.toString()}>
            {category.parentName
              ? `— ${category.name || category.slug}`
              : (category.translations?.[0]?.name || category.name || category.slug)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );

  const priceSelect = (
    <Select value={filters.priceRange} onValueChange={onPriceRangeChange}>
      <SelectTrigger
        className={isVertical ? "w-full" : "h-11 bg-white border-sky/20 hover:border-sky/40 transition-all shadow-sm"}
        aria-label="Filter by price range"
      >
        <SelectValue placeholder={t('products.priceRange')} />
      </SelectTrigger>
      <SelectContent className={isVertical ? undefined : "bg-white"}>
        <SelectItem value="all">{t('products.allPrices')}</SelectItem>
        <SelectItem value="0-1">{t('products.underOne')}</SelectItem>
        <SelectItem value="1-3">{t('products.oneToThree')}</SelectItem>
        <SelectItem value="3-5">{t('products.threeToFive')}</SelectItem>
        <SelectItem value="5+">{t('products.fivePlus')}</SelectItem>
      </SelectContent>
    </Select>
  );

  const availabilitySelect = (
    <Select value={filters.availability} onValueChange={onAvailabilityChange}>
      <SelectTrigger
        className={isVertical ? "w-full" : "h-11 bg-white border-sky/20 hover:border-sky/40 transition-all shadow-sm"}
        aria-label="Filter by availability"
      >
        <SelectValue placeholder={t('products.availability')} />
      </SelectTrigger>
      <SelectContent className={isVertical ? undefined : "bg-white"}>
        <SelectItem value="all">{t('products.allAvailability')}</SelectItem>
        <SelectItem value="in-stock">{t('products.inStock')}</SelectItem>
        <SelectItem value="out-of-stock">{t('products.outOfStock')}</SelectItem>
      </SelectContent>
    </Select>
  );

  if (isVertical) {
    return (
      <div className="space-y-6">
        <div className="space-y-3">
          <Label className="text-navy text-base font-medium">{t('products.category')}</Label>
          {categorySelect}
        </div>
        <div className="space-y-3">
          <Label className="text-navy text-base font-medium">{t('products.priceRange')}</Label>
          {priceSelect}
        </div>
        <div className="space-y-3">
          <Label className="text-navy text-base font-medium">{t('products.availability')}</Label>
          {availabilitySelect}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-w-45">{categorySelect}</div>
      <div className="min-w-40">{priceSelect}</div>
      <div className="min-w-40">{availabilitySelect}</div>
    </>
  );
}
