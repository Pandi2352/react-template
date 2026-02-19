import { RouterProvider } from 'react-router-dom';
import { router } from '@/routes';
import { AuthProvider, UIProvider } from '@/contexts';
import { SplashScreen } from '@/components/common/SplashScreen';
import { ErrorBoundary } from '@/components/common';

export function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <UIProvider>
          <SplashScreen>
            <RouterProvider router={router} />
          </SplashScreen>
        </UIProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}
