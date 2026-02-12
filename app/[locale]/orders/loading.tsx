import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-cream py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Page Title */}
        <div className="mb-8">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-5 w-64 mt-2" />
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-lg p-6 space-y-4 animate-fade-in-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {/* Order Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b">
                <div className="space-y-2">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-4 w-40" />
                </div>
                <Skeleton className="h-8 w-28 rounded-full" />
              </div>

              {/* Order Items */}
              <div className="space-y-3">
                {[...Array(2)].map((_, j) => (
                  <div key={j} className="flex gap-4">
                    <Skeleton className="h-20 w-20 rounded" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-5 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Footer */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t">
                <div className="space-y-2">
                  {[...Array(2)].map((_, j) => (
                    <Skeleton key={j} className="h-4 w-48" />
                  ))}
                </div>
                <Skeleton className="h-6 w-32" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
