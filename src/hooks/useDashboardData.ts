import { useEffect, useState } from 'react';

export interface DashboardData {
  isLoading: boolean;
  error: string;
}

/**
 * Placeholder hook for loading dashboard data.
 * Replace with your own data fetching logic.
 */
export function useDashboardData(): DashboardData {
  const [isLoading, setIsLoading] = useState(true);
  const [error] = useState('');

  useEffect(() => {
    // TODO: Replace with actual API call
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return { isLoading, error };
}
