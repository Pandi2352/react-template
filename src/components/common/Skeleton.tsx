import { cn } from '@/utils';

/* ── Base Skeleton Pulse ── */

interface SkeletonProps {
  className?: string;
  /** Shape variant */
  variant?: 'rectangle' | 'circle' | 'text';
  /** Width (CSS value). Ignored for circle. */
  width?: string | number;
  /** Height (CSS value). For circle, also sets width. */
  height?: string | number;
}

export function Skeleton({
  className,
  variant = 'rectangle',
  width,
  height,
}: SkeletonProps) {
  const style: React.CSSProperties = {};
  if (variant === 'circle') {
    const size = height ?? width ?? 40;
    style.width = size;
    style.height = size;
  } else {
    if (width) style.width = width;
    if (height) style.height = height;
  }

  return (
    <div
      className={cn(
        'animate-pulse bg-gray-200',
        variant === 'circle' && 'rounded-full',
        variant === 'text' && 'h-4 rounded',
        variant === 'rectangle' && 'rounded-lg',
        className,
      )}
      style={style}
    />
  );
}

/* ── Preset: Card Skeleton ── */

interface CardSkeletonProps {
  /** Number of cards */
  count?: number;
  className?: string;
}

export function CardSkeleton({ count = 4, className }: CardSkeletonProps) {
  return (
    <div className={cn('grid gap-6 sm:grid-cols-2 lg:grid-cols-4', className)}>
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1 space-y-3">
              <Skeleton variant="text" width="60%" />
              <Skeleton variant="rectangle" width="45%" height={32} />
            </div>
            <Skeleton variant="rectangle" width={48} height={48} />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Preset: Table Skeleton ── */

interface TableSkeletonProps {
  /** Number of rows */
  rows?: number;
  /** Number of columns */
  columns?: number;
  /** Show toolbar (search + buttons) above table */
  showToolbar?: boolean;
  className?: string;
}

export function TableSkeleton({
  rows = 8,
  columns = 6,
  showToolbar = true,
  className,
}: TableSkeletonProps) {
  // Vary cell widths per column for realistic look
  const colWidths = ['55%', '70%', '40%', '60%', '50%', '45%', '65%', '35%'];

  return (
    <div className={cn('space-y-4', className)}>
      {/* Toolbar */}
      {showToolbar && (
        <div className="flex items-center justify-between gap-4">
          <Skeleton variant="rectangle" width={260} height={38} />
          <div className="flex gap-2">
            <Skeleton variant="rectangle" width={100} height={38} />
            <Skeleton variant="rectangle" width={100} height={38} />
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <table className="w-full">
          {/* Header */}
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              {Array.from({ length: columns }, (_, c) => (
                <th key={c} className="px-4 py-3 text-left">
                  <Skeleton variant="text" width={colWidths[c % colWidths.length]} className="h-3" />
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {Array.from({ length: rows }, (_, r) => (
              <tr key={r} className="border-b border-gray-100 last:border-b-0">
                {Array.from({ length: columns }, (_, c) => (
                  <td key={c} className="px-4 py-3">
                    {/* First column: avatar + text combo */}
                    {c === 0 ? (
                      <div className="flex items-center gap-3">
                        <Skeleton variant="circle" height={32} />
                        <Skeleton variant="text" width="65%" />
                      </div>
                    ) : (
                      <Skeleton
                        variant="text"
                        width={colWidths[(r + c) % colWidths.length]}
                      />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Footer / Pagination */}
        <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 px-4 py-3">
          <Skeleton variant="text" width={140} className="h-3" />
          <div className="flex gap-1.5">
            {Array.from({ length: 5 }, (_, i) => (
              <Skeleton key={i} variant="rectangle" width={32} height={32} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Preset: Text Block Skeleton ── */

interface TextSkeletonProps {
  /** Number of text lines */
  lines?: number;
  className?: string;
}

export function TextSkeleton({ lines = 4, className }: TextSkeletonProps) {
  return (
    <div className={cn('space-y-3', className)}>
      {Array.from({ length: lines }, (_, i) => (
        <Skeleton
          key={i}
          variant="text"
          // Last line is shorter for a natural look
          width={i === lines - 1 ? '60%' : '100%'}
        />
      ))}
    </div>
  );
}

/* ── Preset: Profile / Detail Skeleton ── */

interface ProfileSkeletonProps {
  className?: string;
}

export function ProfileSkeleton({ className }: ProfileSkeletonProps) {
  return (
    <div className={cn('flex gap-4', className)}>
      <Skeleton variant="circle" height={56} />
      <div className="flex-1 space-y-2.5 pt-1">
        <Skeleton variant="text" width="35%" className="h-5" />
        <Skeleton variant="text" width="55%" />
        <Skeleton variant="text" width="25%" />
      </div>
    </div>
  );
}

/* ── Preset: Form Skeleton ── */

interface FormSkeletonProps {
  /** Number of form fields */
  fields?: number;
  className?: string;
}

export function FormSkeleton({ fields = 4, className }: FormSkeletonProps) {
  return (
    <div className={cn('space-y-5', className)}>
      {Array.from({ length: fields }, (_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton variant="text" width={90} className="h-3" />
          <Skeleton variant="rectangle" height={40} className="w-full" />
        </div>
      ))}
      <Skeleton variant="rectangle" width={120} height={40} className="mt-2" />
    </div>
  );
}

/* ── Preset: Page Skeleton (header + cards + table) ── */

interface PageSkeletonProps {
  className?: string;
}

export function PageSkeleton({ className }: PageSkeletonProps) {
  return (
    <div className={cn('space-y-6', className)}>
      {/* Page header */}
      <div className="space-y-2">
        <Skeleton variant="text" width={200} className="h-7" />
        <Skeleton variant="text" width={320} />
      </div>

      {/* Stat cards */}
      <CardSkeleton count={4} />

      {/* Table */}
      <TableSkeleton rows={6} columns={5} />
    </div>
  );
}
