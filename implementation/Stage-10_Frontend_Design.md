# Chopmate — Frontend Design Document

## 1. Project Overview

**Chopmate** is a comprehensive restaurant management platform covering order processing, table reservations, inventory control, billing, staff management, CRM, and analytics — all in one unified interface.

**Target Users:**
- Restaurant owners / admins
- Floor staff (waiters, cashiers)
- Kitchen staff
- Managers

**Frontend Stack:** React (JavaScript), TanStack Query, React Hook Form, shadcn/ui

---

## 2. Design Philosophy

Chopmate is an operational tool used under pressure — during busy lunch rushes, kitchen chaos, and split-second billing moments. The UI must be:

- **Fast to scan** — information hierarchy is everything
- **Forgiving** — confirmation states, clear errors, undo where possible
- **Role-aware** — staff see only what they need
- **Consistent** — every module follows the same interaction grammar

> Design principle: *Calm confidence.* Dense but never cluttered. Functional but never cold.

---

## 3. Design System

### 3.1 Color Palette

| Token | Value | Usage |
|---|---|---|
| `--color-brand` | `#E85D26` | Primary CTA, active nav, key accents |
| `--color-brand-muted` | `#FDF0EA` | Hover states, tag backgrounds |
| `--color-surface` | `#FFFFFF` | Cards, modals, panels |
| `--color-bg` | `#F5F5F4` | Page background |
| `--color-sidebar` | `#1A1A1A` | Sidebar background |
| `--color-text-primary` | `#111111` | Headings, labels |
| `--color-text-secondary` | `#6B7280` | Descriptions, metadata |
| `--color-border` | `#E5E7EB` | Dividers, input borders |
| `--color-success` | `#22C55E` | Paid, available, in-stock |
| `--color-warning` | `#F59E0B` | Low stock, pending |
| `--color-danger` | `#EF4444` | Cancel, out-of-stock, overdue |

### 3.2 Typography

| Role | Font | Weight | Size |
|---|---|---|---|
| Display / Page Title | `DM Serif Display` | 400 | 28–36px |
| Headings (H2–H4) | `DM Sans` | 600 | 16–22px |
| Body / Labels | `DM Sans` | 400 | 14px |
| Metadata / Captions | `DM Sans` | 400 | 12px |
| Monospace (IDs, codes) | `JetBrains Mono` | 400 | 13px |

### 3.3 Spacing Scale

Follow an 4px base grid. Common values: `4, 8, 12, 16, 20, 24, 32, 48, 64px`.

### 3.4 Border Radius

| Component | Radius |
|---|---|
| Cards, Panels | `12px` |
| Buttons, Inputs | `8px` |
| Badges, Chips | `999px` |
| Modals | `16px` |

### 3.5 Shadows

```css
--shadow-sm:  0 1px 3px rgba(0,0,0,0.06);
--shadow-md:  0 4px 12px rgba(0,0,0,0.08);
--shadow-lg:  0 8px 24px rgba(0,0,0,0.12);
```

---

## 4. Layout Architecture

### 4.1 Shell

```
┌─────────────────────────────────────────────────┐
│  Sidebar (240px fixed)  │  Main Content Area     │
│                         │  ┌────────────────┐   │
│  Logo                   │  │  Page Header   │   │
│  ─────────────          │  ├────────────────┤   │
│  Nav Links              │  │                │   │
│    • Dashboard          │  │  Page Content  │   │
│    • Orders             │  │                │   │
│    • Tables             │  │                │   │
│    • Inventory          │  └────────────────┘   │
│    • Billing            │                        │
│    • Staff              │                        │
│    • CRM                │                        │
│    • Analytics          │                        │
│  ─────────────          │                        │
│  User Profile           │                        │
└─────────────────────────────────────────────────┘
```

- Sidebar is **dark** (`--color-sidebar`), always visible on desktop
- Sidebar collapses to icon-only on tablet, bottom nav on mobile
- Main area has a `--color-bg` background with a padded content region
- Page header contains: page title, breadcrumb (where applicable), and primary action button

### 4.2 Page Header Pattern

```jsx
<PageHeader
  title="Orders"
  subtitle="Manage dine-in, takeout & delivery"
  action={<Button>+ New Order</Button>}
/>
```

### 4.3 Content Zones

