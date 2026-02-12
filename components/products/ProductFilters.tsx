"use client";

import { useCategories } from "@/lib/hooks/useCategories";
import { SearchBar } from "./filters/SearchBar";
import { DesktopFilters } from "./filters/DesktopFilters";
import { MobileFilters } from "./filters/MobileFilters";
import { ActiveFilterBadges } from "./filters/ActiveFilterBadges";
import type { CategoryWithParent } from "@/lib/types";

export interface FilterValues {
  search: string;
  categoryId: number | null;
  sortBy: string;
  priceRange: string;
  availability: string;
}

interface ProductFiltersProps {
  filters: FilterValues;
  onFilterChange: (filters: FilterValues) => void;
  onReset: () => void;
}

export function ProductFilters({ filters, onFilterChange, onReset }: ProductFiltersProps) {
  const { data: categories, isLoading: categoriesLoading } = useCategories();

  // Flatten categories to include both parents and children
  const flattenedCategories: CategoryWithParent[] = categories?.flatMap((category) => {
    const items: CategoryWithParent[] = [category];
    if (category.children && category.children.length > 0) {
      // Add children with a parent reference for display
      category.children.forEach((child) => {
        items.push({
          ...child,
          parentName: category.translations?.[0]?.name || category.slug,
          name: child.translations?.[0]?.name || child.slug,
        });
      });
    }
    return items;
  }) || [];

  const handleSearchChange = (value: string) => {
    onFilterChange({ ...filters, search: value });
  };

  const handleCategoryChange = (value: string) => {
    onFilterChange({ ...filters, categoryId: value === "all" ? null : parseInt(value) });
  };

  const handleSortChange = (value: string) => {
    onFilterChange({ ...filters, sortBy: value });
  };

  const handlePriceRangeChange = (value: string) => {
    onFilterChange({ ...filters, priceRange: value });
  };

  const handleAvailabilityChange = (value: string) => {
    onFilterChange({ ...filters, availability: value });
  };

  return (
    <div className="space-y-6">
      {/* Primary Search Bar */}
      <SearchBar
        value={filters.search}
        onChange={handleSearchChange}
        placeholder="Search for croissants, sourdough, pastries..."
      />

      {/* Desktop Filters */}
      <DesktopFilters
        filters={filters}
        categories={flattenedCategories}
        categoriesLoading={categoriesLoading}
        onCategoryChange={handleCategoryChange}
        onPriceRangeChange={handlePriceRangeChange}
        onAvailabilityChange={handleAvailabilityChange}
        onSortChange={handleSortChange}
        onReset={onReset}
      />

      {/* Mobile Filters */}
      <MobileFilters
        filters={filters}
        categories={flattenedCategories}
        categoriesLoading={categoriesLoading}
        onCategoryChange={handleCategoryChange}
        onPriceRangeChange={handlePriceRangeChange}
        onAvailabilityChange={handleAvailabilityChange}
        onSortChange={handleSortChange}
        onReset={onReset}
      />

      {/* Active Filters Display */}
      <ActiveFilterBadges
        filters={filters}
        categories={flattenedCategories}
        onCategoryChange={handleCategoryChange}
        onPriceRangeChange={handlePriceRangeChange}
        onAvailabilityChange={handleAvailabilityChange}
      />
    </div>
  );
}
