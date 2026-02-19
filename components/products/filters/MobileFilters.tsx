"use client";

import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { FilterOptions, getActiveFilterCount } from "./FilterOptions";
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
  const activeFilterCount = getActiveFilterCount(filters);

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
            <FilterOptions
              filters={filters}
              categories={categories}
              categoriesLoading={categoriesLoading}
              onCategoryChange={onCategoryChange}
              onPriceRangeChange={onPriceRangeChange}
              onAvailabilityChange={onAvailabilityChange}
              layout="vertical"
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
