import { Skeleton } from "@/components/ui/skeleton";

export function ProductCardSkeleton({ index = 0 }: { index?: number }) {
  return (
    <div
      className="space-y-4 animate-fade-in-up"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <Skeleton className="h-64 w-full rounded-lg" />
      <Skeleton className="h-6 w-3/4" />
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-8 w-20" />
      </div>
    </div>
  );
}

export function ProductListSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(count)].map((_, i) => (
        <ProductCardSkeleton key={i} index={i} />
      ))}
    </div>
  );
}