| Zone | Usage |
|---|---|
| **Stats Row** | 3–4 KPI cards at top of key pages |
| **Filter Bar** | Search, date range, status filters |
| **Data Table / Grid** | Primary content area |
| **Detail Panel** | Right-side slide-in for item detail |
| **Modals** | Create/edit forms, confirmations |

---

## 5. Component Architecture

### 5.1 Folder Structure

```
src/
├── components/
│   ├── ui/               # shadcn/ui primitives (Button, Input, Badge, etc.)
│   ├── common/           # App-wide reusables (PageHeader, StatCard, DataTable, etc.)
│   ├── layout/           # Sidebar, TopBar, Shell
│   └── modals/           # Modal registry + individual modal components
├── features/
│   ├── orders/
│   ├── tables/
│   ├── inventory/
│   ├── billing/
│   ├── staff/
│   ├── crm/
│   └── analytics/
├── hooks/                # Custom hooks (useAuth, useModal, useDebouncedSearch, etc.)
├── context/              # AuthContext, ModalContext
├── lib/                  # axios instance, queryClient, utils
├── pages/                # Route-level components
└── routes/               # React Router config
```

Each `features/<module>/` follows this internal structure:

```
orders/
├── components/       # Module-specific components (OrderCard, OrderStatusBadge)
├── hooks/            # useOrders, useCreateOrder
├── api.js            # All API calls for this module
└── index.js          # Public exports
```

### 5.2 Shared Components

| Component | Description |
|---|---|
| `<StatCard>` | KPI tile with label, value, delta, icon |
| `<DataTable>` | Sortable, filterable table with pagination |
| `<StatusBadge>` | Color-coded status chip (maps status → color token) |
| `<PageHeader>` | Title + subtitle + optional action slot |
| `<FilterBar>` | Search input + filter dropdowns + date range |
| `<EmptyState>` | Illustration + message for empty lists |
| `<ConfirmDialog>` | Reusable destructive action confirmation |
| `<DetailPanel>` | Right slide-in panel for item detail |

### 5.3 Modal System

Uses a **Modal Registry** pattern with a `ModalContext`:

```js
// Usage anywhere in the app
const { openModal } = useModal();

openModal('CREATE_ORDER', { tableId: '12' });
openModal('EDIT_STAFF', { staffId: 'abc' });
openModal('CONFIRM_DELETE', { onConfirm: handleDelete });
```

Modal IDs are defined as constants. The registry maps IDs to components. Only one modal renders at a time.

---

## 6. State Management Strategy

### 6.1 Server State — TanStack Query

All API data is managed via TanStack Query. Rules:

- Each feature module defines its own query keys: `['orders']`, `['orders', id]`, `['inventory']`, etc.
- Mutations always invalidate relevant queries on success
- Optimistic updates used for high-frequency actions (e.g., order status toggle)
- `staleTime` set per resource type:
  - Orders: `0` (always fresh)
  - Inventory: `30s`
  - Analytics: `60s`

### 6.2 Client State

| State | Storage |
|---|---|
| Auth (user, role, token) | `AuthContext` + HTTP-only cookie |
| Active modal | `ModalContext` |
| Sidebar collapsed | `localStorage` |
| Filters / search | Local component state (not persisted) |
| Cart / active order | Local component state or `OrderContext` |

### 6.3 Auth Flow

- JWT access token stored in memory (AuthContext)
- Refresh token in HTTP-only cookie
- `/auth/me` called on app mount to rehydrate session
- Axios interceptor handles 401 → silent refresh → retry
- Role-based route guards wrap protected pages

---

## 7. Feature Pages

### 7.1 Dashboard

- Stats row: Today's Revenue, Active Orders, Table Occupancy, Low Stock Alerts
- Recent orders table (last 10)
- Quick actions: New Order, Add Reservation, View Reports

### 7.2 Order Management

- Tabbed view: **Dine-in | Takeout | Delivery**
- Kanban or list view toggle
- Order statuses: `pending → confirmed → preparing → ready → delivered → paid`
- Real-time polling every 15s (or WebSocket if backend supports)
- Detail panel: order items, customer info, status update

### 7.3 Table Reservation

