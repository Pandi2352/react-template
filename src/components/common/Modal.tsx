import { useEffect, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '@/utils';

interface ModalProps {
  isOpen: boolean;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  onClose: () => void;
  closeOnOverlayClick?: boolean;
  maxWidthClassName?: string;
}

export function Modal({
  isOpen,
  title,
  description,
  children,
  footer,
  onClose,
  closeOnOverlayClick = true,
  maxWidthClassName = 'max-w-2xl',
}: ModalProps) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
      <button
        aria-label="Close modal overlay"
        className="absolute inset-0 bg-black/40"
        onClick={closeOnOverlayClick ? onClose : undefined}
      />

      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          'relative z-[91] w-full rounded-xl border border-gray-200 bg-white shadow-2xl',
          maxWidthClassName,
        )}
      >
        <div className="flex items-start justify-between border-b border-gray-200 px-5 py-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900">{title}</h2>
            {description && <p className="mt-1 text-sm text-gray-600">{description}</p>}
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-5 py-4">{children}</div>

        {footer && <div className="border-t border-gray-200 px-5 py-4">{footer}</div>}
      </div>
    </div>,
    document.body,
  );
}
