import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

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

// Explicit maps so Tailwind JIT can statically detect all classes
const BASE_COLS = { 1: 'grid-cols-1', 2: 'grid-cols-2', 3: 'grid-cols-3', 4: 'grid-cols-4' } as const;
const SM_COLS   = { 1: 'sm:grid-cols-1', 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-3', 4: 'sm:grid-cols-4' } as const;
const MD_COLS   = { 1: 'md:grid-cols-1', 2: 'md:grid-cols-2', 3: 'md:grid-cols-3', 4: 'md:grid-cols-4' } as const;
const LG_COLS   = { 1: 'lg:grid-cols-1', 2: 'lg:grid-cols-2', 3: 'lg:grid-cols-3', 4: 'lg:grid-cols-4' } as const;
const XL_COLS   = { 1: 'xl:grid-cols-1', 2: 'xl:grid-cols-2', 3: 'xl:grid-cols-3', 4: 'xl:grid-cols-4' } as const;

type ColCount = 1 | 2 | 3 | 4;

export function LoadingGrid({
  count = 8,
  columns = { base: 1, sm: 2, md: 2, lg: 3, xl: 4 }
}: LoadingGridProps) {
  const gridCols = cn(
    BASE_COLS[(columns.base ?? 1) as ColCount],
    columns.sm  && SM_COLS[columns.sm  as ColCount],
    columns.md  && MD_COLS[columns.md  as ColCount],
    columns.lg  && LG_COLS[columns.lg  as ColCount],
    columns.xl  && XL_COLS[columns.xl  as ColCount],
  );

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
