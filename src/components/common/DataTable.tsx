import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  AlignVerticalSpaceAround,
  CaseSensitive,
  Grid3x3,
  MousePointerClick,
  Palette,
  PanelLeftDashed,
  RotateCcw,
  Rows3,
  SlidersHorizontal,
  StretchHorizontal,
  TableProperties,
  Type,
  X,
} from "lucide-react";
import { cn } from "@/utils";
import { Pagination } from "./Pagination";

/* ── Types ── */

export type Density = "compact" | "default" | "comfortable";
export type FontSize = "small" | "default" | "large";
export type HeaderTheme = "light" | "dark" | "colored";
export type TableLayout = "auto" | "fixed";

export interface TableSettings {
  density: Density;
  fontSize: FontSize;
  headerTheme: HeaderTheme;
  tableLayout: TableLayout;
  stripedRows: boolean;
  showRowBorders: boolean;
  showColumnBorders: boolean;
  hoverHighlight: boolean;
  uppercaseHeader: boolean;
  stickyHeader: boolean;
  frozenColumns: boolean;
}

export interface DataTableColumn<T> {
  header: string;
  accessor?: keyof T;
  render?: (row: T, index: number) => ReactNode;
  className?: string;
  headerClassName?: string;
  align?: "left" | "center" | "right";
  frozen?: {
    left: number;
    width: number;
    shadow?: boolean;
  };
}

interface DataTableProps<T> {
  data: T[];
  columns: DataTableColumn<T>[];
  keyExtractor: (row: T) => string | number;
  storageKey?: string;
  emptyMessage?: string;
  totalCount?: number;
  minWidth?: string;
  stickyMaxHeight?: string;
  pageSize?: number;
}

/* ── Config ── */

const defaultTableSettings: TableSettings = {
  density: "default",
  fontSize: "default",
  headerTheme: "light",
  tableLayout: "auto",
  stripedRows: false,
  showRowBorders: true,
  showColumnBorders: false,
  hoverHighlight: true,
  uppercaseHeader: true,
  stickyHeader: false,
  frozenColumns: false,
};

const densityPadding: Record<Density, string> = {
  compact: "px-3 py-1.5",
  default: "px-3 py-3",
  comfortable: "px-4 py-4",
};

const densityHeadPadding: Record<Density, string> = {
  compact: "px-3 py-2",
  default: "px-3 py-3",
  comfortable: "px-4 py-4",
};

const fontSizeClass: Record<FontSize, string> = {
  small: "text-xs",
  default: "text-sm",
  large: "text-base",
};

const headerThemeStyles: Record<
  HeaderTheme,
  { head: string; border: string; frozenBg: string }
> = {
  light: {
    head: "bg-slate-50 text-slate-500",
    border: "border-slate-200",
    frozenBg: "bg-slate-50",
  },
  dark: {
    head: "bg-slate-800 text-slate-200",
    border: "border-slate-700",
    frozenBg: "bg-slate-800",
  },
  colored: {
    head: "bg-blue-600 text-white",
    border: "border-blue-500",
    frozenBg: "bg-blue-600",
  },
};

/* ── localStorage helpers ── */

function loadSettings(key: string): TableSettings {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return { ...defaultTableSettings, ...JSON.parse(raw) };
  } catch {
    /* ignore */
  }
  return defaultTableSettings;
}

function saveSettings(key: string, settings: TableSettings) {
  localStorage.setItem(key, JSON.stringify(settings));
}

/* ── Frozen column helpers ── */

const FROZEN_BASE =
  "sticky z-20 after:pointer-events-none after:absolute after:right-0 after:top-0 after:h-full after:w-px after:bg-slate-200";
const FROZEN_SHADOW =
  "after:w-4 after:bg-gradient-to-r after:from-black/5 after:to-transparent";

/* ── Component ── */

