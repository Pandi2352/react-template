# Roadmap

Future features and improvements planned for this template.

---

## Sidebar & Navigation

- [ ] **Nested sub-menus** — Expandable/collapsible child items within nav groups
- [ ] **Badge counts** — Notification badges on sidebar items (e.g., unread messages count)
- [ ] **Pinned / favorites** — Let users pin frequently used nav items to the top
- [ ] **Search command palette** — `Ctrl+K` shortcut to search and jump to any page
- [ ] **Breadcrumbs** — Auto-generated breadcrumb trail in the Navbar based on route hierarchy
- [ ] **Multi-level sidebar** — Secondary sidebar for sub-sections (e.g., Settings > General, Security, Billing)

## Authentication & Authorization

- [ ] **Role-based access control (RBAC)** — Admin, editor, viewer roles with route-level and component-level guards
- [ ] **Permission-based UI** — Hide/show sidebar items and buttons based on user permissions
- [ ] **OAuth / social login** — Google, GitHub, Microsoft sign-in integration
- [ ] **Two-factor authentication (2FA)** — TOTP-based 2FA setup flow
- [ ] **Session timeout** — Auto-logout after inactivity with warning modal
- [ ] **Remember me** — Persistent login option with extended token TTL

## Layout & Theming

- [ ] **Dark mode** — Full dark theme with system preference detection and manual toggle
- [ ] **Right-to-left (RTL)** — Layout mirroring for Arabic, Hebrew, and other RTL languages
- [ ] **Compact mode** — Denser spacing option for power users with lots of data
- [ ] **Custom theme builder** — UI for picking primary color, border radius, font, etc.
- [ ] **Multiple layout presets** — Horizontal nav, mini sidebar, top-bar-only options
- [ ] **Responsive breakpoint indicator** — Dev-only badge showing current breakpoint (sm, md, lg, xl)

## Components

- [ ] **Data table** — Sortable, filterable, paginated table with column resizing and row selection
- [ ] **Form builder** — Schema-driven forms with validation (Zod or Yup integration)
- [ ] **File upload** — Drag-and-drop zone with progress bar and preview
- [ ] **Rich text editor** — WYSIWYG editor for content management pages
- [ ] **Date picker** — Calendar-based date and date range selection
- [ ] **Select / Combobox** — Searchable dropdown with multi-select and async loading
- [ ] **Tabs component** — Routed and non-routed tab panels
- [ ] **Stepper / Wizard** — Multi-step form with progress indicator
- [ ] **Skeleton loaders** — Content placeholder animations for every major component
- [ ] **Empty states** — Illustrated placeholders for empty lists, search results, errors

## State Management & Data

- [ ] **React Query / TanStack Query** — Server state caching, background refetching, optimistic updates
- [ ] **Zustand store** — Lightweight global state alternative to Context for complex state
- [ ] **Optimistic UI updates** — Instant feedback on mutations with rollback on failure
- [ ] **Infinite scroll** — Cursor-based pagination for long lists
- [ ] **Real-time updates** — WebSocket or SSE integration for live data (notifications, chat)
- [ ] **Offline support** — Service worker + IndexedDB for offline-first capability

## Developer Experience

- [ ] **Storybook** — Component documentation and visual testing playground
- [ ] **Unit tests** — Vitest + React Testing Library setup with example tests
- [ ] **E2E tests** — Playwright or Cypress configuration with auth flow tests
- [ ] **CI/CD pipeline** — GitHub Actions workflow for lint, test, build, and deploy
- [ ] **Husky + lint-staged** — Pre-commit hooks for code quality enforcement
- [ ] **Auto-import** — Unplugin auto-import for hooks and utilities
- [ ] **Bundle analyzer** — Visualize production bundle size and dependencies
- [ ] **Error boundary** — Global error boundary with fallback UI and error reporting

## Pages & Features

- [ ] **User profile page** — Avatar upload, personal info editing, password change
- [ ] **Notification center** — Full notification list with read/unread, filters, and mark-all-read
- [ ] **Activity log** — Audit trail showing user actions with timestamps
- [ ] **Onboarding flow** — First-login guided tour highlighting key features
- [ ] **Help / FAQ page** — Searchable knowledge base with accordion layout
- [ ] **Changelog page** — Version history with release notes

## Internationalization

- [ ] **i18n setup** — `react-i18next` integration with language detection
- [ ] **Translation files** — English + one sample language (e.g., Spanish)
- [ ] **Language switcher** — Dropdown in Navbar or Settings to change locale
- [ ] **Date/number formatting** — Locale-aware formatting via Intl API

## Performance

- [ ] **Route-level code splitting** — Lazy loading pages with `React.lazy` and Suspense
- [ ] **Image optimization** — Lazy loading images with blur placeholder
- [ ] **Virtual scrolling** — Virtualized lists for rendering thousands of items efficiently
- [ ] **Prefetching** — Preload routes on link hover for instant navigation
- [ ] **Web Vitals monitoring** — Track and report Core Web Vitals (LCP, FID, CLS)

---

> Items are roughly ordered by priority within each section. Check off items as they are implemented.
