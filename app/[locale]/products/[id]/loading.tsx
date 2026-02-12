import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-cream py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumb skeleton */}
        <div className="mb-8">
          <Skeleton className="h-5 w-48" />
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Image Gallery Skeleton */}
          <div className="space-y-4">
            <Skeleton className="aspect-square w-full rounded-lg" />
            <div className="grid grid-cols-5 gap-2">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="aspect-square rounded-md" />
              ))}
            </div>
          </div>

          {/* Product Details Skeleton */}
          <div className="space-y-6">
            {/* Title */}
            <Skeleton className="h-10 w-3/4" />

            {/* Price */}
            <div className="space-y-2">
              <Skeleton className="h-12 w-32" />
              <Skeleton className="h-4 w-20" />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-20 w-full" />
            </div>

            {/* Variants */}
            <div className="space-y-3">
              <Skeleton className="h-6 w-24" />
              <div className="grid grid-cols-3 gap-2">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-12 rounded-lg" />
                ))}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Skeleton className="h-12 w-32" />
                <Skeleton className="h-12 flex-1" />
              </div>
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
