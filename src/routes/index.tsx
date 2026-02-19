import { createBrowserRouter } from 'react-router-dom';
import { RootLayout, AuthenticatedLayout } from '@/components/layout';
import { ProtectedRoute, GuestRoute } from '@/components/common';
import { ROUTES } from '@/constants';
import { Home, Login, Register, Dashboard, AllDeals, Settings, NotFound, DummyPage } from '@/pages';

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
          {
            path: ROUTES.TEAM_DASHBOARDS,
            element: <DummyPage title="Team Dashboards" />,
          },
          {
            path: ROUTES.REGIONAL_DASHBOARDS,
            element: <DummyPage title="Regional Dashboards" />,
          },
          {
            path: ROUTES.LEAD_MANAGEMENT,
            element: <DummyPage title="Lead Management" />,
          },
          {
            path: ROUTES.ALL_DEALS,
            element: <AllDeals />,
          },
          {
            path: ROUTES.PROSPECTS,
            element: <DummyPage title="Prospects" />,
          },
          {
            path: ROUTES.MQLS,
            element: <DummyPage title="MQLs" />,
          },
          {
            path: ROUTES.SQLS,
            element: <DummyPage title="SQLs" />,
          },
          {
            path: ROUTES.OPPORTUNITIES,
            element: <DummyPage title="Opportunities" />,
          },
          {
            path: ROUTES.PROPOSALS,
            element: <DummyPage title="Proposals" />,
          },
          {
            path: ROUTES.NEGOTIATION,
            element: <DummyPage title="Negotiation" />,
          },
          {
            path: ROUTES.WON,
            element: <DummyPage title="Won Deals" />,
          },
          {
            path: ROUTES.LOST,
            element: <DummyPage title="Lost Deals" />,
          },
          {
            path: ROUTES.CALENDAR_TASKS,
            element: <DummyPage title="Calendar & Tasks" />,
          },
          {
            path: ROUTES.CAMPAIGNS,
            element: <DummyPage title="Campaigns" />,
          },
          {
            path: ROUTES.INTELLIGENCE,
            element: <DummyPage title="Intelligence" />,
          },
          { path: ROUTES.SETTINGS, element: <Settings /> },
        ],
      },
    ],
  },
]);
