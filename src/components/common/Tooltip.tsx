import type { ReactNode } from 'react';
import { cn } from '@/utils';

type TooltipSide = 'top' | 'bottom' | 'left' | 'right';
type TooltipVariant = 'default' | 'primary';

interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  side?: TooltipSide;
  variant?: TooltipVariant;
  className?: string;
}

const sideClasses: Record<TooltipSide, string> = {
  top: 'bottom-[calc(100%+0.5rem)] left-1/2 -translate-x-1/2',
  bottom: 'top-[calc(100%+0.5rem)] left-1/2 -translate-x-1/2',
  left: 'right-[calc(100%+0.5rem)] top-1/2 -translate-y-1/2',
  right: 'left-[calc(100%+0.5rem)] top-1/2 -translate-y-1/2',
};

const arrowClasses: Record<TooltipSide, string> = {
  top: 'top-full left-1/2 -translate-x-1/2 border-t-[current] border-x-transparent border-b-transparent',
  bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-[current] border-x-transparent border-t-transparent',
  left: 'left-full top-1/2 -translate-y-1/2 border-l-[current] border-y-transparent border-r-transparent',
  right: 'right-full top-1/2 -translate-y-1/2 border-r-[current] border-y-transparent border-l-transparent',
};

const variantStyles: Record<TooltipVariant, { bubble: string; arrow: string }> = {
  default: {
    bubble: 'bg-gray-900 text-white shadow-md',
    arrow: 'border-gray-900',
  },
  primary: {
    bubble:
      'bg-primary text-white shadow-lg shadow-primary/25 font-medium tracking-wide',
    arrow: 'border-primary',
  },
};

export function Tooltip({
  content,
  children,
  side = 'top',
  variant = 'default',
  className,
}: TooltipProps) {
  const styles = variantStyles[variant];

  return (
    <span className={cn('group relative inline-flex', className)}>
      {children}
      <span
        className={cn(
          'pointer-events-none absolute z-[95] hidden whitespace-nowrap rounded-md px-2.5 py-1 text-xs group-hover:block group-focus-within:block',
          styles.bubble,
          sideClasses[side],
        )}
      >
        {content}
        {/* Arrow */}
        <span
          className={cn(
            'absolute h-0 w-0 border-[4px]',
            styles.arrow,
            arrowClasses[side],
          )}
        />
      </span>
    </span>
  );
}
