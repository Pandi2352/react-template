import {
  CalendarDays,
  ClipboardList,
  Database,
  Filter,
  Kanban,
  LayoutDashboard,
  Sparkles,
  Rocket,
  Type,
  TrendingUp,
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
  { id: 'rich-text-editor', label: 'Rich Text Editor', icon: Type, to: ROUTES.RICH_TEXT_EDITOR },
  { id: 'charts-suite', label: 'Charts Suite', icon: TrendingUp, to: ROUTES.CHARTS },
  { id: 'simple-form', label: 'Simple Form', icon: ClipboardList, to: ROUTES.SIMPLE_FORM },
  { id: 'awesome-form', label: 'Awesome Form', icon: Sparkles, to: ROUTES.AWESOME_FORM },
  { id: 'advanced-form', label: 'Advanced Form', icon: Rocket, to: ROUTES.ADVANCED_FORM },
  { id: 'premium-components', label: 'Premium Suite', icon: Sparkles, to: ROUTES.PREMIUM_COMPONENTS },
];
