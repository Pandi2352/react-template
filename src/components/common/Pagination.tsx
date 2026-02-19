import { useMemo } from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { cn } from "@/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  className?: string;
}

function buildRange(start: number, end: number) {
  const arr: number[] = [];
  for (let i = start; i <= end; i++) arr.push(i);
  return arr;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  className,
}: PaginationProps) {
  const pages = useMemo(() => {
    if (totalPages <= 0) return [];

    const totalSlots = siblingCount * 2 + 5; // siblings + first + last + 2 dots + current
    if (totalPages <= totalSlots) return buildRange(1, totalPages);

    const leftSibling = Math.max(currentPage - siblingCount, 1);
    const rightSibling = Math.min(currentPage + siblingCount, totalPages);

    const showLeftDots = leftSibling > 2;
    const showRightDots = rightSibling < totalPages - 1;

    if (!showLeftDots && showRightDots) {
      const leftCount = siblingCount * 2 + 3;
      return [...buildRange(1, leftCount), -1, totalPages];
    }

    if (showLeftDots && !showRightDots) {
      const rightCount = siblingCount * 2 + 3;
      return [1, -2, ...buildRange(totalPages - rightCount + 1, totalPages)];
    }

    return [1, -2, ...buildRange(leftSibling, rightSibling), -1, totalPages];
  }, [currentPage, totalPages, siblingCount]);

  if (totalPages <= 1) return null;

  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;

  const navBtn =
    "inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 disabled:pointer-events-none disabled:opacity-40";

  return (
    <nav
      aria-label="Pagination"
      className={cn("inline-flex items-center gap-1", className)}
    >
      {/* First */}
      <button
        type="button"
        disabled={isFirst}
        onClick={() => onPageChange(1)}
        className={navBtn}
        title="First page"
      >
        <ChevronsLeft className="h-4 w-4" />
      </button>

      {/* Previous */}
      <button
        type="button"
        disabled={isFirst}
        onClick={() => onPageChange(currentPage - 1)}
        className={navBtn}
        title="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {/* Page numbers */}
      {pages.map((page) => {
        if (page < 0) {
          return (
            <span
              key={page}
              className="inline-flex h-8 w-8 items-center justify-center text-xs text-slate-400"
            >
              ...
            </span>
          );
        }
        const isActive = page === currentPage;
        return (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            className={cn(
              "inline-flex h-8 min-w-8 items-center justify-center rounded-md px-1.5 text-xs font-medium transition-colors",
              isActive
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
            )}
          >
            {page}
          </button>
        );
      })}

      {/* Next */}
      <button
        type="button"
        disabled={isLast}
        onClick={() => onPageChange(currentPage + 1)}
        className={navBtn}
        title="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </button>

      {/* Last */}
      <button
        type="button"
        disabled={isLast}
        onClick={() => onPageChange(totalPages)}
        className={navBtn}
        title="Last page"
      >
        <ChevronsRight className="h-4 w-4" />
      </button>
    </nav>
  );
}