export function DataTable<T>({
  data,
  columns,
  keyExtractor,
  storageKey = "table_settings",
  emptyMessage = "No records found.",
  totalCount,
  minWidth = "min-w-[1120px]",
  stickyMaxHeight = "max-h-[70vh]",
  pageSize = 10,
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [settings, setSettings] = useState<TableSettings>(() =>
    loadSettings(storageKey),
  );
  const [showSettings, setShowSettings] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);

  const updateSettings = useCallback(
    (updater: (prev: TableSettings) => TableSettings) => {
      setSettings((prev) => {
        const next = updater(prev);
        saveSettings(storageKey, next);
        return next;
      });
    },
    [storageKey],
  );

  useEffect(() => {
    if (!showSettings) return;
    function handleClickOutside(e: MouseEvent) {
      if (
        settingsRef.current &&
        !settingsRef.current.contains(e.target as Node)
      ) {
        setShowSettings(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showSettings]);

  const ts = settings;
  const cellPad = densityPadding[ts.density];
  const headPad = densityHeadPadding[ts.density];
  const hTheme = headerThemeStyles[ts.headerTheme];
  const colBorder = ts.showColumnBorders
    ? "border-r border-slate-200 last:border-r-0"
    : "";
  const bodyFontSize = fontSizeClass[ts.fontSize];
  const isCustomized =
    JSON.stringify(ts) !== JSON.stringify(defaultTableSettings);

  const total = totalCount ?? data.length;
  const totalPages = Math.max(1, Math.ceil(data.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);

  const pagedData = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return data.slice(start, start + pageSize);
  }, [data, safePage, pageSize]);

  // Reset to page 1 when data changes (e.g. filters applied)
  useEffect(() => {
    setCurrentPage(1);
  }, [data.length]);

  const hasFrozenCols = useMemo(
    () => columns.some((c) => c.frozen),
    [columns],
  );

  const alignClass = (align?: "left" | "center" | "right") => {
    if (align === "center") return "text-center";
    if (align === "right") return "text-right";
    return "text-left";
  };

  return (
    <>
      <div
        className={cn(
          "overflow-x-auto rounded-lg border border-slate-200",
          ts.stickyHeader && stickyMaxHeight,
        )}
      >
        <table
          className={cn(
            "w-full border-collapse",
            ts.tableLayout === "fixed" ? "table-fixed" : "table-auto",
            bodyFontSize,
            minWidth,
          )}
        >
          <thead
            className={cn(
              "text-xs tracking-wide",
              hTheme.head,
              ts.uppercaseHeader && "uppercase",
              ts.stickyHeader && "sticky top-0 z-30 shadow-sm",
            )}
          >
            <tr>
              {columns.map((col, colIdx) => {
                const isFrozen = ts.frozenColumns && col.frozen;
                return (
                  <th
                    key={colIdx}
                    className={cn(
                      "whitespace-nowrap border-b font-semibold",
                      alignClass(col.align),
                      hTheme.border,
                      headPad,
                      colBorder,
                      isFrozen && FROZEN_BASE,
                      isFrozen && col.frozen!.shadow && FROZEN_SHADOW,
                      isFrozen && hTheme.frozenBg,
                      col.headerClassName,
                    )}
                    style={
                      isFrozen
                        ? {
                            left: col.frozen!.left,
                            width: col.frozen!.width,
                            minWidth: col.frozen!.width,
                          }
                        : undefined
                    }
                  >
                    {col.header}
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {pagedData.map((row, rowIdx) => (
              <tr
                key={keyExtractor(row)}
                className={cn(
                  "align-top transition-colors",
                  ts.showRowBorders && "border-b border-slate-100",
                  ts.stripedRows && rowIdx % 2 === 1 && "bg-slate-50/50",
                  ts.hoverHighlight && "hover:bg-slate-50/60",
                )}
              >
                {columns.map((col, colIdx) => {
                  const isFrozen = ts.frozenColumns && col.frozen;
                  const content = col.render
                    ? col.render(row, rowIdx)
                    : col.accessor
                      ? String(row[col.accessor] ?? "")
                      : null;
                  return (
                    <td
                      key={colIdx}
                      className={cn(
                        "whitespace-nowrap",
                        cellPad,
                        colBorder,
                        isFrozen && FROZEN_BASE,
                        isFrozen && col.frozen!.shadow && FROZEN_SHADOW,
                        isFrozen &&
                          (ts.stripedRows && rowIdx % 2 === 1
                            ? "bg-slate-50"
                            : "bg-white"),
                        col.className,
                      )}
                      style={
                        isFrozen
                          ? {
                              left: col.frozen!.left,
                              width: col.frozen!.width,
                              minWidth: col.frozen!.width,
                            }
                          : undefined
                      }
                    >
                      {content}
                    </td>
                  );
                })}
              </tr>
            ))}

            {pagedData.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-3 py-10 text-center text-sm text-slate-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
        <span>
          Showing {Math.min((safePage - 1) * pageSize + 1, data.length)}
          {" - "}
          {Math.min(safePage * pageSize, data.length)} of {total}
        </span>

        <div className="flex items-center gap-4">
          <Pagination
            currentPage={safePage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />

          <div className="relative" ref={settingsRef}>
          <button
            type="button"
            onClick={() => setShowSettings((v) => !v)}
            className={cn(
              "inline-flex items-center gap-1 transition-colors",
              showSettings
                ? "text-blue-600"
                : "text-slate-600 hover:text-slate-900",
            )}
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Table Settings
            {isCustomized && (
              <span className="ml-1 h-1.5 w-1.5 rounded-full bg-blue-500" />
            )}
          </button>

          {showSettings && (
            <div className="absolute bottom-8 right-0 z-50 w-80 rounded-xl border border-slate-200 bg-white shadow-lg">
              <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                <h4 className="text-sm font-semibold text-slate-800">
                  Table Settings
                </h4>
                <div className="flex items-center gap-1">
                  {isCustomized && (
                    <button
                      type="button"
                      onClick={() =>
                        updateSettings(() => defaultTableSettings)
                      }
                      className="rounded-md p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                      title="Reset to defaults"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setShowSettings(false)}
                    className="rounded-md p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              <div className="max-h-[400px] overflow-y-auto p-4">
                {/* Row Density */}
                <div className="mb-4">
                  <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-slate-500">
                    <AlignVerticalSpaceAround className="h-3 w-3" />
                    Row Density
                  </label>
                  <div className="grid grid-cols-3 gap-1 rounded-lg bg-slate-100 p-0.5">
                    {(["compact", "default", "comfortable"] as Density[]).map(
                      (d) => (
                        <button
                          key={d}
                          type="button"
                          onClick={() =>
                            updateSettings((s) => ({ ...s, density: d }))
                          }
                          className={cn(
                            "rounded-md px-2 py-1.5 text-xs font-medium capitalize transition-all",
                            ts.density === d
                              ? "bg-white text-slate-800 shadow-sm"
                              : "text-slate-500 hover:text-slate-700",
                          )}
                        >
                          {d}
                        </button>
                      ),
                    )}
                  </div>
                </div>

                {/* Font Size */}
                <div className="mb-4">
                  <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-slate-500">
                    <Type className="h-3 w-3" />
                    Font Size
                  </label>
                  <div className="grid grid-cols-3 gap-1 rounded-lg bg-slate-100 p-0.5">
                    {(["small", "default", "large"] as FontSize[]).map((f) => (
                      <button
                        key={f}
                        type="button"
                        onClick={() =>
                          updateSettings((s) => ({ ...s, fontSize: f }))
                        }
                        className={cn(
                          "rounded-md px-2 py-1.5 text-xs font-medium capitalize transition-all",
                          ts.fontSize === f
                            ? "bg-white text-slate-800 shadow-sm"
                            : "text-slate-500 hover:text-slate-700",
                        )}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Header Theme */}
                <div className="mb-4">
                  <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-slate-500">
                    <Palette className="h-3 w-3" />
                    Header Theme
                  </label>
                  <div className="grid grid-cols-3 gap-1 rounded-lg bg-slate-100 p-0.5">
                    {(["light", "dark", "colored"] as HeaderTheme[]).map(
                      (h) => (
                        <button
                          key={h}
                          type="button"
                          onClick={() =>
                            updateSettings((s) => ({
                              ...s,
                              headerTheme: h,
                            }))
                          }
                          className={cn(
                            "rounded-md px-2 py-1.5 text-xs font-medium capitalize transition-all",
                            ts.headerTheme === h
                              ? "bg-white text-slate-800 shadow-sm"
                              : "text-slate-500 hover:text-slate-700",
                          )}
                        >
                          {h}
                        </button>
                      ),
                    )}
                  </div>
                </div>

                {/* Table Layout */}
                <div className="mb-4">
                  <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-slate-500">
                    <TableProperties className="h-3 w-3" />
                    Table Layout
                  </label>
                  <div className="grid grid-cols-2 gap-1 rounded-lg bg-slate-100 p-0.5">
                    {(["auto", "fixed"] as TableLayout[]).map((l) => (
                      <button
                        key={l}
                        type="button"
                        onClick={() =>
                          updateSettings((s) => ({
                            ...s,
                            tableLayout: l,
                          }))
                        }
                        className={cn(
                          "rounded-md px-2 py-1.5 text-xs font-medium transition-all",
                          ts.tableLayout === l
                            ? "bg-white text-slate-800 shadow-sm"
                            : "text-slate-500 hover:text-slate-700",
                        )}
                      >
                        {l === "auto" ? "Auto-fit" : "Fixed Width"}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-3 border-t border-slate-100" />

                {/* Toggle options */}
                <div className="space-y-1">
                  {(
                    [
                      {
                        key: "stripedRows",
                        label: "Striped Rows",
                        icon: Rows3,
                      },
                      {
                        key: "showRowBorders",
                        label: "Row Borders",
                        icon: StretchHorizontal,
                      },
                      {
                        key: "showColumnBorders",
                        label: "Column Borders",
                        icon: Grid3x3,
                      },
                      {
                        key: "hoverHighlight",
                        label: "Hover Highlight",
                        icon: MousePointerClick,
                      },
                      {
                        key: "uppercaseHeader",
                        label: "Uppercase Header",
                        icon: CaseSensitive,
                      },
                      {
                        key: "stickyHeader",
                        label: "Sticky Header",
                        icon: Rows3,
                      },
                      ...(hasFrozenCols
                        ? ([
                            {
                              key: "frozenColumns",
                              label: "Freeze Columns",
                              icon: PanelLeftDashed,
                            },
                          ] as const)
                        : []),
                    ] as const
                  ).map(({ key, label, icon: Icon }) => (
                    <label
                      key={key}
                      className="flex cursor-pointer items-center justify-between rounded-lg px-2 py-2 transition-colors hover:bg-slate-50"
                    >
                      <span className="flex items-center gap-2 text-xs font-medium text-slate-600">
                        <Icon className="h-3.5 w-3.5 text-slate-400" />
                        {label}
                      </span>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={ts[key as keyof TableSettings] as boolean}
                        onClick={() =>
                          updateSettings((s) => ({
                            ...s,
                            [key]: !s[key as keyof TableSettings],
                          }))
                        }
                        className={cn(
                          "relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors",
                          ts[key as keyof TableSettings]
                            ? "bg-blue-500"
                            : "bg-slate-300",
                        )}
                      >
                        <span
                          className={cn(
                            "inline-block h-3.5 w-3.5 rounded-full bg-white shadow-sm transition-transform",
                            ts[key as keyof TableSettings]
                              ? "translate-x-[18px]"
                              : "translate-x-[3px]",
                          )}
                        />
                      </button>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        </div>
      </div>
    </>
  );
}
