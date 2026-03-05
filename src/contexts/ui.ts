import { createContext } from 'react';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

export interface UIContextValue {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
  isSidebarCollapsed: boolean;
  toggleSidebarCollapsed: () => void;
  isCommandOpen: boolean;
  setCommandOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isFocusMode: boolean;
  setFocusMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UIContext = createContext<UIContextValue | null>(null);
