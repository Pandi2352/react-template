import { createBrowserRouter } from 'react-router-dom';
import { RootLayout, AuthenticatedLayout } from '@/components/layout';
import { ProtectedRoute, GuestRoute } from '@/components/common';
import { ROUTES } from '@/constants';
import { Home, Login, Register, Dashboard, Settings, NotFound } from '@/pages';

export const router = createBrowserRouter([
  // Public layout (Header + Footer)
  {
    element: <RootLayout />,
    children: [
      { path: ROUTES.HOME, element: <Home /> },

      // Guest-only routes (redirect to dashboard if already logged in)
      {
        element: <GuestRoute />,
        children: [
          { path: ROUTES.LOGIN, element: <Login /> },
          { path: ROUTES.REGISTER, element: <Register /> },
        ],
      },

      // 404
      { path: '*', element: <NotFound /> },
    ],
  },

  // Authenticated layout (Sidebar + Navbar)
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AuthenticatedLayout />,
        children: [
          { path: ROUTES.DASHBOARD, element: <Dashboard /> },
          { path: ROUTES.SETTINGS, element: <Settings /> },
        ],
      },
    ],
  },
]);
