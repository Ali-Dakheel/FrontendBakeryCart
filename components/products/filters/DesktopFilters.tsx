"use client";

import { Filter, X } from "lucide-react";
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
  const hasActiveFilters =
    filters.priceRange !== "all" ||
    filters.availability !== "all" ||
    filters.categoryId !== null ||
    filters.search !== "" ||
    (filters.sortBy !== "featured" && filters.sortBy !== "");

  const activeFilterCount = [
    filters.priceRange !== "all",
    filters.availability !== "all",
    filters.categoryId !== null,
    filters.search !== "",
    filters.sortBy !== "featured" && filters.sortBy !== "",
  ].filter(Boolean).length;

  return (
    <div className="hidden lg:flex items-center gap-3 flex-wrap">
      {/* Category Filter */}
      <div className="min-w-[180px]">
        <Select
          value={filters.categoryId?.toString() || "all"}
          onValueChange={onCategoryChange}
        >
          <SelectTrigger className="h-11 bg-white border-sky/20 hover:border-sky/40 transition-all shadow-sm" aria-label="Filter by category">
            <Filter className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0 text-sky" />
            <SelectValue placeholder={t('products.allCategories')} />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="all">{t('products.allCategories')}</SelectItem>
            {!categoriesLoading && categories?.map((category: CategoryWithParent) => (
              <SelectItem key={category.id} value={category.id.toString()}>
                {category.parentName ? `— ${category.name || category.slug}` : (category.translations?.[0]?.name || category.name || category.slug)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price Range */}
      <div className="min-w-[160px]">
        <Select value={filters.priceRange} onValueChange={onPriceRangeChange}>
          <SelectTrigger className="h-11 bg-white border-sky/20 hover:border-sky/40 transition-all shadow-sm" aria-label="Filter by price range">
            <SelectValue placeholder={t('products.priceRange')} />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="all">{t('products.allPrices')}</SelectItem>
            <SelectItem value="0-1">{t('products.underOne')}</SelectItem>
            <SelectItem value="1-3">{t('products.oneToThree')}</SelectItem>
            <SelectItem value="3-5">{t('products.threeToFive')}</SelectItem>
            <SelectItem value="5+">{t('products.fivePlus')}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Availability */}
      <div className="min-w-[160px]">
        <Select value={filters.availability} onValueChange={onAvailabilityChange}>
          <SelectTrigger className="h-11 bg-white border-sky/20 hover:border-sky/40 transition-all shadow-sm" aria-label="Filter by availability">
            <SelectValue placeholder={t('products.availability')} />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="all">{t('products.allAvailability')}</SelectItem>
            <SelectItem value="in-stock">{t('products.inStock')}</SelectItem>
            <SelectItem value="out-of-stock">{t('products.outOfStock')}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Sort */}
      <div className="min-w-[200px]">
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
