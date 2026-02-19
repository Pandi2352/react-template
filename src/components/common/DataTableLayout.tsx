import type { ReactNode } from 'react';
import { cn } from '@/utils';

interface DataTableLayoutProps {
  title: ReactNode;
  summary?: ReactNode;
  action?: ReactNode;
  toolbar?: ReactNode;
  table: ReactNode;
  footerLeft?: ReactNode;
  footerRight?: ReactNode;
  className?: string;
  cardClassName?: string;
}

export function DataTableLayout({
  title,
  summary,
  action,
  toolbar,
  table,
  footerLeft,
  footerRight,
  className,
  cardClassName,
}: DataTableLayoutProps) {
  return (
    <section className={cn('space-y-4', className)}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-4">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">{title}</h1>
          {summary && <div className="flex items-center gap-3 text-sm text-slate-600">{summary}</div>}
        </div>
        {action}
      </div>

      <div className={cn('rounded-xl border border-slate-200 bg-white p-3 shadow-sm', cardClassName)}>
        {toolbar}
        {table}

        {(footerLeft || footerRight) && (
          <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
            <div>{footerLeft}</div>
            <div>{footerRight}</div>
          </div>
        )}
      </div>
    </section>
  );
}
