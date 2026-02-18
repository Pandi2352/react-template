import { X, CheckCircle2, AlertCircle, Info, AlertTriangle } from 'lucide-react';

export type ToastVariant = 'success' | 'error' | 'warning' | 'info';

export interface ToastItem {
  id: string;
  title: string;
  message?: string;
  variant: ToastVariant;
}

interface ToastViewportProps {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
}

function getToastStyles(variant: ToastVariant) {
  if (variant === 'success') {
    return {
      container: 'border-green-200 bg-green-50',
      title: 'text-green-800',
      message: 'text-green-700',
      icon: <CheckCircle2 className="h-4 w-4 text-green-600" />,
    };
  }

  if (variant === 'error') {
    return {
      container: 'border-red-200 bg-red-50',
      title: 'text-red-800',
      message: 'text-red-700',
      icon: <AlertCircle className="h-4 w-4 text-red-600" />,
    };
  }

  if (variant === 'warning') {
    return {
      container: 'border-amber-200 bg-amber-50',
      title: 'text-amber-800',
      message: 'text-amber-700',
      icon: <AlertTriangle className="h-4 w-4 text-amber-600" />,
    };
  }

  return {
    container: 'border-blue-200 bg-blue-50',
    title: 'text-blue-800',
    message: 'text-blue-700',
    icon: <Info className="h-4 w-4 text-blue-600" />,
  };
}

export function ToastViewport({ toasts, onDismiss }: ToastViewportProps) {
  if (toasts.length === 0) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed right-4 top-4 z-[100] flex w-full max-w-sm flex-col gap-2">
      {toasts.map((toast) => {
        const styles = getToastStyles(toast.variant);
        return (
          <div
            key={toast.id}
            className={`pointer-events-auto rounded-lg border px-3 py-2 shadow-lg ${styles.container}`}
          >
            <div className="flex items-start gap-2">
              <div className="pt-0.5">{styles.icon}</div>
              <div className="min-w-0 flex-1">
                <p className={`text-sm font-semibold ${styles.title}`}>{toast.title}</p>
                {toast.message && <p className={`text-xs ${styles.message}`}>{toast.message}</p>}
              </div>
              <button
                onClick={() => onDismiss(toast.id)}
                className="rounded p-0.5 text-gray-500 hover:bg-white/80 hover:text-gray-700"
                aria-label="Dismiss toast"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
