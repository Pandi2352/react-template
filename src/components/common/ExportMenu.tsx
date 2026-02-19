import { useEffect, useRef, useState } from "react";
import { Download, FileSpreadsheet, FileText } from "lucide-react";
import { cn } from "@/utils";
import {
  exportToCSV,
  exportToExcel,
  type ExportColumn,
} from "@/utils/export-table";

interface ExportMenuProps<T> {
  data: T[];
  columns?: ExportColumn<T>[];
  filename?: string;
  className?: string;
}

export function ExportMenu<T>({
  data,
  columns,
  filename = "export",
  className,
}: ExportMenuProps<T>) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const handleCSV = () => {
    exportToCSV(data, columns, filename);
    setOpen(false);
  };

  const handleExcel = () => {
    exportToExcel(data, columns, filename);
    setOpen(false);
  };

  return (
    <div className={cn("relative", className)} ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "inline-flex h-10 items-center gap-2 rounded-lg border border-slate-300 px-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50",
          open && "border-blue-400 text-blue-600",
        )}
      >
        <Download className="h-4 w-4" />
        Export
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-1 w-48 rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
          <button
            type="button"
            onClick={handleCSV}
            className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm text-slate-700 transition-colors hover:bg-slate-50"
          >
            <FileText className="h-4 w-4 text-green-600" />
            Export as CSV
          </button>
          <button
            type="button"
            onClick={handleExcel}
            className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm text-slate-700 transition-colors hover:bg-slate-50"
          >
            <FileSpreadsheet className="h-4 w-4 text-emerald-600" />
            Export as Excel
          </button>
        </div>
      )}
    </div>
  );
}
