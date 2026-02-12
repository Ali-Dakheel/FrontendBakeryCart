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
            <Filter className="h-4 w-4 mr-2 text-sky" />
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent className="bg-white">
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
      <div className="min-w-[160px]">
        <Select value={filters.priceRange} onValueChange={onPriceRangeChange}>
          <SelectTrigger className="h-11 bg-white border-sky/20 hover:border-sky/40 transition-all shadow-sm" aria-label="Filter by price range">
            <SelectValue placeholder="Price" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="all">All Prices</SelectItem>
            <SelectItem value="0-1">Under 1 BHD</SelectItem>
            <SelectItem value="1-3">1 - 3 BHD</SelectItem>
            <SelectItem value="3-5">3 - 5 BHD</SelectItem>
            <SelectItem value="5+">5+ BHD</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Availability */}
      <div className="min-w-[160px]">
        <Select value={filters.availability} onValueChange={onAvailabilityChange}>
          <SelectTrigger className="h-11 bg-white border-sky/20 hover:border-sky/40 transition-all shadow-sm" aria-label="Filter by availability">
            <SelectValue placeholder="Availability" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="all">All Products</SelectItem>
            <SelectItem value="in-stock">In Stock</SelectItem>
            <SelectItem value="out-of-stock">Out of Stock</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Sort */}
      <div className="min-w-[200px]">
        <Select value={filters.sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="h-11 bg-white border-sky/20 hover:border-sky/40 transition-all shadow-sm" aria-label="Sort products by">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="featured">Featured</SelectItem>
            <SelectItem value="-created_at">Newest First</SelectItem>
            <SelectItem value="created_at">Oldest First</SelectItem>
            <SelectItem value="price">Price: Low to High</SelectItem>
            <SelectItem value="-price">Price: High to Low</SelectItem>
            <SelectItem value="-sales_count">Most Popular</SelectItem>
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
          <X className="h-4 w-4 mr-2" />
          Clear ({activeFilterCount})
        </Button>
      )}
    </div>
  );
}
