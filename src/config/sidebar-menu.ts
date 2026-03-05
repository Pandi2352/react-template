import {
  Brain,
  CalendarDays,
  ClipboardList,
  Database,
  Filter,
  Kanban,
  LayoutDashboard,
  Megaphone,
  Settings,
  Sparkles,
  Rocket,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { ROUTES } from '@/constants';

export interface SidebarSubItem {
  id: string;
  label: string;
  to: string;
}

export interface SidebarItem {
  id: string;
  label: string;
  icon: LucideIcon;
  to?: string;
  children?: SidebarSubItem[];
  defaultOpen?: boolean;
}

export const sidebarMenuItems: SidebarItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, to: ROUTES.DASHBOARD },
  {
    id: 'team-dashboards',
    label: 'Team Dashboards',
    icon: Users,
    to: ROUTES.TEAM_DASHBOARDS,
  },
  {
    id: 'regional-dashboards',
    label: 'Regional Dashboards',
    icon: Database,
    to: ROUTES.REGIONAL_DASHBOARDS,
  },
  {
    id: 'lead-management',
    label: 'Lead Management',
    icon: Database,
    to: ROUTES.LEAD_MANAGEMENT,
  },
  {
    id: 'sales-funnel',
    label: 'Sales Funnel',
    icon: Filter,
    defaultOpen: true,
    children: [
      { id: 'all-deals', label: 'All Deals', to: ROUTES.ALL_DEALS }
    ],
  },
  { id: 'calendar', label: 'Calendar & Tasks', icon: CalendarDays, to: ROUTES.CALENDAR_TASKS },
  { id: 'kanban-board', label: 'Kanban Board', icon: Kanban, to: ROUTES.KANBAN_BOARD },
  { id: 'campaigns', label: 'Campaigns', icon: Megaphone, to: ROUTES.CAMPAIGNS },
  { id: 'intelligence', label: 'Intelligence', icon: Brain, to: ROUTES.INTELLIGENCE },
  { id: 'simple-form', label: 'Simple Form', icon: ClipboardList, to: ROUTES.SIMPLE_FORM },
  { id: 'awesome-form', label: 'Awesome Form', icon: Sparkles, to: ROUTES.AWESOME_FORM },
  { id: 'advanced-form', label: 'Advanced Form', icon: Rocket, to: ROUTES.ADVANCED_FORM },
  { id: 'settings', label: 'Settings', icon: Settings, to: ROUTES.SETTINGS },
];
