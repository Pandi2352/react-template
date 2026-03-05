import { RouterProvider } from 'react-router-dom';
import { router } from '@/routes';
import { UIProvider } from '@/contexts';
import { SplashScreen } from '@/components/common/SplashScreen';
import { ErrorBoundary } from '@/components/common';

export function App() {
  return (
    <ErrorBoundary>
      <UIProvider>
        <SplashScreen>
          <RouterProvider router={router} />
        </SplashScreen>
      </UIProvider>
    </ErrorBoundary>
  );
}
