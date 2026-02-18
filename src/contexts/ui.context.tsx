import { useState, useCallback, type ReactNode } from 'react';
import { APP_CONSTANTS } from '@/constants';
import { UIContext, type Toast } from './ui';

let toastId = 0;

function loadSidebarCollapsed(): boolean {
  return localStorage.getItem(APP_CONSTANTS.STORAGE_KEYS.SIDEBAR_COLLAPSED) === 'true';
}

export function UIProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(loadSidebarCollapsed);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = String(++toastId);
    const newToast: Toast = { ...toast, id };
    setToasts((prev) => [...prev, newToast]);

    const duration = toast.duration ?? 4000;
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  const closeSidebar = useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

  const toggleSidebarCollapsed = useCallback(() => {
    setIsSidebarCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem(APP_CONSTANTS.STORAGE_KEYS.SIDEBAR_COLLAPSED, String(next));
      return next;
    });
  }, []);

  return (
    <UIContext.Provider
      value={{
        toasts,
        addToast,
        removeToast,
        isSidebarOpen,
        toggleSidebar,
        closeSidebar,
        isSidebarCollapsed,
        toggleSidebarCollapsed,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}
