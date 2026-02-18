import { LayoutDashboard, Settings, Users, BarChart3, FileText } from 'lucide-react';
import { ROUTES } from '@/constants';
import type { NavGroup } from '@/types';

export const sidebarNavigation: NavGroup[] = [
  {
    title: 'Main',
    items: [
      { label: 'Dashboard', to: ROUTES.DASHBOARD, icon: LayoutDashboard },
      { label: 'Analytics', to: '/analytics', icon: BarChart3 },
    ],
  },
  {
    title: 'Management',
    items: [
      { label: 'Users', to: '/users', icon: Users },
      { label: 'Reports', to: '/reports', icon: FileText },
    ],
  },
  {
    title: 'Account',
    items: [{ label: 'Settings', to: ROUTES.SETTINGS, icon: Settings }],
  },
];
