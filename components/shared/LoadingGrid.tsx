import { Skeleton } from "@/components/ui/skeleton";

interface LoadingGridProps {
  count?: number;
  columns?: {
    base?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
}

export function LoadingGrid({
  count = 8,
  columns = {
    base: 1,
    sm: 2,
    md: 2,
    lg: 3,
    xl: 4
  }
}: LoadingGridProps) {
  const gridCols = `grid-cols-${columns.base || 1} ${columns.sm ? `sm:grid-cols-${columns.sm}` : ''} ${columns.md ? `md:grid-cols-${columns.md}` : ''} ${columns.lg ? `lg:grid-cols-${columns.lg}` : ''} ${columns.xl ? `xl:grid-cols-${columns.xl}` : ''}`.trim();

  return (
    <div className={`grid ${gridCols} gap-6`}>
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="space-y-4 animate-fade-in-up"
          style={{ animationDelay: `${i * 50}ms` }}
        >
          <Skeleton className="h-64 w-full rounded-lg" />
          <Skeleton className="h-6 w-3/4" />
          <div className="flex items-center justify-between">
            <Skeleton className="h-8 w-1/3" />
            <Skeleton className="h-8 w-20" />
          </div>
        </div>
      ))}
    </div>
  );
}
