"use client";

import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import type { CategoryWithParent } from "@/lib/types";
import type { FilterValues } from "../ProductFilters";
import { useTranslations } from "next-intl";

interface MobileFiltersProps {
  filters: FilterValues;
  categories: CategoryWithParent[];
  categoriesLoading: boolean;
  onCategoryChange: (value: string) => void;
  onPriceRangeChange: (value: string) => void;
  onAvailabilityChange: (value: string) => void;
  onSortChange: (value: string) => void;
  onReset: () => void;
}

export function MobileFilters({
  filters,
  categories,
  categoriesLoading,
  onCategoryChange,
  onPriceRangeChange,
  onAvailabilityChange,
  onSortChange,
  onReset,
}: MobileFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations();

  const activeFilterCount = [
    filters.priceRange !== "all",
    filters.availability !== "all",
    filters.categoryId !== null,
    filters.search !== "",
    filters.sortBy !== "featured" && filters.sortBy !== "",
  ].filter(Boolean).length;

  return (
    <div className="lg:hidden flex items-center gap-3">
      <Select value={filters.sortBy} onValueChange={onSortChange}>
        <SelectTrigger className="flex-1 h-11 bg-white border-sky/20" aria-label="Sort products by">
          <SelectValue placeholder={t('products.sortBy')} />
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectItem value="featured">{t('products.sortFeatured')}</SelectItem>
          <SelectItem value="-created_at">{t('products.sortNewest')}</SelectItem>
          <SelectItem value="price">{t('products.sortPriceLow')}</SelectItem>
          <SelectItem value="-price">{t('products.sortPriceHigh')}</SelectItem>
          <SelectItem value="-sales_count">{t('products.sortPopular')}</SelectItem>
        </SelectContent>
      </Select>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button className="h-11 bg-sky hover:bg-sky/90 text-white shadow-md relative">
            <SlidersHorizontal className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
            {t('products.filters')}
            {activeFilterCount > 0 && (
              <Badge className="ml-2 rtl:mr-2 rtl:ml-0 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-sky text-white text-xs">
                {activeFilterCount}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="bg-white w-full sm:w-[400px]">
          <SheetHeader>
            <SheetTitle className="text-navy text-xl">{t('products.filters')}</SheetTitle>
          </SheetHeader>
          <div className="mt-6 space-y-6">
            <MobileFilterContent
              filters={filters}
              categories={categories}
              categoriesLoading={categoriesLoading}
              onCategoryChange={onCategoryChange}
              onPriceRangeChange={onPriceRangeChange}
              onAvailabilityChange={onAvailabilityChange}
            />
            <div className="flex gap-3 pt-4 border-t">
              <Button onClick={onReset} variant="outline" className="flex-1">
                {t('products.clearFilters')}
              </Button>
              <Button onClick={() => setIsOpen(false)} className="flex-1 bg-sky hover:bg-sky/90">
                {t('common.confirm')}
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

// Mobile Filter Content Component
function MobileFilterContent({
  filters,
  categories,
  categoriesLoading,
  onCategoryChange,
  onPriceRangeChange,
  onAvailabilityChange,
}: {
  filters: FilterValues;
  categories: CategoryWithParent[];
  categoriesLoading: boolean;
  onCategoryChange: (value: string) => void;
  onPriceRangeChange: (value: string) => void;
  onAvailabilityChange: (value: string) => void;
}) {
  const t = useTranslations();

  return (
    <div className="space-y-6">
      {/* Category */}
      <div className="space-y-3">
        <Label className="text-navy text-base font-medium">{t('products.category')}</Label>
        <Select value={filters.categoryId?.toString() || "all"} onValueChange={onCategoryChange}>
          <SelectTrigger className="w-full" aria-label="Filter by category">
            <SelectValue placeholder={t('products.allCategories')} />
          </SelectTrigger>
          <SelectContent>
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
      <div className="space-y-3">
        <Label className="text-navy text-base font-medium">{t('products.priceRange')}</Label>
        <Select value={filters.priceRange} onValueChange={onPriceRangeChange}>
          <SelectTrigger className="w-full" aria-label="Filter by price range">
            <SelectValue placeholder={t('products.allPrices')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('products.allPrices')}</SelectItem>
            <SelectItem value="0-1">{t('products.underOne')}</SelectItem>
            <SelectItem value="1-3">{t('products.oneToThree')}</SelectItem>
            <SelectItem value="3-5">{t('products.threeToFive')}</SelectItem>
            <SelectItem value="5+">{t('products.fivePlus')}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Availability */}
      <div className="space-y-3">
        <Label className="text-navy text-base font-medium">{t('products.availability')}</Label>
        <Select value={filters.availability} onValueChange={onAvailabilityChange}>
          <SelectTrigger className="w-full" aria-label="Filter by availability">
            <SelectValue placeholder={t('products.allAvailability')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('products.allAvailability')}</SelectItem>
            <SelectItem value="in-stock">{t('products.inStock')}</SelectItem>
            <SelectItem value="out-of-stock">{t('products.outOfStock')}</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
