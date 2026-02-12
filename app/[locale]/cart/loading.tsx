import { Skeleton } from "@/components/ui/skeleton";

export default function CartLoading() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Header Skeleton */}
      <div className="bg-gradient-to-br from-cream via-cream-dark to-flour border-b border-border/40">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Skeleton className="h-8 w-8 rounded" />
              <Skeleton className="h-10 w-48" />
            </div>
            <Skeleton className="h-10 w-40" />
          </div>
          <Skeleton className="h-6 w-32" />
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items Skeleton */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-center">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-8 w-24" />
            </div>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-32 w-full rounded-lg" />
              ))}
            </div>
          </div>

          {/* Order Summary Skeleton */}
          <div>
            <Skeleton className="h-96 w-full rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
