<div align="center">

# ⚡ React Project Template

### A production-ready React starter with auth, routing, data tables, and a rich component library

[![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript_5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite_7-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

<br/>

Clone it, rename it, start building. Use this as the base for every new React project.

</div>

---

## 🎯 Highlights

| | Feature | Details |
|---|---|---|
| 🚀 | **Lazy-loaded routes** | Each page is a separate chunk — only loads when visited |
| 📦 | **Vendor splitting** | React, Router, Charts, Utils in separate cached chunks |
| 🗜️ | **Gzip + Brotli** | Pre-compressed `.gz` and `.br` for every asset |
| 🛡️ | **Error Boundary** | Global crash handler with retry/reload/go-home actions |
| 📊 | **DataTable** | Reusable table with 11+ settings, pagination, frozen columns, localStorage persistence |
| 🔐 | **Auth system** | Context-based auth with token storage, route guards, auto-restore |
| 💀 | **Skeleton loaders** | 7 presets (card, table, text, profile, form, page) — used as route fallbacks |
| 🎨 | **Component library** | 16+ production-ready UI components |
| 📝 | **Form showcase** | 3 forms: Simple, Awesome (multi-step), Advanced (7-step, every field type) |
| 📤 | **Export** | CSV & Excel export from any table with zero config |
| 🔍 | **Search & Filter** | Reusable SearchInput, custom Dropdown (no native `<select>`) |
| 🌐 | **GTranslate** | Google Translate widget with host-aware language config |
| 🍞 | **Toast system** | Success, error, warning, info notifications |
| 📱 | **Responsive** | Mobile drawer sidebar, collapsible desktop sidebar |
| 🔎 | **SEO-ready HTML** | Meta tags, Open Graph, Twitter Card, `<noscript>`, inline loader |

---

## 🛠️ Tech Stack

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

## 📋 Prerequisites

| Requirement | Version |
|-------------|---------|
| **Node.js** | >= 18 |
| **npm** | >= 9 |

---

## 🚀 Getting Started

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

## 📁 Project Structure

```
src/
├── api/                  # Axios client & endpoint constants
│   ├── client.ts         #   Axios instance with JWT interceptors & token refresh
│   ├── endpoints.ts      #   API route constants
│   └── index.ts
│
├── assets/               # Static assets (icons, images)
│
├── components/
│   ├── common/           # ✨ Reusable UI components (see table below)
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   ├── ConfirmDialog.tsx
│   │   ├── Loading.tsx
│   │   ├── ToastViewport.tsx
│   │   ├── Tooltip.tsx
│   │   ├── SplashScreen.tsx
│   │   ├── AnimatedLogo.tsx
│   │   ├── GTranslate.tsx
│   │   ├── ProtectedRoute.tsx
│   │   ├── GuestRoute.tsx
│   │   ├── DataTable.tsx        # 🆕 Reusable table with settings & pagination
│   │   ├── SearchInput.tsx      # 🆕 Search field with clear button
│   │   ├── Dropdown.tsx         # 🆕 Custom dropdown (replaces <select>)
│   │   ├── ExportMenu.tsx       # 🆕 CSV/Excel export dropdown
│   │   ├── Pagination.tsx       # 🆕 Page navigation with ellipsis
│   │   ├── ErrorBoundary.tsx    # 🆕 Global crash handler
│   │   └── Skeleton.tsx         # 🆕 Skeleton loaders (7 presets)
│   └── layout/
│       ├── Header.tsx
│       ├── Footer.tsx
│       ├── RootLayout.tsx
│       ├── Sidebar.tsx
│       ├── Navbar.tsx
│       └── AuthenticatedLayout.tsx
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
│   └── useDashboardData.ts
│
├── lib/
│   ├── formatters.ts     # formatDate, formatCurrency (Intl API)
│   ├── chart-utils.ts    # Chart colors, tooltip styles, helpers
│   └── theme.ts          # Theme getter/setter with reactive hook
│
├── pages/
│   ├── Home.tsx           # Redirect (→ dashboard or → login)
│   ├── Login.tsx          # Sign-in form (full-screen)
│   ├── Register.tsx       # Registration form (full-screen)
│   ├── Dashboard.tsx      # Protected dashboard with stats grid
│   ├── AllDeals.tsx       # 🆕 Pipeline table with DataTable
│   ├── LeadManagement.tsx # 🆕 Lead table with DataTable
│   ├── SimpleForm.tsx     # 📝 Simple contact form with validation
│   ├── AwesomeForm.tsx    # 📝 Re-export → awesome-form/
│   ├── AdvancedForm.tsx   # 📝 Re-export → advanced-form/
│   ├── awesome-form/      # 📝 4-step multi-step form
│   │   ├── index.tsx      #   Orchestrator (state + navigation)
│   │   ├── types.ts       #   Interfaces
│   │   ├── constants.ts   #   Dropdown options & step config
│   │   ├── validation.ts  #   Per-step validation + password strength
│   │   ├── StepProgress.tsx
│   │   ├── PersonalStep.tsx
│   │   ├── ProfessionalStep.tsx
│   │   ├── AccountStep.tsx
│   │   └── ReviewStep.tsx
│   ├── advanced-form/     # 📝 7-step advanced form (every field type)
│   │   ├── index.tsx      #   Orchestrator (state + navigation)
│   │   ├── types.ts       #   Interfaces
│   │   ├── constants.ts   #   All dropdown options & config
│   │   ├── validation.ts  #   Per-step validation
│   │   ├── StepIndicator.tsx
│   │   ├── SignaturePad.tsx
│   │   ├── PersonalDetailsStep.tsx
│   │   ├── ContactAddressStep.tsx
│   │   ├── EducationWorkStep.tsx
│   │   ├── FinancialDocsStep.tsx
│   │   ├── PreferencesStep.tsx
│   │   ├── SocialContentStep.tsx
│   │   └── ReviewSubmitStep.tsx
│   ├── Settings.tsx       # Protected settings page
│   ├── NotFound.tsx       # 404 page
│   └── DummyPage.tsx      # Placeholder for unimplemented routes
│
├── routes/
│   └── index.tsx          # 🆕 Lazy-loaded routes with Suspense
│
├── services/
│   └── auth.service.ts    # Auth API calls
│
├── types/
│   └── index.ts           # User, NavItem, NavGroup, ApiResponse, AuthTokens
│
├── utils/
│   ├── cn.ts              # Classname combiner utility
│   ├── storage.ts         # localStorage wrapper
│   ├── markdown-to-html.ts
│   └── export-table.ts   # 🆕 CSV/Excel export utilities
│
├── App.tsx               # Root: ErrorBoundary > AuthProvider > UIProvider > Router
├── main.tsx              # React DOM entry point
└── index.css             # Tailwind v4 imports + theme colors + animations
```

---

## 🧩 Built-in Components

### Common Components

| Component | Description |
|-----------|-------------|
| `Button` | 5 variants: `primary` · `secondary` · `outline` · `ghost` · `danger` |
| `Input` | Form input with label, placeholder, and error display |
| `Modal` | Portal-based overlay with Escape key and backdrop click |
| `ConfirmDialog` | Confirm/cancel modal for destructive actions |
| `Loading` | Spinner with `sm` · `md` · `lg` sizes |
| `ToastViewport` | Renders toast notifications from UIContext |
| `Tooltip` | Hover tooltip with arrow, 4-side positioning |
| `SplashScreen` | Animated loading screen on first visit |
| `GTranslate` | Google Translate widget with host-aware config |
| `ProtectedRoute` | Auth route guard (redirects to `/login`) |
| `GuestRoute` | Guest-only route guard (redirects to `/dashboard`) |

### Data & Table Components

| Component | Description |
|-----------|-------------|
| `DataTable<T>` | Generic table with 11+ settings, frozen columns, pagination, localStorage persistence |
| `SearchInput` | Search field with search icon and clear (X) button |
| `Dropdown<V>` | Custom dropdown with keyboard nav, checkmark, icons, disabled items |
| `ExportMenu<T>` | CSV/Excel export dropdown — auto-derives columns from data |
| `Pagination` | Page navigation with first/prev/numbers/next/last + ellipsis |
| `ErrorBoundary` | Class component crash handler with retry, reload, go home |

### Skeleton Loaders

| Component | Description |
|-----------|-------------|
| `Skeleton` | Base pulse block — `rectangle`, `circle`, or `text` variant |
| `CardSkeleton` | Stat card grid placeholder (configurable count) |
| `TableSkeleton` | Full table with header, rows, avatar cells, pagination bar |
| `TextSkeleton` | Paragraph placeholder (configurable line count) |
| `ProfileSkeleton` | Avatar + name + details layout |
| `FormSkeleton` | Label + input field pairs with submit button |
| `PageSkeleton` | Full page: header + cards + table combined |

---

## 📊 DataTable

A powerful, fully reusable table component with built-in settings and pagination.

### Usage

```tsx
import { DataTable, type DataTableColumn } from "@/components/common";

const columns: DataTableColumn<User>[] = [
  { header: "Name", accessor: "name" },
  { header: "Email", accessor: "email" },
  {
    header: "Status",
    render: (row) => <Badge>{row.status}</Badge>,
  },
  {
    header: "Actions",
    align: "center",
    render: (row) => <ActionButtons row={row} />,
  },
];

<DataTable
  data={filteredUsers}
  columns={columns}
  keyExtractor={(row) => row.id}
  totalCount={allUsers.length}
  pageSize={10}
  storageKey="user_table_settings"
  emptyMessage="No users found."
/>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `T[]` | required | Array of rows to display (current page is sliced internally) |
| `columns` | `DataTableColumn<T>[]` | required | Column definitions |
| `keyExtractor` | `(row: T) => string \| number` | required | Unique key per row |
| `storageKey` | `string` | `"table_settings"` | localStorage key for per-table settings |
| `totalCount` | `number` | `data.length` | Unfiltered total for "Showing X of Y" |
| `pageSize` | `number` | `10` | Rows per page |
| `emptyMessage` | `string` | `"No records found."` | Empty state text |
| `minWidth` | `string` | `"min-w-[1120px]"` | Table minimum width class |
| `stickyMaxHeight` | `string` | `"max-h-[70vh]"` | Max height when sticky header is on |

### Column Definition

```tsx
interface DataTableColumn<T> {
  header: string;                    // Column header text
  accessor?: keyof T;                // Auto-render row[accessor]
  render?: (row: T, idx: number) => ReactNode;  // Custom cell renderer
  className?: string;                // Extra class for <td>
  headerClassName?: string;          // Extra class for <th>
  align?: "left" | "center" | "right";
  frozen?: {                         // Sticky column config
    left: number;
    width: number;
    shadow?: boolean;
  };
}
```

### Table Settings (built-in popover)

| Setting | Options |
|---------|---------|
| **Row Density** | Compact · Default · Comfortable |
| **Font Size** | Small · Default · Large |
| **Header Theme** | Light · Dark · Colored (blue) |
| **Table Layout** | Auto-fit · Fixed Width |
| **Striped Rows** | Toggle |
| **Row Borders** | Toggle |
| **Column Borders** | Toggle |
| **Hover Highlight** | Toggle |
| **Uppercase Header** | Toggle |
| **Sticky Header** | Toggle |
| **Freeze Columns** | Toggle (appears when columns have `frozen` config) |

> All settings persist in localStorage per `storageKey`. Each table can have independent settings.

---

## 🔽 Dropdown

Custom dropdown component that replaces native `<select>` with a proper UI.

```tsx
import { Dropdown, type DropdownOption } from "@/components/common";

const options: DropdownOption<"all" | "active" | "inactive">[] = [
  { value: "all", label: "All Status" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive", description: "Hidden from users" },
];

<Dropdown options={options} value={status} onChange={setStatus} />
```

### Features

- Keyboard navigation (Arrow keys, Enter, Escape, Home/End)
- Checkmark on selected item
- Chevron icon with rotation animation
- Optional icon & description per option
- Disabled state (entire dropdown or per-option)
- Click outside to close
- Focus ring on open state
- Generic typed values

---

## 📤 Export (CSV / Excel)

Zero-config export from any data array.

```tsx
import { ExportMenu } from "@/components/common";

// Auto-derives columns from data keys (camelCase → Title Case)
<ExportMenu data={filteredData} filename="report" />

// Or pass explicit columns
<ExportMenu
  data={filteredData}
  columns={[
    { key: "name", header: "Full Name" },
    { key: "email", header: "Email Address" },
  ]}
  filename="users"
/>
```

---

## 🔍 SearchInput

Reusable search field with icon and clear button.

```tsx
import { SearchInput } from "@/components/common";

<SearchInput
  value={search}
  onChange={setSearch}         // Returns string directly (not event)
  placeholder="Search deals..."
/>
```

---

## 📄 Pagination

Standalone pagination with smart ellipsis.

```tsx
import { Pagination } from "@/components/common";

<Pagination
  currentPage={page}
  totalPages={totalPages}
  onPageChange={setPage}
  siblingCount={1}            // Pages shown around current (default: 1)
/>
```

Renders: `« ‹ 1 ... 4 [5] 6 ... 20 › »`

> Pagination is **built into DataTable** automatically — no need to add it manually when using DataTable.

---

## 🛡️ Error Boundary

Global crash handler that wraps the entire app. Catches any unhandled React error and shows a friendly UI instead of a white screen.

```
┌──────────────────────────────┐
│         ⚠ Icon (red)         │
│                              │
│   Something went wrong       │
│   An unexpected error...     │
│                              │
│   ┌── Error message box ──┐  │
│   │ TypeError: ...         │  │
│   └────────────────────────┘  │
│                              │
│   [ Try Again ] [ Go Home ]  │
│       Reload the page        │
└──────────────────────────────┘
```

**3 recovery actions:**
- **Try Again** — Re-renders the component tree (clears error state)
- **Go Home** — Navigates to `/`
- **Reload the page** — Full page reload

**Custom fallback:**
```tsx
<ErrorBoundary fallback={<MyCustomErrorPage />}>
  <App />
</ErrorBoundary>
```

---

## 💀 Skeleton Loaders

Content-shaped loading placeholders that replace spinners for a polished UX.

### Base Skeleton

```tsx
import { Skeleton } from "@/components/common";

<Skeleton variant="rectangle" width={200} height={40} />
<Skeleton variant="circle" height={48} />
<Skeleton variant="text" width="80%" />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"rectangle" \| "circle" \| "text"` | `"rectangle"` | Shape of the placeholder |
| `width` | `string \| number` | — | CSS width (ignored for circle) |
| `height` | `string \| number` | — | CSS height (for circle, also sets width) |
| `className` | `string` | — | Additional classes |

### Presets

```tsx
import {
  CardSkeleton,
  TableSkeleton,
  TextSkeleton,
  ProfileSkeleton,
  FormSkeleton,
  PageSkeleton,
} from "@/components/common";

// Stat cards (default: 4 cards)
<CardSkeleton count={4} />

// Full table with toolbar + header + rows + pagination
<TableSkeleton rows={8} columns={6} showToolbar />

// Paragraph lines (default: 4 lines, last line shorter)
<TextSkeleton lines={5} />

// Avatar + name + details
<ProfileSkeleton />

// Label + input pairs with submit button
<FormSkeleton fields={4} />

// Combined: page header + stat cards + table
<PageSkeleton />
```

### Used as Route Fallbacks

Skeleton presets are wired into lazy-loaded routes as `Suspense` fallbacks:

```tsx
// Dashboard shows full page skeleton while loading
<Lazy fallback={<PageSkeleton />}><Dashboard /></Lazy>

// Table pages show table skeleton while loading
<Lazy fallback={<TableSkeleton rows={8} columns={6} />}><AllDeals /></Lazy>
```

---

## 📝 Forms

Three form pages demonstrating every common form pattern — from basic to comprehensive.

### Simple Form (`/simple-form`)

A clean contact form with inline validation, blur-based error display, character counter, and reset functionality.

**Fields:** Text inputs, email, textarea

---

### Awesome Form (`/awesome-form`)

A 4-step multi-step wizard for account creation.

| Step | Fields |
|------|--------|
| **Personal** | First/last name, email, phone, date of birth, drag & drop avatar upload |
| **Professional** | Company, job title, department/experience dropdowns, salary range slider, skill tags with suggestions, bio textarea |
| **Account** | Username, password with show/hide toggle & strength meter, confirm password, notification toggles (email/sms/push), theme dropdown, terms checkbox |
| **Review** | Full summary organized by section, avatar preview |

---

### Advanced Form (`/advanced-form`)

A 7-step comprehensive form covering **every possible field type** — built for learning and reference.

| Step | Field Types Covered |
|------|-------------------|
| **1. Personal Details** | Prefix/suffix dropdowns, text inputs, custom radio group (styled cards), date picker, auto-calculated age, nationality dropdown, marital status, blood group |
| **2. Contact & Address** | Primary/secondary email, phone with country code dropdown, URL input, full address grid, conditional billing address (same-as-mailing checkbox) |
| **3. Education & Work** | Dynamic repeatable sections (add/remove), dropdowns inside repeaters, "currently working" checkbox, textarea descriptions, tag inputs for certifications & languages with proficiency badges |
| **4. Financial & Docs** | Income range, currency dropdown, tax/PAN inputs, bank details section, multi-file drag & drop upload with file type icons, size display, image preview, delete |
| **5. Preferences** | Color picker, 3 range sliders, radio cards (with visual icons), checkbox group, chip toggle group, star rating (1-5), priority selector (colored buttons), time pickers, date range, 4 toggle switches with descriptions |
| **6. Social & Content** | Social links with branded icons (LinkedIn/GitHub/Twitter/Globe), short bio textarea, cover letter (long markdown textarea), tags input, conditional field (referral source → "Other" shows extra input) |
| **7. Review & Submit** | Full data summary by section, terms/privacy checkboxes, marketing opt-in, canvas signature pad (mouse + touch), additional notes textarea |

**Extra features:** Clickable step indicator (jump to completed steps), overall progress bar with percentage, per-step validation with real-time error clearing.

---

## ⚡ Performance

### Vendor Splitting & Compression

The build produces optimized, cache-friendly chunks with gzip + brotli pre-compression:

```
dist/
├── vendor-react.js       190.5 kB (59.8 kB gz)  ← React + ReactDOM (cached)
├── vendor-router.js       84.1 kB (27.6 kB gz)  ← React Router (cached)
├── index.js               30.5 kB ( 9.5 kB gz)  ← app shell + layout
├── Dropdown.js            17.5 kB ( 5.4 kB gz)  ← DataTable settings UI
├── vendor-utils.js        11.2 kB ( 4.0 kB gz)  ← Axios + Lucide icons
├── LeadManagement.js       8.5 kB ( 2.5 kB gz)  ← lazy page chunk
├── AllDeals.js             7.3 kB ( 2.2 kB gz)  ← lazy page chunk
├── Input.js                4.2 kB ( 1.5 kB gz)  ← shared form component
├── Dashboard.js            1.8 kB ( 0.8 kB gz)  ← lazy page chunk
├── Login.js / Register.js  ~1.8 kB each          ← auth pages
├── Settings.js             1.5 kB                ← lazy page chunk
├── NotFound.js             0.8 kB                ← 404 only
└── Home.js                 0.3 kB                ← initial redirect
```

### Build Optimizations

| Optimization | Details |
|---|---|
| **Vendor splitting** | `react`, `react-router`, `recharts/d3`, `axios/lucide` in separate cached chunks |
| **Terser minification** | Smaller output than default esbuild; strips `console.*` and `debugger` |
| **Gzip + Brotli** | Pre-compressed `.gz` and `.br` files for every asset |
| **No sourcemaps** | Disabled in production (`sourcemap: false`) |
| **Bundle visualizer** | `dist/stats.html` generated on each build |
| **DNS prefetch** | `<link rel="dns-prefetch">` + `<link rel="preconnect">` for API domain |

### Lazy-loaded Routes

All pages are code-split using `React.lazy()` + `Suspense`. Each page loads only when visited. A loading spinner is shown while chunks are being fetched.

### View Page Source

The `index.html` is production-ready for "View Page Source":

| Feature | Details |
|---|---|
| **SEO meta tags** | `description`, `author`, `theme-color`, `color-scheme` |
| **Open Graph** | `og:type`, `og:title`, `og:description`, `og:image` for link previews |
| **Twitter Card** | `twitter:card`, `twitter:title`, `twitter:description` |
| **Inline loader** | Styled spinner inside `<div id="root">` — visible before JS loads |
| **`<noscript>` fallback** | Friendly message if JavaScript is disabled |
| **Critical CSS inlined** | Loader styles are in `<style>` — no external CSS needed for first paint |

### Other Optimizations

- **Vite 7** — Lightning-fast HMR and optimized production builds
- **Tailwind CSS v4 (Vite plugin)** — Only used classes ship to production
- **`useMemo`** — Column definitions and filtered data are memoized
- **localStorage persistence** — Table settings load instantly on revisit
- **Pagination** — Only renders rows for the current page

---

## 🗺️ Routing

| Route | Page | Layout | Access |
|-------|------|--------|--------|
| `/` | Home (redirect) | — | Public |
| `/login` | Login | Full-screen | Guest only |
| `/register` | Register | Full-screen | Guest only |
| `/dashboard` | Dashboard | Authenticated | Protected |
| `/lead-management` | Lead Management | Authenticated | Protected |
| `/sales-funnel/all-deals` | All Deals | Authenticated | Protected |
| `/simple-form` | Simple Form | Authenticated | Protected |
| `/awesome-form` | Awesome Form | Authenticated | Protected |
| `/advanced-form` | Advanced Form | Authenticated | Protected |
| `/settings` | Settings | Authenticated | Protected |
| `*` | NotFound | — | Public |

**Route guards:**
- `ProtectedRoute` — Wraps routes that require authentication. Redirects to `/login` with return path.
- `GuestRoute` — Wraps routes for unauthenticated users only. Redirects to `/dashboard` if already logged in.

---

## 🖼️ Layouts

### Full-screen Layout (Login / Register)

```
┌────────────────────────────────┐
│                                │
│         Login / Register       │
│            (centered)          │
│                                │
└────────────────────────────────┘
```

### Authenticated Layout (Dashboard, Tables, Settings)

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
| **Expand / Collapse** | Toggle pill button, `w-64` ↔ `w-16`, persisted in localStorage |
| **Mobile drawer** | Slide-in overlay with backdrop, triggered by hamburger in Navbar |
| **Grouped navigation** | Sections with titles (Main, Management, Account) |
| **Active route** | Highlighted with `bg-primary/10 text-primary` via NavLink |
| **Collapsed tooltips** | Primary-colored tooltips with arrow on icon hover |
| **User profile** | Avatar (or initials), name, and email at sidebar bottom |
| **Auto-close (mobile)** | Drawer closes on route change |
| **Escape to close** | Keyboard listener on mobile drawer |

---

## 🔐 Authentication

The auth system is fully wired and ready to connect to any backend:

```
ErrorBoundary (catches crashes)
└── AuthProvider (context)
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

```tsx
const { user, isAuthenticated, login, logout } = useAuth();
```

> The Login and Register pages currently use a **demo login** (no backend required). Replace the TODO comments with your actual API calls when ready.

---

## 🍞 Toast Notifications

```tsx
const { addToast } = useUI();

addToast({ type: 'success', message: 'Saved!' });
addToast({ type: 'error', message: 'Something went wrong' });
addToast({ type: 'warning', message: 'Check your input' });
addToast({ type: 'info', message: 'Processing...', duration: 6000 });
```

---

## 🎨 Theme Colors

Defined in `src/index.css` and usable as Tailwind classes (`text-primary`, `bg-success`, etc.):

| Token | Color | Hex |
|-------|-------|-----|
| `primary` | 🔵 Blue | `#3b82f6` |
| `primary-dark` | 🔵 Dark Blue | `#2563eb` |
| `secondary` | 🟣 Indigo | `#6366f1` |
| `accent` | 🟡 Amber | `#f59e0b` |
| `success` | 🟢 Emerald | `#10b981` |
| `warning` | 🟡 Amber | `#f59e0b` |
| `error` | 🔴 Red | `#ef4444` |
| `info` | 🔵 Blue | `#3b82f6` |

---

## 🌐 Google Translate (GTranslate)

A reusable `GTranslate` component loads the [gtranslate.net](https://gtranslate.net/) widget and configures available languages based on the current host.

```tsx
<GTranslate
  restrictedHosts={['example.com']}
  restrictedLanguages={['en', 'fr']}
  defaultLanguages={['en', 'fr', 'de', 'es']}
/>
```

---

## 📜 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server at `http://localhost:9000` |
| `npm run build` | TypeScript type-check + Vite production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the project |

---

## 🧑‍💻 How to Use This Template

### 1. Start a new project

```bash
cp -r react-template/ my-project/
cd my-project
npm install
```

### 2. Rename the app

```env
# .env
VITE_APP_NAME=My Project Name
VITE_API_BASE_URL=http://localhost:8000/api
```

### 3. Add a new page with DataTable

```tsx
// src/pages/Products.tsx
import { DataTable, type DataTableColumn } from "@/components/common";

interface Product { id: number; name: string; price: string; }

const columns: DataTableColumn<Product>[] = [
  { header: "ID", accessor: "id" },
  { header: "Name", accessor: "name" },
  { header: "Price", accessor: "price" },
];

export function Products() {
  return (
    <DataTable
      data={products}
      columns={columns}
      keyExtractor={(r) => r.id}
      storageKey="product_table_settings"
    />
  );
}
```

### 4. Register the route (lazy-loaded)

```tsx
// src/routes/index.tsx
const Products = lazy(() =>
  import('@/pages/Products').then((m) => ({ default: m.Products }))
);

// Inside authenticated layout children:
{ path: ROUTES.PRODUCTS, element: <Lazy><Products /></Lazy> }
```

### 5. Add a sidebar entry

```ts
// src/config/navigation.ts
import { Package } from 'lucide-react';

{ label: 'Products', to: ROUTES.PRODUCTS, icon: Package }
```

### 6. Connect to a real backend

Replace the demo login in `Login.tsx` and `Register.tsx`:

```tsx
const res = await authService.login({ email, password });
login(res.data.data.accessToken, res.data.data.refreshToken, res.data.data.user);
```

---

<div align="center">

Made with ❤️ as a reusable starting point for React projects.

</div>
