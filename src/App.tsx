import { RouterProvider } from 'react-router-dom';
import { router } from '@/routes';
import { AuthProvider, UIProvider } from '@/contexts';
import { SplashScreen } from '@/components/common/SplashScreen';

export function App() {
  return (
    <AuthProvider>
      <UIProvider>
        <SplashScreen>
          <RouterProvider router={router} />
        </SplashScreen>
      </UIProvider>
    </AuthProvider>
  );
}
