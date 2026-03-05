import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { AuthenticatedLayout } from '@/components/layout';
import { Loading, PageSkeleton, TableSkeleton } from '@/components/common';
import { ROUTES } from '@/constants';
import { DummyPage } from '@/pages';

/* ── Lazy-loaded pages ── */

const Home = lazy(() => import('@/pages/Home').then((m) => ({ default: m.Home })));
const Dashboard = lazy(() => import('@/pages/Dashboard').then((m) => ({ default: m.Dashboard })));
const AllDeals = lazy(() => import('@/pages/AllDeals').then((m) => ({ default: m.AllDeals })));
const LeadManagement = lazy(() => import('@/pages/LeadManagement').then((m) => ({ default: m.LeadManagement })));
const SimpleForm = lazy(() => import('@/pages/SimpleForm').then((m) => ({ default: m.SimpleForm })));
const AwesomeForm = lazy(() => import('@/pages/AwesomeForm').then((m) => ({ default: m.AwesomeForm })));
const AdvancedForm = lazy(() => import('@/pages/AdvancedForm').then((m) => ({ default: m.AdvancedForm })));
const CalendarTasks = lazy(() => import('@/pages/CalendarTasks').then((m) => ({ default: m.CalendarTasks })));
const KanbanBoardPage = lazy(() => import('@/pages/KanbanBoardPage').then((m) => ({ default: m.KanbanBoardPage })));
const RichTextPage = lazy(() => import('@/pages/RichTextPage').then((m) => ({ default: m.RichTextPage })));
const ChartsShowcase = lazy(() => import('@/pages/ChartsShowcase').then((m) => ({ default: m.ChartsShowcase })));
const PremiumShowcase = lazy(() => import('@/pages/PremiumShowcase').then((m) => ({ default: m.PremiumShowcase })));
const Settings = lazy(() => import('@/pages/Settings').then((m) => ({ default: m.Settings })));
const NotFound = lazy(() => import('@/pages/NotFound').then((m) => ({ default: m.NotFound })));

/* ── Suspense wrappers ── */

function Lazy({ children, fallback }: { children: React.ReactNode; fallback?: React.ReactNode }) {
  return (
    <Suspense fallback={fallback ?? <Loading className="min-h-[50vh]" />}>
      {children}
    </Suspense>
  );
}

/* ── Router ── */

export const router = createBrowserRouter([
  // Root redirect: splash → dashboard
  { path: ROUTES.HOME, element: <Lazy><Home /></Lazy> },

  // 404
  { path: '*', element: <Lazy><NotFound /></Lazy> },

  // Main Layout (Sidebar + Navbar)
  {
    element: <AuthenticatedLayout />,
    children: [
      { path: ROUTES.DASHBOARD, element: <Lazy fallback={<PageSkeleton />}><Dashboard /></Lazy> },
      { path: ROUTES.TEAM_DASHBOARDS, element: <DummyPage title="Team Dashboards" /> },
      { path: ROUTES.REGIONAL_DASHBOARDS, element: <DummyPage title="Regional Dashboards" /> },
      { path: ROUTES.LEAD_MANAGEMENT, element: <Lazy fallback={<TableSkeleton rows={8} columns={6} />}><LeadManagement /></Lazy> },
      { path: ROUTES.ALL_DEALS, element: <Lazy fallback={<TableSkeleton rows={8} columns={6} />}><AllDeals /></Lazy> },
      { path: ROUTES.PROSPECTS, element: <DummyPage title="Prospects" /> },
      { path: ROUTES.MQLS, element: <DummyPage title="MQLs" /> },
      { path: ROUTES.SQLS, element: <DummyPage title="SQLs" /> },
      { path: ROUTES.OPPORTUNITIES, element: <DummyPage title="Opportunities" /> },
      { path: ROUTES.PROPOSALS, element: <DummyPage title="Proposals" /> },
      { path: ROUTES.NEGOTIATION, element: <DummyPage title="Negotiation" /> },
      { path: ROUTES.WON, element: <DummyPage title="Won Deals" /> },
      { path: ROUTES.LOST, element: <DummyPage title="Lost Deals" /> },
      { path: ROUTES.CALENDAR_TASKS, element: <Lazy><CalendarTasks /></Lazy> },
      { path: ROUTES.KANBAN_BOARD, element: <Lazy><KanbanBoardPage /></Lazy> },
      { path: ROUTES.RICH_TEXT_EDITOR, element: <Lazy fallback={<PageSkeleton />}><RichTextPage /></Lazy> },
      { path: ROUTES.CHARTS, element: <Lazy fallback={<PageSkeleton />}><ChartsShowcase /></Lazy> },
      { path: ROUTES.CAMPAIGNS, element: <DummyPage title="Campaigns" /> },
      { path: ROUTES.INTELLIGENCE, element: <DummyPage title="Intelligence" /> },
      { path: ROUTES.SIMPLE_FORM, element: <Lazy><SimpleForm /></Lazy> },
      { path: ROUTES.AWESOME_FORM, element: <Lazy><AwesomeForm /></Lazy> },
      { path: ROUTES.ADVANCED_FORM, element: <Lazy><AdvancedForm /></Lazy> },
      { path: ROUTES.PREMIUM_COMPONENTS, element: <Lazy><PremiumShowcase /></Lazy> },
      { path: ROUTES.SETTINGS, element: <Lazy><Settings /></Lazy> },
    ],
  },
]);
