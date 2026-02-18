import axios from 'axios';
import { env } from '@/config/env';
import { APP_CONSTANTS, ROUTES } from '@/constants';

const apiClient = axios.create({
  baseURL: env.API_BASE_URL,
  timeout: 120_000,
  headers: {
    'Content-Type': 'application/json',
  },
});

let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;

async function refreshAccessToken() {
  const refreshToken = localStorage.getItem(APP_CONSTANTS.STORAGE_KEYS.REFRESH_TOKEN);
  if (!refreshToken) {
    return null;
  }

  if (isRefreshing && refreshPromise) {
    return refreshPromise;
  }

  isRefreshing = true;
  refreshPromise = axios
    .post(`${env.API_BASE_URL}/auth/refresh`, { refreshToken })
    .then((response) => {
      const session = response.data?.data;
      if (!session?.accessToken) {
        return null;
      }

      localStorage.setItem(APP_CONSTANTS.STORAGE_KEYS.AUTH_TOKEN, session.accessToken);
      localStorage.setItem(APP_CONSTANTS.STORAGE_KEYS.REFRESH_TOKEN, session.refreshToken);
      localStorage.setItem(APP_CONSTANTS.STORAGE_KEYS.AUTH_USER, JSON.stringify(session.user));
      return session.accessToken as string;
    })
    .catch(() => {
      localStorage.removeItem(APP_CONSTANTS.STORAGE_KEYS.AUTH_TOKEN);
      localStorage.removeItem(APP_CONSTANTS.STORAGE_KEYS.REFRESH_TOKEN);
      localStorage.removeItem(APP_CONSTANTS.STORAGE_KEYS.AUTH_USER);
      return null;
    })
    .finally(() => {
      isRefreshing = false;
      refreshPromise = null;
    });

  return refreshPromise;
}

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(APP_CONSTANTS.STORAGE_KEYS.AUTH_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !(originalRequest as { _retry?: boolean })._retry &&
      !String(originalRequest.url || '').includes('/auth/')
    ) {
      (originalRequest as { _retry?: boolean })._retry = true;
      const newToken = await refreshAccessToken();

      if (newToken) {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(originalRequest);
      }

      window.location.href = ROUTES.LOGIN;
    }

    return Promise.reject(error);
  },
);

export default apiClient;
