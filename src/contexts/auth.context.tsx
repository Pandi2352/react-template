import { useState, useCallback, type ReactNode } from 'react';
import { APP_CONSTANTS } from '@/constants';
import type { User } from '@/types';
import { AuthContext } from './auth';

function loadStoredUser(): User | null {
  const storedUser = localStorage.getItem(APP_CONSTANTS.STORAGE_KEYS.AUTH_USER);
  const token = localStorage.getItem(APP_CONSTANTS.STORAGE_KEYS.AUTH_TOKEN);

  if (storedUser && token) {
    try {
      return JSON.parse(storedUser) as User;
    } catch {
      localStorage.removeItem(APP_CONSTANTS.STORAGE_KEYS.AUTH_USER);
      localStorage.removeItem(APP_CONSTANTS.STORAGE_KEYS.AUTH_TOKEN);
      localStorage.removeItem(APP_CONSTANTS.STORAGE_KEYS.REFRESH_TOKEN);
    }
  }

  return null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(loadStoredUser);
  const [isLoading] = useState(false);

  const login = useCallback((token: string, refreshToken: string, userData: User) => {
    localStorage.setItem(APP_CONSTANTS.STORAGE_KEYS.AUTH_TOKEN, token);
    localStorage.setItem(APP_CONSTANTS.STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
    localStorage.setItem(APP_CONSTANTS.STORAGE_KEYS.AUTH_USER, JSON.stringify(userData));
    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(APP_CONSTANTS.STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(APP_CONSTANTS.STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(APP_CONSTANTS.STORAGE_KEYS.AUTH_USER);
    setUser(null);
  }, []);

  const updateUser = useCallback((userData: User) => {
    localStorage.setItem(APP_CONSTANTS.STORAGE_KEYS.AUTH_USER, JSON.stringify(userData));
    setUser(userData);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
