"use client";

import { useState, useMemo } from "react";
import { useProducts } from "@/lib/hooks/useProducts";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ProductFilters, type FilterValues } from "@/components/products/ProductFilters";
import { Pagination } from "@/components/products/Pagination";
import type { ProductFilters as APIFilters } from "@/lib/api/products";

export default function ProductsPage() {
  const [filters, setFilters] = useState<FilterValues>({
    search: "",
    categoryId: null,
    sortBy: "featured",
    priceRange: "all",
    availability: "all",
  });
  const [currentPage, setCurrentPage] = useState(1);

  // Convert UI filters to API filters
  const apiFilters = useMemo<APIFilters>(() => {
    const params: APIFilters = {
      page: currentPage,
      per_page: 12,
    };

    // Search
    if (filters.search) {
      params.search = filters.search;
    }

    // Category
    if (filters.categoryId) {
      params.category_id = filters.categoryId;
    }

    // Sort
    if (filters.sortBy) {
      if (filters.sortBy === "featured") {
        // Sort by is_featured descending (featured items first)
        params.sort = "-is_featured";
      } else {
        params.sort = filters.sortBy;
      }
    }

    // Price Range
    if (filters.priceRange !== "all") {
      const [min, max] = filters.priceRange.split("-");
      if (min) params.min_price = parseFloat(min);
      if (max && max !== "+") params.max_price = parseFloat(max);
    }

    // Availability
    if (filters.availability === "in-stock") {
      params.is_available = true;
    } else if (filters.availability === "out-of-stock") {
      params.is_available = false;
    }

    return params;
  }, [filters, currentPage]);

  const { data: productsResponse, isLoading } = useProducts(apiFilters);

  const products = productsResponse?.data || [];
  const totalPages = productsResponse?.meta?.last_page || 1;
  const totalCount = productsResponse?.meta?.total || 0;

  const handleFilterChange = (newFilters: FilterValues) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleReset = () => {
    setFilters({
      search: "",
      categoryId: null,
      sortBy: "featured",
      priceRange: "all",
      availability: "all",
    });
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-gradient-to-br from-cream via-cream-dark to-flour border-b border-border/40">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="text-center space-y-4">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-navy">
              Our Products
            </h1>
            <p className="text-navy/70 max-w-2xl mx-auto text-base md:text-lg">
              Artisan breads and pastries, baked fresh daily with traditional techniques
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Filters */}
        <div className="mb-8">
          <ProductFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={handleReset}
          />
        </div>

        {/* Results Count */}
        {!isLoading && (
          <div className="mb-6 text-sm text-navy/60">
            Showing {products.length} of {totalCount} products
          </div>
        )}

        {/* Product Grid */}
        <ProductGrid
          products={products}
          isLoading={isLoading}
          emptyMessage="No products match your filters. Try adjusting your search criteria."
        />

        {/* Pagination */}
        {!isLoading && totalPages > 1 && (
          <div className="mt-12">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}
