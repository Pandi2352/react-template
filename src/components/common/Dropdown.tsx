import { useEffect, useRef, useState, useCallback, type ReactNode } from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/utils";

/* ── Types ── */

export interface DropdownOption<V extends string = string> {
  value: V;
  label: string;
  icon?: ReactNode;
  description?: string;
  disabled?: boolean;
}

interface DropdownProps<V extends string = string> {
  options: DropdownOption<V>[];
  value: V;
  onChange: (value: V) => void;
  placeholder?: string;
  className?: string;
  triggerClassName?: string;
  menuClassName?: string;
  disabled?: boolean;
  position?: "bottom-left" | "bottom-right";
}

/* ── Component ── */

export function Dropdown<V extends string = string>({
  options,
  value,
  onChange,
  placeholder = "Select...",
  className,
  triggerClassName,
  menuClassName,
  disabled = false,
  position = "bottom-left",
}: DropdownProps<V>) {
  const [open, setOpen] = useState(false);
  const [focusIdx, setFocusIdx] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const selected = options.find((o) => o.value === value);

  /* ── Close on outside click ── */
  useEffect(() => {
    if (!open) return;
    function handle(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [open]);

  /* ── Scroll focused item into view ── */
  useEffect(() => {
    if (!open || focusIdx < 0) return;
    const item = listRef.current?.children[focusIdx] as HTMLElement | undefined;
    item?.scrollIntoView({ block: "nearest" });
  }, [focusIdx, open]);

  /* ── Keyboard handler ── */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (disabled) return;

      const enabledIndices = options
        .map((o, i) => (!o.disabled ? i : -1))
        .filter((i) => i !== -1);

      if (!open) {
        if (
          e.key === "Enter" ||
          e.key === " " ||
          e.key === "ArrowDown" ||
          e.key === "ArrowUp"
        ) {
          e.preventDefault();
          setOpen(true);
          const currentIdx = enabledIndices.indexOf(
            options.findIndex((o) => o.value === value),
          );
          setFocusIdx(
            currentIdx >= 0 ? enabledIndices[currentIdx] : enabledIndices[0],
          );
        }
        return;
      }

      switch (e.key) {
        case "ArrowDown": {
          e.preventDefault();
          const curDown = enabledIndices.indexOf(focusIdx);
          const nextDown =
            curDown < enabledIndices.length - 1
              ? enabledIndices[curDown + 1]
              : enabledIndices[0];
          setFocusIdx(nextDown);
          break;
        }
        case "ArrowUp": {
          e.preventDefault();
          const curUp = enabledIndices.indexOf(focusIdx);
          const nextUp =
            curUp > 0
              ? enabledIndices[curUp - 1]
              : enabledIndices[enabledIndices.length - 1];
          setFocusIdx(nextUp);
          break;
        }
        case "Home": {
          e.preventDefault();
          setFocusIdx(enabledIndices[0]);
          break;
        }
        case "End": {
          e.preventDefault();
          setFocusIdx(enabledIndices[enabledIndices.length - 1]);
          break;
        }
        case "Enter":
        case " ": {
          e.preventDefault();
          if (focusIdx >= 0 && !options[focusIdx]?.disabled) {
            onChange(options[focusIdx].value);
            setOpen(false);
          }
          break;
        }
        case "Escape":
        case "Tab": {
          setOpen(false);
          break;
        }
      }
    },
    [open, focusIdx, options, value, onChange, disabled],
  );

  const toggle = () => {
    if (disabled) return;
    setOpen((v) => {
      if (!v) {
        const idx = options.findIndex((o) => o.value === value);
        setFocusIdx(idx >= 0 ? idx : 0);
      }
      return !v;
    });
  };

  const select = (opt: DropdownOption<V>) => {
    if (opt.disabled) return;
    onChange(opt.value);
    setOpen(false);
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative", className)}
      onKeyDown={handleKeyDown}
    >
      {/* Trigger */}
      <button
        type="button"
        onClick={toggle}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={cn(
          "inline-flex h-10 w-full items-center justify-between gap-2 rounded-lg border bg-white px-3 text-sm outline-none transition-colors",
          open
            ? "border-blue-400 ring-1 ring-blue-100"
            : "border-slate-300 hover:border-slate-400",
          disabled && "cursor-not-allowed opacity-50",
          triggerClassName,
        )}
      >
        <span
          className={cn(
            "truncate",
            selected ? "text-slate-700" : "text-slate-400",
          )}
        >
          {selected ? (
            <span className="inline-flex items-center gap-2">
              {selected.icon}
              {selected.label}
            </span>
          ) : (
            placeholder
          )}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-slate-400 transition-transform",
            open && "rotate-180",
          )}
        />
      </button>

      {/* Menu */}
      {open && (
        <ul
          ref={listRef}
          role="listbox"
          aria-activedescendant={
            focusIdx >= 0 ? `dropdown-opt-${focusIdx}` : undefined
          }
          className={cn(
            "absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-slate-200 bg-white py-1 shadow-lg",
            position === "bottom-right" ? "right-0" : "left-0",
            menuClassName,
          )}
        >
          {options.map((opt, idx) => {
            const isSelected = opt.value === value;
            const isFocused = idx === focusIdx;
            return (
              <li
                key={opt.value}
                id={`dropdown-opt-${idx}`}
                role="option"
                aria-selected={isSelected}
                aria-disabled={opt.disabled}
                onClick={() => select(opt)}
                onMouseEnter={() => !opt.disabled && setFocusIdx(idx)}
                className={cn(
                  "flex cursor-pointer items-center gap-2.5 px-3 py-2 text-sm transition-colors",
                  opt.disabled
                    ? "cursor-not-allowed text-slate-300"
                    : isFocused
                      ? "bg-slate-50 text-slate-900"
                      : "text-slate-700",
                  isSelected && !opt.disabled && "font-medium text-blue-600",
                )}
              >
                {opt.icon && (
                  <span className="shrink-0 text-current">{opt.icon}</span>
                )}
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="truncate">{opt.label}</span>
                  {opt.description && (
                    <span className="truncate text-xs text-slate-400">
                      {opt.description}
                    </span>
                  )}
                </span>
                {isSelected && (
                  <Check className="h-4 w-4 shrink-0 text-blue-500" />
                )}
              </li>
            );
          })}

          {options.length === 0 && (
            <li className="px-3 py-4 text-center text-sm text-slate-400">
              No options
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
