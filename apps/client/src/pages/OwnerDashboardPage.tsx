import { Link } from "react-router-dom";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Bell,
  BookOpen,
  Boxes,
  CalendarPlus,
  ChartNoAxesCombined,
  CircleHelp,
  Clock3,
  CreditCard,
  LayoutDashboard,
  LogIn,
  Search,
  Settings,
  ShoppingBag,
  Star,
  Store,
  ThumbsUp,
  UserRoundCog,
  Users,
  Utensils,
  XCircle,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { useOnboardingState } from "../features/onboarding/hooks/useOnboarding";
import { cn } from "../lib/utils";

const salesTrend = [
  { day: "Mon", sales: 780, orders: 28 },
  { day: "Tue", sales: 1120, orders: 34 },
  { day: "Wed", sales: 1540, orders: 46 },
  { day: "Thu", sales: 1320, orders: 39 },
  { day: "Fri", sales: 1960, orders: 58 },
  { day: "Sat", sales: 1730, orders: 51 },
  { day: "Sun", sales: 2180, orders: 64 },
];

const peakHours = [
  { hour: "12 PM", value: 92, tone: "bg-emerald-500" },
  { hour: "2 PM", value: 45, tone: "bg-sky-500" },
  { hour: "7 PM", value: 100, tone: "bg-brand" },
];

const orderVolume = [
  { name: "Delivery", value: 55, color: "#e85d26" },
  { name: "Pickup", value: 30, color: "#94a3b8" },
  { name: "Dine-in", value: 15, color: "#22c55e" },
];

const activityFeed = [
  {
    title: "New order #4521 received",
    meta: "2 mins ago • Kitchen",
    icon: ShoppingBag,
    tone: "text-brand",
    bg: "bg-brand-muted",
  },
  {
    title: "New 5-star review from Sarah",
    meta: "15 mins ago • Reviews",
    icon: ThumbsUp,
    tone: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    title: "Order #4510 cancelled by customer",
    meta: "42 mins ago • Front Desk",
    icon: XCircle,
    tone: "text-red-600",
    bg: "bg-red-50",
  },
  {
    title: "Staff 'Marco' logged in",
    meta: "1 hour ago • Terminal 2",
    icon: LogIn,
    tone: "text-slate-600",
    bg: "bg-slate-100",
  },
];

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "Live Orders", icon: Utensils },
  { label: "Menu Editor", icon: BookOpen },
  { label: "Staff Registry", icon: Users },
  { label: "Inventory", icon: Boxes },
  { label: "Analytics", icon: ChartNoAxesCombined },
];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

