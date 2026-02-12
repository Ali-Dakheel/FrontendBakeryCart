import { Skeleton } from "@/components/ui/skeleton";

export default function ProductsLoading() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Header Skeleton */}
      <div className="bg-gradient-to-br from-cream via-cream-dark to-flour border-b border-border/40">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Skeleton className="h-8 w-8 rounded" />
            <Skeleton className="h-10 w-64" />
          </div>
          <div className="flex justify-center">
            <Skeleton className="h-6 w-96" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Filters Skeleton */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4">
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>

        {/* Products Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-64 w-full rounded-lg" />
              <Skeleton className="h-6 w-3/4" />
              <div className="flex items-center justify-between">
                <Skeleton className="h-8 w-1/3" />
                <Skeleton className="h-8 w-20" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
