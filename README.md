<div align="center">

# React Project Template

### A production-ready React starter with auth, routing, and a component library

[![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript_5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite_7-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

<br/>

Clone it, rename it, start building. Use this as the base for every new React project.

---

</div>

## Tech Stack

| Category | Technology | Version |
|----------|-----------|---------|
| **UI Framework** | [React](https://react.dev/) | 19.2 |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | 5.9 |
| **Build Tool** | [Vite](https://vite.dev/) | 7.3 |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) (Vite plugin) | 4.1 |
| **Routing** | [React Router DOM](https://reactrouter.com/) | 7.13 |
| **HTTP Client** | [Axios](https://axios-http.com/) | 1.13 |
| **Icons** | [Lucide React](https://lucide.dev/) | 0.563 |
| **Charts** | [Recharts](https://recharts.org/) | 3.7 |
| **Linting** | [ESLint](https://eslint.org/) (flat config) | 9.39 |

---

## Prerequisites

| Requirement | Version |
|-------------|---------|
| **Node.js** | >= 18 |
| **npm** | >= 9 |

---

## Getting Started

```bash
# 1. Clone or copy this template
git clone <your-repo-url> my-new-project
cd my-new-project

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env

# 4. Start the dev server (opens http://localhost:9000)
npm run dev
```

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:8000/api` |
| `VITE_APP_NAME` | App display name (shown in header, sidebar, pages) | `My App` |

---

## Project Structure

```
src/
├── api/                  # Axios client & endpoint constants
│   ├── client.ts         #   Axios instance with JWT interceptors & token refresh
│   ├── endpoints.ts      #   API route constants
│   └── index.ts
│
├── assets/               # Static assets
│   ├── icons/
│   └── images/
│
├── components/
│   ├── common/           # Reusable UI components
│   │   ├── Button.tsx    #     primary | secondary | outline | ghost | danger
│   │   ├── Input.tsx     #     Form input with label & error
│   │   ├── Modal.tsx     #     Portal-based modal with keyboard handling
│   │   ├── ConfirmDialog.tsx
│   │   ├── Loading.tsx   #     Animated spinner (sm, md, lg)
│   │   ├── ToastViewport.tsx   # Toast notification system
│   │   ├── Tooltip.tsx   #     Hover tooltip with 4-side + variant support
│   │   ├── SplashScreen.tsx    # Animated intro screen
│   │   ├── AnimatedLogo.tsx    # Spinning orbital logo
│   │   ├── GTranslate.tsx #     Google Translate widget (host-aware languages)
│   │   ├── ProtectedRoute.tsx  # Auth route guard
│   │   └── GuestRoute.tsx      # Guest-only route guard
│   └── layout/
│       ├── Header.tsx          # Public pages — sticky nav with Sign In link
│       ├── Footer.tsx          # Public pages — copyright footer
│       ├── RootLayout.tsx      # Public layout — Header + Outlet + Footer
│       ├── Sidebar.tsx         # Auth layout — collapsible sidebar with nav groups
│       ├── Navbar.tsx          # Auth layout — top bar with user dropdown
│       └── AuthenticatedLayout.tsx  # Auth layout — Sidebar + Navbar + Outlet
│
├── config/
│   ├── env.ts            # Typed access to VITE_* env variables
│   └── navigation.ts     # Sidebar navigation groups & items
│
├── constants/
│   └── index.ts          # ROUTES, APP_CONSTANTS, STORAGE_KEYS
│
├── contexts/
│   ├── auth.ts           # AuthContext definition
│   ├── auth.context.tsx  # AuthProvider (login, logout, token management)
│   ├── ui.ts             # UIContext definition
│   └── ui.context.tsx    # UIProvider (toasts, sidebar open/collapsed state)
│
├── hooks/
│   ├── useAuth.ts        # Access auth state & actions
│   ├── useUI.ts          # Access toasts & UI state
│   ├── useLocalStorage.ts# Generic localStorage hook
│   └── useDashboardData.ts # Placeholder data hook
│
├── lib/
│   ├── formatters.ts     # formatDate, formatCurrency (Intl API)
│   ├── chart-utils.ts    # Chart colors, tooltip styles, helpers
│   └── theme.ts          # Theme getter/setter with reactive hook
│
├── pages/
│   ├── Home.tsx          # Landing page with hero & features
│   ├── Login.tsx         # Sign-in form
│   ├── Register.tsx      # Registration form
│   ├── Dashboard.tsx     # Protected dashboard with stats grid
│   ├── Settings.tsx      # Protected settings page
│   └── NotFound.tsx      # 404 page
│
├── routes/
│   └── index.tsx         # Dual-layout router (public + authenticated)
│
├── services/
│   └── auth.service.ts   # Auth API calls (login, register, logout, me)
│
├── types/
│   └── index.ts          # User, NavItem, NavGroup, ApiResponse, AuthTokens, etc.
│
├── utils/
│   ├── cn.ts             # Classname combiner utility
│   ├── storage.ts        # localStorage wrapper (get, set, remove, clear)
│   └── markdown-to-html.ts # Lightweight MD to HTML converter
│
├── App.tsx               # Root component (AuthProvider > UIProvider > Router)
├── main.tsx              # React DOM entry point
└── index.css             # Tailwind v4 imports + theme colors + animations
```

---

## Layouts

The template uses a **dual-layout architecture** — public pages and authenticated pages have completely different shells:

### Public Layout (`RootLayout`)

Used for Home, Login, Register, and 404 pages:

```
┌────────────────────────────────┐
│            Header              │  ← Sticky nav with logo + Sign In
├────────────────────────────────┤
│                                │
│           <Outlet />           │  ← Page content (max-w-7xl centered)
│                                │
├────────────────────────────────┤
│            Footer              │  ← Copyright bar
└────────────────────────────────┘
```

### Authenticated Layout (`AuthenticatedLayout`)

Used for Dashboard, Settings, and all protected pages:

```
┌──────────┬─────────────────────┐
│          │       Navbar        │  ← Hamburger (mobile), notifications, user dropdown
│          ├─────────────────────┤
│ Sidebar  │                     │
│          │     <Outlet />      │  ← Page content (bg-gray-50)
│          │                     │
│          │                     │
└──────────┴─────────────────────┘
```

### Sidebar Features

| Feature | Details |
|---------|---------|
| **Expand / Collapse** | Toggle pill button, w-64 ↔ w-16, state persisted in localStorage |
| **Mobile drawer** | Slide-in overlay with backdrop, triggered by hamburger in Navbar |
| **Grouped navigation** | Sections with titles (Main, Management, Account) |
| **Active route** | Highlighted with `bg-primary/10 text-primary` via NavLink |
| **Collapsed tooltips** | Primary-colored tooltips with arrow on icon hover |
| **User profile** | Avatar (or initials), name, and email at sidebar bottom |
| **Auto-close (mobile)** | Drawer closes on route change |
| **Escape to close** | Keyboard listener on mobile drawer |
| **Scroll lock** | Body scroll disabled when mobile drawer is open |

### Adding Sidebar Items

Edit `src/config/navigation.ts` — single source of truth:

```ts
import { Package } from 'lucide-react';

export const sidebarNavigation: NavGroup[] = [
  {
    title: 'Main',
    items: [
      { label: 'Dashboard', to: ROUTES.DASHBOARD, icon: LayoutDashboard },
      { label: 'Products', to: '/products', icon: Package },  // ← add here
    ],
  },
  // ...
];
```

---

## Routing

| Route | Page | Layout | Access | Description |
|-------|------|--------|--------|-------------|
| `/` | Home | Public | Public | Landing page with hero section |
| `/login` | Login | Public | Guest only | Redirects to dashboard if logged in |
| `/register` | Register | Public | Guest only | Redirects to dashboard if logged in |
| `/dashboard` | Dashboard | Authenticated | Protected | Redirects to login if not authenticated |
| `/settings` | Settings | Authenticated | Protected | Redirects to login if not authenticated |
| `*` | NotFound | Public | Public | 404 catch-all |

**Route guards:**
- `ProtectedRoute` - Wraps routes that require authentication. Redirects to `/login` with return path.
- `GuestRoute` - Wraps routes for unauthenticated users only. Redirects to `/dashboard` if already logged in.

---

## Authentication

The auth system is fully wired and ready to connect to any backend:

```
AuthProvider (context)
├── Stores user + tokens in localStorage
├── Restores session on page reload
├── login(token, refreshToken, user)
├── logout()
└── updateUser(user)

API Client (Axios interceptors)
├── Attaches Bearer token to every request
├── Auto-refreshes token on 401 responses
└── Redirects to /login if refresh fails
```

**Usage in any component:**

```tsx
const { user, isAuthenticated, login, logout } = useAuth();
```

> The Login and Register pages currently use a **demo login** (no backend required). Replace the TODO comments with your actual API calls when ready.

---

## Google Translate (GTranslate)

A reusable `GTranslate` component (`src/components/common/GTranslate.tsx`) loads the [gtranslate.net](https://gtranslate.net/) widget and configures available languages based on the current host.

| Host | Languages |
|------|-----------|
| `sterlingaccuris.com`, `uat-prod.sterlingaccuris.com` | English, Gujarati, Hindi |
| All other hosts | English, Gujarati, Hindi, Arabic |

The widget is placed at the **far right of the Navbar** (after the user dropdown, separated by a divider). It also handles session iframe token sync when `access_token` exists in localStorage.

The default gtranslate float widget is fully restyled via CSS overrides in `src/index.css` (under the `GTranslate Navbar Overrides` section) to match the navbar's design — transparent background, rounded border, matching typography, and a dropdown that opens downward with the same shadow/border style as the user menu.

**Customizing hosts & languages:**

```tsx
<GTranslate
  restrictedHosts={['example.com']}
  restrictedLanguages={['en', 'fr']}
  defaultLanguages={['en', 'fr', 'de', 'es']}
/>
```

**Using standalone in any page:**

```tsx
import { GTranslate } from '@/components/common';

<GTranslate className="flex items-center" />
```

---

## Toast Notifications

```tsx
const { addToast } = useUI();

addToast({ type: 'success', message: 'Saved!' });
addToast({ type: 'error', message: 'Something went wrong' });
addToast({ type: 'warning', message: 'Check your input' });
addToast({ type: 'info', message: 'Processing...', duration: 6000 });
```

---

## Theme Colors

Defined in `src/index.css` and usable as Tailwind classes (`text-primary`, `bg-success`, etc.):

| Token | Color | Hex |
|-------|-------|-----|
| `primary` | Blue | `#3b82f6` |
| `primary-dark` | Dark Blue | `#2563eb` |
| `secondary` | Indigo | `#6366f1` |
| `accent` | Amber | `#f59e0b` |
| `success` | Emerald | `#10b981` |
| `warning` | Amber | `#f59e0b` |
| `error` | Red | `#ef4444` |
| `info` | Blue | `#3b82f6` |

---

## How to Use This Template

### 1. Start a new project

```bash
cp -r react-template/ my-project/
cd my-project
```

### 2. Rename the app

Edit `.env`:

```env
VITE_APP_NAME=My Project Name
VITE_API_BASE_URL=http://localhost:8000/api
```

Update `package.json`:

```json
{
  "name": "my-project-name"
}
```

### 3. Add new pages

Create a page in `src/pages/`:

```tsx
// src/pages/Products.tsx
export function Products() {
  return <div>Products page</div>;
}
```

Add the route constant in `src/constants/index.ts`:

```ts
export const ROUTES = {
  // ...existing routes
  PRODUCTS: '/products',
} as const;
```

Register it in `src/routes/index.tsx` under the authenticated layout:

```tsx
import { Products } from '@/pages';

// Inside the ProtectedRoute > AuthenticatedLayout children:
{ path: ROUTES.PRODUCTS, element: <Products /> },
```

Add a sidebar entry in `src/config/navigation.ts`:

```ts
import { Package } from 'lucide-react';

// Inside the appropriate NavGroup:
{ label: 'Products', to: ROUTES.PRODUCTS, icon: Package },
```

### 4. Add API endpoints

Add endpoint constants in `src/api/endpoints.ts`:

```ts
export const ENDPOINTS = {
  AUTH: { /* ...existing */ },
  PRODUCTS: {
    LIST: '/products',
    GET: (id: string) => `/products/${id}`,
    CREATE: '/products',
  },
} as const;
```

Create a service in `src/services/`:

```ts
// src/services/product.service.ts
import { apiClient, ENDPOINTS } from '@/api';

export const productService = {
  list: () => apiClient.get(ENDPOINTS.PRODUCTS.LIST),
  get: (id: string) => apiClient.get(ENDPOINTS.PRODUCTS.GET(id)),
  create: (data: CreateProductRequest) => apiClient.post(ENDPOINTS.PRODUCTS.CREATE, data),
};
```

### 5. Connect to a real backend

Replace the demo login in `src/pages/Login.tsx` and `src/pages/Register.tsx`:

```tsx
// Remove the demo block and uncomment the real API call:
const res = await authService.login({ email, password });
login(res.data.data.accessToken, res.data.data.refreshToken, res.data.data.user);
```

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server at `http://localhost:9000` |
| `npm run build` | TypeScript type-check + Vite production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the project |

---

## Built-in Components

| Component | Location | Description |
|-----------|----------|-------------|
| `Button` | `components/common` | 5 variants: primary, secondary, outline, ghost, danger |
| `Input` | `components/common` | Form input with label, placeholder, and error display |
| `Modal` | `components/common` | Portal-based overlay with Escape key and backdrop click |
| `ConfirmDialog` | `components/common` | Confirm/cancel modal for destructive actions |
| `Loading` | `components/common` | Spinner with sm/md/lg sizes |
| `ToastViewport` | `components/common` | Renders toast notifications from UIContext |
| `Tooltip` | `components/common` | Hover tooltip with arrow, 4-side positioning, default + primary variants |
| `SplashScreen` | `components/common` | Animated loading screen on first visit |
| `AnimatedLogo` | `components/common` | Orbital spinning logo with gradients |
| `GTranslate` | `components/common` | Google Translate widget with host-aware language config |
| `Sidebar` | `components/layout` | Collapsible sidebar with grouped nav, mobile drawer, user profile |
| `Navbar` | `components/layout` | Top bar with translate, hamburger, notifications, user dropdown |
| `AuthenticatedLayout` | `components/layout` | Composes Sidebar + Navbar + Outlet for protected pages |