export const OwnerDashboardPage = () => {
  const { data } = useOnboardingState();
  const restaurant = data?.restaurant;
  const restaurantName = restaurant?.name ?? "The Golden Grill";
  const customerCount = 128 + (data?.progress.menuItemCount ?? 0);
  const rating = restaurant?.rating && restaurant.rating > 0 ? restaurant.rating : 4.8;
  const totalOrders = salesTrend.reduce((sum, item) => sum + item.orders, 0);

  const metrics = [
    {
      label: "Today's Orders",
      value: "42",
      delta: "+12%",
      icon: ShoppingBag,
      accent: "text-brand",
      bg: "bg-brand-muted",
    },
    {
      label: "Revenue",
      value: formatCurrency(1250),
      delta: "+8.2%",
      icon: CreditCard,
      accent: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "Pending Orders",
      value: "5",
      delta: "Action req.",
      icon: CalendarPlus,
      accent: "text-amber-600",
      bg: "bg-amber-50",
      alert: true,
    },
    {
      label: "Top Selling Item",
      value: "Spicy Jollof Rice",
      delta: "96 sold",
      icon: Star,
      accent: "text-brand",
      bg: "bg-brand-muted",
      compact: true,
    },
    {
      label: "Customer Count",
      value: String(customerCount),
      delta: "85%",
      icon: Users,
      accent: "text-sky-600",
      bg: "bg-sky-50",
    },
    {
      label: "Average Rating",
      value: `${rating.toFixed(1)} /5`,
      delta: "☆☆",
      icon: Star,
      accent: "text-emerald-600",
      bg: "bg-emerald-50",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f7f4f1] text-[#1f1714] lg:grid lg:grid-cols-[320px_minmax(0,1fr)]">
      <aside className="flex flex-col border-r border-[#eadfd9] bg-white px-4 py-5 lg:min-h-screen">
        <Link className="flex items-center gap-4" to="/dashboard">
          <span className="grid size-12 place-items-center rounded-lg bg-brand text-white">
            <Utensils className="size-6" />
          </span>
          <span>
            <span className="block text-2xl font-semibold">{restaurantName}</span>
            <span className="text-sm text-muted-foreground">Main Branch</span>
          </span>
        </Link>

        <nav className="mt-10 grid gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                className={cn(
                  "flex h-12 items-center gap-4 rounded-lg px-4 text-left text-lg transition-colors",
                  item.active
                    ? "bg-brand-muted text-brand"
                    : "text-slate-600 hover:bg-muted hover:text-foreground",
                )}
                key={item.label}
                type="button"
              >
                <Icon className="size-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="mt-auto grid gap-4 border-t border-[#eadfd9] pt-5">
          <Button className="h-12 bg-brand text-white hover:bg-brand/90" type="button">
            <CalendarPlus className="mr-2 size-4" />
            New Reservation
          </Button>
          <button className="flex items-center gap-4 px-4 py-2 text-lg text-slate-600" type="button">
            <Settings className="size-5" />
            Settings
          </button>
          <button className="flex items-center gap-4 px-4 py-2 text-lg text-slate-600" type="button">
            <CircleHelp className="size-5" />
            Support
          </button>
        </div>
      </aside>

      <div className="min-w-0">
        <header className="flex flex-col gap-5 border-b border-[#eadfd9] bg-white/90 px-5 py-5 backdrop-blur xl:flex-row xl:items-center xl:justify-between xl:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <h1 className="text-3xl font-bold text-brand">CHOPMATE</h1>
            <label className="relative block w-full md:w-[320px]">
              <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-stone-500" />
              <input
                className="h-10 w-full rounded-full border border-[#eadfd9] bg-[#faf8f6] pl-11 pr-4 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-brand/50"
                placeholder="Search orders, menu..."
                type="search"
              />
            </label>
          </div>

          <div className="flex items-center justify-between gap-5 md:justify-end">
            <button aria-label="Notifications" className="text-slate-600" type="button">
              <Bell className="size-6" />
            </button>
            <button aria-label="Help" className="text-slate-600" type="button">
              <CircleHelp className="size-6" />
            </button>
            <div className="hidden h-10 w-px bg-[#eadfd9] md:block" />
            <div className="text-right">
              <p className="font-semibold">Alex Manager</p>
              <p className="text-sm text-muted-foreground">General Manager</p>
            </div>
            <div className="grid size-12 place-items-center rounded-full border-2 border-brand bg-brand-muted">
              <UserRoundCog className="size-6 text-brand" />
            </div>
          </div>
        </header>

        <main className="grid gap-6 px-5 py-6 xl:grid-cols-[386px_minmax(0,1fr)] xl:px-8">
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
            {metrics.map((metric) => {
              const Icon = metric.icon;

              return (
                <article
                  className="min-h-[157px] rounded-lg border border-[#eadfd9] bg-white p-5 shadow-sm"
                  key={metric.label}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className={cn("grid size-11 place-items-center rounded-lg", metric.bg)}>
                      <Icon className={cn("size-5", metric.accent)} />
                    </span>
                    <span
                      className={cn(
                        "text-sm font-semibold",
                        metric.alert
                          ? "rounded-full bg-red-600 px-3 py-1 text-[11px] uppercase text-white"
                          : "text-emerald-600",
                      )}
                    >
                      {metric.delta}
                    </span>
                  </div>
                  <p className="mt-5 text-xs font-medium uppercase text-muted-foreground">{metric.label}</p>
                  <p className={cn("mt-1 font-bold", metric.compact ? "text-base" : "text-3xl")}>
                    {metric.value}
                  </p>
                </article>
              );
            })}
          </section>

          <section className="grid gap-6">
            <article className="rounded-lg border border-[#eadfd9] bg-white p-5 shadow-sm">
              <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <ChartNoAxesCombined className="size-6 text-brand" />
                  <h2 className="text-2xl font-semibold">Sales Trends</h2>
                </div>
                <select
                  className="h-10 rounded-lg border border-[#eadfd9] bg-[#faf8f6] px-4 text-sm text-foreground outline-none"
                  defaultValue="7"
                >
                  <option value="7">Last 7 Days</option>
                  <option value="30">Last 30 Days</option>
                </select>
              </div>
              <div className="h-48">
                <ResponsiveContainer height="100%" width="100%">
                  <AreaChart data={salesTrend}>
                    <defs>
                      <linearGradient id="salesFill" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="5%" stopColor="#e85d26" stopOpacity={0.34} />
                        <stop offset="95%" stopColor="#e85d26" stopOpacity={0.04} />
                      </linearGradient>
                    </defs>
                    <XAxis
                      axisLine={false}
                      dataKey="day"
                      tick={{ fill: "#78716c", fontSize: 13 }}
                      tickLine={false}
                    />
                    <YAxis hide />
                    <Tooltip
                      contentStyle={{
                        background: "#ffffff",
                        border: "1px solid #eadfd9",
                        borderRadius: 8,
                        color: "#1f1714",
                      }}
                      formatter={(value) => [formatCurrency(Number(value)), "Sales"]}
                    />
                    <Area
                      dataKey="sales"
                      fill="url(#salesFill)"
                      stroke="#e85d26"
                      strokeWidth={3}
                      type="monotone"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </article>

            <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
              <article className="rounded-lg border border-[#eadfd9] bg-white p-5 shadow-sm">
                <div className="mb-6 flex items-center gap-3">
                  <Clock3 className="size-6 text-emerald-600" />
                  <h2 className="text-xl font-semibold">Peak Hours</h2>
                </div>
                <div className="grid gap-5">
                  {peakHours.map((item) => (
                    <div className="grid grid-cols-[46px_1fr_46px] items-center gap-3" key={item.hour}>
                      <span className="text-sm text-muted-foreground">{item.hour}</span>
                      <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className={cn("h-full rounded-full", item.tone)}
                          style={{ width: `${item.value}%` }}
                        />
                      </div>
                      <span className="text-right text-sm font-bold">
                        {item.value === 100 ? "MAX" : `${item.value}%`}
                      </span>
                    </div>
                  ))}
                </div>
              </article>

              <article className="rounded-lg border border-[#eadfd9] bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-center gap-3">
                  <ChartNoAxesCombined className="size-6 text-slate-500" />
                  <h2 className="text-xl font-semibold">Order Volume</h2>
                </div>
                <div className="grid gap-4 sm:grid-cols-[130px_1fr] sm:items-center">
                  <div className="relative h-32">
                    <ResponsiveContainer height="100%" width="100%">
                      <PieChart>
                        <Pie
                          cx="50%"
                          cy="50%"
                          data={orderVolume}
                          dataKey="value"
                          innerRadius={42}
                          outerRadius={58}
                          paddingAngle={2}
                          stroke="none"
                        >
                          {orderVolume.map((entry) => (
                            <Cell fill={entry.color} key={entry.name} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 grid place-items-center text-center text-sm font-bold">
                      <span>
                        {totalOrders}
                        <span className="block text-xs">Total</span>
                      </span>
                    </div>
                  </div>
                  <div className="grid gap-3">
                    {orderVolume.map((entry) => (
                      <div className="grid grid-cols-[1fr_48px] items-center gap-3 text-sm" key={entry.name}>
                        <span className="flex items-center gap-2">
                          <span className="size-3 rounded-full" style={{ backgroundColor: entry.color }} />
                          {entry.name}
                        </span>
                        <span className="text-right font-bold">{entry.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            </div>

            <article className="rounded-lg border border-[#eadfd9] bg-white p-5 shadow-sm">
              <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <Store className="size-5 text-brand" />
                  <h2 className="text-xl font-semibold">Order Volume by Day</h2>
                </div>
                <span className="text-sm text-muted-foreground">Orders compared with sales velocity</span>
              </div>
              <div className="h-52">
                <ResponsiveContainer height="100%" width="100%">
                  <BarChart data={salesTrend}>
                    <XAxis
                      axisLine={false}
                      dataKey="day"
                      tick={{ fill: "#78716c", fontSize: 13 }}
                      tickLine={false}
                    />
                    <YAxis hide />
                    <Tooltip
                      contentStyle={{
                        background: "#ffffff",
                        border: "1px solid #eadfd9",
                        borderRadius: 8,
                        color: "#1f1714",
                      }}
                    />
                    <Bar dataKey="orders" fill="#e85d26" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </article>
          </section>

          <section className="rounded-lg border border-[#eadfd9] bg-white shadow-sm xl:col-span-2">
            <div className="flex items-center justify-between border-b border-[#eadfd9] px-5 py-5">
              <div className="flex items-center gap-3">
                <span className="size-3 rounded-full bg-brand" />
                <h2 className="text-xl font-semibold">Live Activity</h2>
              </div>
              <button className="text-sm font-semibold text-brand" type="button">
                View All
              </button>
            </div>
            <div className="grid gap-5 px-5 py-5">
              {activityFeed.map((activity) => {
                const Icon = activity.icon;

                return (
                  <div className="grid grid-cols-[40px_1fr] gap-4" key={activity.title}>
                    <span className={cn("grid size-10 place-items-center rounded-full", activity.bg)}>
                      <Icon className={cn("size-5", activity.tone)} />
                    </span>
                    <div>
                      <p className="text-lg">
                        <span className={cn("font-semibold", activity.tone)}>{activity.title.split(" ")[0]}</span>{" "}
                        {activity.title.split(" ").slice(1).join(" ")}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">{activity.meta}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};