- Visual floor map (grid of table cards)
- Table states: `available | reserved | occupied | unavailable`
- Reservation form: name, party size, date/time, special requests
- Timeline view for date-based reservation browsing

### 7.4 Inventory Management

- List of items with quantity, unit, reorder threshold
- Status badges: `In Stock | Low Stock | Out of Stock`
- Inline quantity editing
- Low stock alert banner at page top
- Wastage log tab

### 7.5 Billing & Payments

- Invoice list with filters (paid, unpaid, overdue)
- Invoice detail: line items, tax breakdown, total
- Payment status update
- Print / export invoice as PDF

### 7.6 Staff Management

- Staff list with role badges
- Schedule view (weekly calendar grid)
- Attendance log
- Add/edit staff modal with role selector

### 7.7 CRM

- Customer list: name, visits, spend, loyalty points
- Customer detail panel: order history, preferences, tags
- Loyalty program config
- Targeted offer creation form

### 7.8 Analytics Dashboard

- Date range picker (Today / This Week / This Month / Custom)
- Charts: Revenue over time (line), Sales by category (bar), Peak hours (heatmap)
- Top items table
- Export to CSV

---

## 8. Forms

All forms use **React Hook Form + Zod**.

### 8.1 Conventions

- Schema defined in a separate `schema.js` file per form
- `useForm` initialized with `zodResolver(schema)`
- Reusable `<FormField>` wrapper handles label, input, error message
- Disabled submit button until form is valid and not submitting
- API errors (non-validation) shown via `toast` (sonner)

### 8.2 Common Validations

| Field | Rule |
|---|---|
| Required text | `z.string().min(1, 'Required')` |
| Phone | `z.string().regex(...)` |
| Price | `z.number().min(0)` |
| Date/Time | `z.string().datetime()` |
| Role | `z.enum(['admin', 'manager', 'staff', 'kitchen'])` |

---

## 9. Routing

Using **React Router v6**.

```
/                         → redirect to /dashboard
/login                    → LoginPage (public)
/dashboard                → DashboardPage
/orders                   → OrdersPage
/orders/:id               → (detail panel on OrdersPage, not separate route)
/tables                   → TablesPage
/inventory                → InventoryPage
/billing                  → BillingPage
/billing/:invoiceId       → InvoiceDetailPage
/staff                    → StaffPage
/crm                      → CRMPage
/crm/:customerId          → CustomerDetailPage
/analytics                → AnalyticsPage
/settings                 → SettingsPage
```

Route guards:
- `<PrivateRoute>` — redirects unauthenticated users to `/login`
- `<RoleRoute roles={['admin', 'manager']}>` — 403 page for unauthorized roles

---

## 10. API Integration

- Axios instance configured with `baseURL`, `withCredentials: true`
- Request interceptor: attaches access token from AuthContext
- Response interceptor: handles 401 → refresh → retry
- All API calls live in `features/<module>/api.js`
- TanStack Query wraps all calls — no raw `useEffect` for data fetching

---

## 11. Error Handling

| Scenario | Handling |
|---|---|
| Form validation error | Inline field error message |
| API 400 (bad request) | Toast error with message from server |
| API 401 (unauthorized) | Silent refresh, redirect to login if refresh fails |
| API 403 (forbidden) | Show 403 page or disable UI element |
| API 500 | Toast: "Something went wrong. Try again." |
| Network offline | Global offline banner |

---

## 12. Performance Considerations

- Route-based code splitting with `React.lazy` + `Suspense`
- TanStack Query caching reduces redundant requests
- Heavy pages (Analytics) load charts lazily
- Images (menu items, profile photos) use lazy loading
- Debounce on all search inputs (300ms)
- Skeleton loaders on initial data fetch (not spinners)

---

## 13. Accessibility

- All interactive elements keyboard-navigable
- `aria-label` on icon-only buttons
- Focus management in modals (trap focus, restore on close)
- Color contrast meets WCAG AA minimum
- Status communicated via text + color (never color alone)

---

## 14. Responsive Breakpoints

| Breakpoint | Layout |
|---|---|
| `< 768px` | Bottom nav, stacked content, full-screen modals |
| `768px – 1024px` | Collapsed sidebar (icon-only), condensed tables |
| `> 1024px` | Full sidebar, multi-column layouts |

---

*Document version: 1.0 — Chopmate Frontend*