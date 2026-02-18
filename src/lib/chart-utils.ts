export const CHART_COLORS = {
  primary: '#3b82f6',
  primaryLight: '#93c5fd',
  success: '#22c55e',
  successLight: '#86efac',
  warning: '#eab308',
  warningLight: '#fde047',
  danger: '#ef4444',
  dangerLight: '#fca5a5',
  purple: '#8b5cf6',
  gray: '#6b7280',
  grayLight: '#d1d5db',
} as const;

export const CHART_TOOLTIP_STYLE = {
  contentStyle: {
    backgroundColor: '#fff',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '13px',
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
  },
};

export function formatPercent(value: number): string {
  return `${Math.round(value)}%`;
}

export function truncateLabel(label: string, maxLen = 12): string {
  if (label.length <= maxLen) return label;
  return label.slice(0, maxLen - 1) + '\u2026';
}
