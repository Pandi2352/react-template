import { useSyncExternalStore } from 'react';
import { APP_CONSTANTS } from '@/constants';

const THEME_CHANGE_EVENT = 'app:theme-changed';

let snapshotVersion = 0;

function notify() {
  snapshotVersion += 1;
  window.dispatchEvent(new CustomEvent(THEME_CHANGE_EVENT));
}

function subscribe(callback: () => void) {
  window.addEventListener(THEME_CHANGE_EVENT, callback);
  return () => window.removeEventListener(THEME_CHANGE_EVENT, callback);
}

function getSnapshot() {
  return snapshotVersion;
}

export function getTheme(): string {
  return localStorage.getItem(APP_CONSTANTS.STORAGE_KEYS.THEME) ?? 'light';
}

export function setTheme(theme: string) {
  localStorage.setItem(APP_CONSTANTS.STORAGE_KEYS.THEME, theme);
  notify();
}

/**
 * React hook that re-renders when the theme changes.
 */
export function useTheme(): string {
  useSyncExternalStore(subscribe, getSnapshot);
  return getTheme();
}
