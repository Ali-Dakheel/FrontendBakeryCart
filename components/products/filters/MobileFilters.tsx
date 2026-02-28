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
    <div className="lg:hidden flex items-center gap-2 w-full">
      <Select value={filters.sortBy} onValueChange={onSortChange}>
        <SelectTrigger
          className="flex-1 h-9 text-sm rounded-full bg-white border-border hover:border-sky/50 hover:bg-sky/5 transition-colors"
          aria-label="Sort products by"
        >
          <SelectValue placeholder={t("products.sortBy")} />
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectItem value="featured">{t("products.sortFeatured")}</SelectItem>
          <SelectItem value="-created_at">{t("products.sortNewest")}</SelectItem>
          <SelectItem value="price">{t("products.sortPriceLow")}</SelectItem>
          <SelectItem value="-price">{t("products.sortPriceHigh")}</SelectItem>
          <SelectItem value="-sales_count">{t("products.sortPopular")}</SelectItem>
        </SelectContent>
      </Select>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            size="sm"
            className="h-9 text-sm rounded-full bg-sky hover:bg-sky/90 text-white shrink-0 gap-1.5 px-4"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            {t("products.filters")}
            {activeFilterCount > 0 && (
              <Badge className="h-4 w-4 rounded-full p-0 flex items-center justify-center bg-white/20 text-white text-[10px]">
                {activeFilterCount}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="bg-white w-full sm:w-100">
          <SheetHeader>
            <SheetTitle className="text-navy text-xl">{t("products.filters")}</SheetTitle>
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
                {t("products.clearFilters")}
              </Button>
              <Button
                onClick={() => setIsOpen(false)}
                className="flex-1 bg-sky hover:bg-sky/90"
              >
                {t("common.confirm")}
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
