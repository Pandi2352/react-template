import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { AuthenticatedLayout } from '@/components/layout';
import { ProtectedRoute, GuestRoute, Loading } from '@/components/common';
import { ROUTES } from '@/constants';
import { DummyPage } from '@/pages';

/* ── Lazy-loaded pages ── */

const Home = lazy(() => import('@/pages/Home').then((m) => ({ default: m.Home })));
const Login = lazy(() => import('@/pages/Login').then((m) => ({ default: m.Login })));
const Register = lazy(() => import('@/pages/Register').then((m) => ({ default: m.Register })));
const Dashboard = lazy(() => import('@/pages/Dashboard').then((m) => ({ default: m.Dashboard })));
const AllDeals = lazy(() => import('@/pages/AllDeals').then((m) => ({ default: m.AllDeals })));
const LeadManagement = lazy(() => import('@/pages/LeadManagement').then((m) => ({ default: m.LeadManagement })));
const Settings = lazy(() => import('@/pages/Settings').then((m) => ({ default: m.Settings })));
const NotFound = lazy(() => import('@/pages/NotFound').then((m) => ({ default: m.NotFound })));

/* ── Suspense wrapper ── */

function Lazy({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<Loading className="min-h-[50vh]" />}>
      {children}
    </Suspense>
  );
}

/* ── Router ── */

export const router = createBrowserRouter([
  // Root redirect: splash → login (or dashboard if authenticated)
  { path: ROUTES.HOME, element: <Lazy><Home /></Lazy> },

  // Guest-only routes (full-screen, no header/footer)
  {
    element: <GuestRoute />,
    children: [
      { path: ROUTES.LOGIN, element: <Lazy><Login /></Lazy> },
      { path: ROUTES.REGISTER, element: <Lazy><Register /></Lazy> },
    ],
  },

  // 404
  { path: '*', element: <Lazy><NotFound /></Lazy> },

  // Authenticated layout (Sidebar + Navbar)
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AuthenticatedLayout />,
        children: [
          { path: ROUTES.DASHBOARD, element: <Lazy><Dashboard /></Lazy> },
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
            element: <Lazy><LeadManagement /></Lazy>,
          },
          {
            path: ROUTES.ALL_DEALS,
            element: <Lazy><AllDeals /></Lazy>,
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
          { path: ROUTES.SETTINGS, element: <Lazy><Settings /></Lazy> },
        ],
      },
    ],
  },
]);
