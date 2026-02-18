export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  SETTINGS: '/settings',
} as const;

export const APP_CONSTANTS = {
  STORAGE_KEYS: {
    AUTH_TOKEN: 'auth_token',
    REFRESH_TOKEN: 'refresh_token',
    AUTH_USER: 'auth_user',
    THEME: 'theme',
    SIDEBAR_COLLAPSED: 'sidebar_collapsed',
  },
} as const;
