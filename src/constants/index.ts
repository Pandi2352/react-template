export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  TEAM_DASHBOARDS: '/team-dashboards',
  REGIONAL_DASHBOARDS: '/regional-dashboards',
  LEAD_MANAGEMENT: '/lead-management',
  ALL_DEALS: '/sales-funnel/all-deals',
  PROSPECTS: '/sales-funnel/prospects',
  MQLS: '/sales-funnel/mqls',
  SQLS: '/sales-funnel/sqls',
  OPPORTUNITIES: '/sales-funnel/opportunities',
  PROPOSALS: '/sales-funnel/proposals',
  NEGOTIATION: '/sales-funnel/negotiation',
  WON: '/sales-funnel/won',
  LOST: '/sales-funnel/lost',
  CALENDAR_TASKS: '/calendar-tasks',
  CAMPAIGNS: '/campaigns',
  INTELLIGENCE: '/intelligence',
  SETTINGS: '/settings',
} as const;

export const APP_CONSTANTS = {
  STORAGE_KEYS: {
    AUTH_TOKEN: 'auth_token',
    REFRESH_TOKEN: 'refresh_token',
    AUTH_USER: 'auth_user',
    THEME: 'theme',
    SIDEBAR_COLLAPSED: 'sidebar_collapsed',
    TABLE_SETTINGS: 'table_settings',
  },
} as const;
