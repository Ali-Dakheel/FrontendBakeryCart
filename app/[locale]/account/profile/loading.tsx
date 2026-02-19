import { Skeleton } from "@/components/ui/skeleton";

// Replicates AccountLayout shell without hooks (loading.tsx is a Server Component)
export default function ProfileLoading() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-gradient-to-br from-cream via-cream-dark to-flour border-b border-border/40">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <Skeleton className="h-12 w-48" />
          <Skeleton className="h-5 w-64 mt-2" />
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Sidebar skeleton */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg border border-border p-4 space-y-2">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-11 w-full rounded-lg" />
              ))}
              <Skeleton className="h-px w-full my-2" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>
          </div>

          {/* Main content skeleton */}
          <div className="md:col-span-3 space-y-6">
            <Skeleton className="h-64 w-full rounded-lg" />
            <Skeleton className="h-64 w-full rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
