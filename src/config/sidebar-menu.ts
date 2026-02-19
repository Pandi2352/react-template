import {
  Brain,
  CalendarDays,
  Database,
  Filter,
  LayoutDashboard,
  Megaphone,
  Settings,
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
      { id: 'all-deals', label: 'All Deals', to: ROUTES.ALL_DEALS },
      { id: 'prospects', label: 'Prospects', to: ROUTES.PROSPECTS },
      { id: 'mqls', label: 'MQLs', to: ROUTES.MQLS },
      { id: 'sqls', label: 'SQLs', to: ROUTES.SQLS },
      { id: 'opportunities', label: 'Opportunities', to: ROUTES.OPPORTUNITIES },
      { id: 'proposals', label: 'Proposals', to: ROUTES.PROPOSALS },
      { id: 'negotiation', label: 'Negotiation', to: ROUTES.NEGOTIATION },
      { id: 'won', label: 'Won', to: ROUTES.WON },
      { id: 'lost', label: 'Lost', to: ROUTES.LOST },
    ],
  },
  { id: 'calendar', label: 'Calendar & Tasks', icon: CalendarDays, to: ROUTES.CALENDAR_TASKS },
  { id: 'campaigns', label: 'Campaigns', icon: Megaphone, to: ROUTES.CAMPAIGNS },
  { id: 'intelligence', label: 'Intelligence', icon: Brain, to: ROUTES.INTELLIGENCE },
  { id: 'settings', label: 'Settings', icon: Settings, to: ROUTES.SETTINGS },
];
