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
          <SelectValue placeholder="Sort" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectItem value="featured">Featured</SelectItem>
          <SelectItem value="-created_at">Newest</SelectItem>
          <SelectItem value="price">Price: Low</SelectItem>
          <SelectItem value="-price">Price: High</SelectItem>
          <SelectItem value="-sales_count">Popular</SelectItem>
        </SelectContent>
      </Select>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button className="h-11 bg-sky hover:bg-sky/90 text-white shadow-md relative">
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filters
            {activeFilterCount > 0 && (
              <Badge className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-sky text-white text-xs">
                {activeFilterCount}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="bg-white w-full sm:w-[400px]">
          <SheetHeader>
            <SheetTitle className="text-navy text-xl">Filter Products</SheetTitle>
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
                Clear
              </Button>
              <Button onClick={() => setIsOpen(false)} className="flex-1 bg-sky hover:bg-sky/90">
                Apply
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
  return (
    <div className="space-y-6">
      {/* Category */}
      <div className="space-y-3">
        <Label className="text-navy text-base font-medium">Category</Label>
        <Select value={filters.categoryId?.toString() || "all"} onValueChange={onCategoryChange}>
          <SelectTrigger className="w-full" aria-label="Filter by category">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
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
        <Label className="text-navy text-base font-medium">Price Range</Label>
        <Select value={filters.priceRange} onValueChange={onPriceRangeChange}>
          <SelectTrigger className="w-full" aria-label="Filter by price range">
            <SelectValue placeholder="All Prices" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Prices</SelectItem>
            <SelectItem value="0-1">Under 1 BHD</SelectItem>
            <SelectItem value="1-3">1 - 3 BHD</SelectItem>
            <SelectItem value="3-5">3 - 5 BHD</SelectItem>
            <SelectItem value="5+">5+ BHD</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Availability */}
      <div className="space-y-3">
        <Label className="text-navy text-base font-medium">Availability</Label>
        <Select value={filters.availability} onValueChange={onAvailabilityChange}>
          <SelectTrigger className="w-full" aria-label="Filter by availability">
            <SelectValue placeholder="All Products" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Products</SelectItem>
            <SelectItem value="in-stock">In Stock Only</SelectItem>
            <SelectItem value="out-of-stock">Out of Stock</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
