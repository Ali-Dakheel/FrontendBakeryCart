import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = [];
  const showEllipsis = totalPages > 7;

  if (showEllipsis) {
    // Always show first page
    pages.push(1);

    // Show ellipsis or pages near current page
    if (currentPage > 3) {
      pages.push(-1); // -1 represents ellipsis
    }

    // Show pages around current page
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i);
    }

    // Show ellipsis before last page
    if (currentPage < totalPages - 2) {
      pages.push(-2); // -2 represents ellipsis
    }

    // Always show last page
    pages.push(totalPages);
  } else {
    // Show all pages if 7 or fewer
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  }

  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {pages.map((page, index) => {
        if (page < 0) {
          return (
            <span key={`ellipsis-${index}`} className="px-2 text-navy/40">
              ...
            </span>
          );
        }

        return (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "outline"}
            size="icon"
            onClick={() => onPageChange(page)}
            className={currentPage === page ? "bg-navy hover:bg-navy-light" : ""}
          >
            {page}
          </Button>
        );
      })}

      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
