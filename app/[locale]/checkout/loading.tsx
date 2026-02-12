import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-cream py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Page Title */}
        <div className="mb-8">
          <Skeleton className="h-10 w-48 mx-auto" />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Address Card */}
            <div className="bg-white rounded-lg p-6 space-y-4">
              <Skeleton className="h-7 w-40" />
              <div className="space-y-3">
                <Skeleton className="h-32 w-full rounded-lg" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>

            {/* Payment Method Card */}
            <div className="bg-white rounded-lg p-6 space-y-4">
              <Skeleton className="h-7 w-36" />
              <div className="space-y-2">
                {[...Array(2)].map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full rounded-lg" />
                ))}
              </div>
            </div>

            {/* Order Notes Card */}
            <div className="bg-white rounded-lg p-6 space-y-4">
              <Skeleton className="h-7 w-32" />
              <Skeleton className="h-24 w-full" />
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 space-y-6 sticky top-24">
              <Skeleton className="h-7 w-36" />

              {/* Cart Items */}
              <div className="space-y-4 border-b pb-4">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="flex gap-3">
                    <Skeleton className="h-16 w-16 rounded" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Summary */}
              <div className="space-y-3 border-b pb-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex justify-between">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                ))}
              </div>

              {/* Place Order Button */}
              <Skeleton className="h-12 w-full rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
