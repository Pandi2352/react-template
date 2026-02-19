import { useEffect, useMemo, useRef, useState } from 'react';
import { Check, Columns3, SlidersHorizontal } from 'lucide-react';
import { cn } from '@/utils';

export type TableDensity = 'compact' | 'comfortable';

export interface TableSettingsColumn {
  key: string;
  label: string;
  required?: boolean;
}

interface TableSettingsMenuProps {
  columns: TableSettingsColumn[];
  visibleColumns: string[];
  onVisibleColumnsChange: (columns: string[]) => void;
  density: TableDensity;
  onDensityChange: (density: TableDensity) => void;
  buttonLabel?: string;
  buttonClassName?: string;
  compactButton?: boolean;
}

export function TableSettingsMenu({
  columns,
  visibleColumns,
  onVisibleColumnsChange,
  density,
  onDensityChange,
  buttonLabel = 'Table Settings',
  buttonClassName,
  compactButton = false,
}: TableSettingsMenuProps) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const requiredColumns = useMemo(
    () => columns.filter((column) => column.required).map((column) => column.key),
    [columns],
  );

  useEffect(() => {
    if (!open) return;
    const onMouseDown = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onMouseDown);
    return () => document.removeEventListener('mousedown', onMouseDown);
  }, [open]);

  const toggleColumn = (columnKey: string) => {
    if (requiredColumns.includes(columnKey)) return;

    const hasColumn = visibleColumns.includes(columnKey);
    const next = hasColumn
      ? visibleColumns.filter((key) => key !== columnKey)
      : [...visibleColumns, columnKey];

    if (next.length === 0) return;
    onVisibleColumnsChange(next);
  };

  const resetSettings = () => {
    onVisibleColumnsChange(columns.map((column) => column.key));
    onDensityChange('comfortable');
  };

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          'inline-flex h-10 items-center gap-2 rounded-lg border border-slate-300 px-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50',
          compactButton && 'h-8 border-transparent px-0 text-xs font-medium hover:bg-transparent hover:text-slate-900',
          buttonClassName,
        )}
      >
        {compactButton ? <SlidersHorizontal className="h-3.5 w-3.5" /> : <Columns3 className="h-4 w-4" />}
        {buttonLabel}
      </button>

      {open && (
        <div className="absolute right-0 z-40 mt-2 w-72 rounded-lg border border-slate-200 bg-white p-3 shadow-xl">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Density</p>
          <div className="mb-4 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => onDensityChange('comfortable')}
              className={cn(
                'rounded-md border px-3 py-1.5 text-sm transition-colors',
                density === 'comfortable'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50',
              )}
            >
              Comfortable
            </button>
            <button
              type="button"
              onClick={() => onDensityChange('compact')}
              className={cn(
                'rounded-md border px-3 py-1.5 text-sm transition-colors',
                density === 'compact'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50',
              )}
            >
              Compact
            </button>
          </div>

          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Columns</p>
          <div className="max-h-56 space-y-1 overflow-y-auto pr-1">
            {columns.map((column) => {
              const selected = visibleColumns.includes(column.key);
              return (
                <button
                  key={column.key}
                  type="button"
                  onClick={() => toggleColumn(column.key)}
                  className={cn(
                    'flex w-full items-center justify-between rounded-md px-2 py-1.5 text-sm text-left transition-colors',
                    column.required
                      ? 'cursor-not-allowed text-slate-400'
                      : 'text-slate-700 hover:bg-slate-50',
                  )}
                >
                  <span>{column.label}</span>
                  {selected && <Check className="h-4 w-4 text-blue-600" />}
                </button>
              );
            })}
          </div>

          <div className="mt-3 border-t border-slate-100 pt-3">
            <button
              type="button"
              onClick={resetSettings}
              className="w-full rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-700 transition-colors hover:bg-slate-50"
            >
              Reset to default
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
