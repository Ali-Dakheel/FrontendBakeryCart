import { Skeleton } from "@/components/ui/skeleton";

export function PageHeaderSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-12 w-64" />
      <Skeleton className="h-6 w-96" />
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeaderSkeleton />
      <div className="mt-8 space-y-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-32 w-full" />
        ))}
      </div>
    </div>
  );
}
