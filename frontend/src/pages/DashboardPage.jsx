import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router";

import { useGlobalContext } from "../context/GlobalContext";

export const DashboardPage = () => {
  const {
    analytics,
    analyticsLoading,
    authUser,
    loadAiInsights,
    loadAnalytics,
    loadCurrentSubscription,
    notifications,
    ownerRestaurants,
    currentSubscription,
    smartNotifications,
  } = useGlobalContext();
  const [selectedRestaurantId, setSelectedRestaurantId] = useState("");

  useEffect(() => {
    if (!selectedRestaurantId && ownerRestaurants.length) {
      setSelectedRestaurantId(ownerRestaurants[0]._id);
    }
  }, [ownerRestaurants, selectedRestaurantId]);

  useEffect(() => {
    if (selectedRestaurantId) {
      loadAnalytics(selectedRestaurantId);
      loadCurrentSubscription(selectedRestaurantId);
      loadAiInsights(selectedRestaurantId).catch(() => null);
    }
  }, [selectedRestaurantId]);

  if (!authUser) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="dashboard-shell px-6 py-8 lg:px-10">
      <div className="section-shell space-y-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand">Control Center</p>
            <h1 className="mt-3 font-['DM_Serif_Display'] text-5xl text-carbon-black">Restaurant operations</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-grey">
              Calm, dense, role-aware dashboards for the lunch rush and everything around it.
            </p>
          </div>
          {ownerRestaurants.length ? (
            <select
              value={selectedRestaurantId}
              onChange={(event) => setSelectedRestaurantId(event.target.value)}
              className="rounded-2xl border border-black/8 bg-white px-4 py-3 text-sm text-carbon-black"
            >
              {ownerRestaurants.map((restaurant) => (
                <option key={restaurant._id} value={restaurant._id}>
                  {restaurant.name}
                </option>
              ))}
            </select>
          ) : null}
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {[
            { label: "Revenue", value: `NGN ${Number(analytics?.summary?.revenue || 0).toLocaleString()}` },
            { label: "Total Orders", value: analytics?.summary?.totalOrders || 0 },
            { label: "Active Reservations", value: analytics?.summary?.activeReservations || 0 },
            { label: "Low Stock Alerts", value: analytics?.summary?.lowStockItems || 0 },
          ].map((card) => (
            <div key={card.label} className="surface-card rounded-[1.5rem] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-grey">{card.label}</p>
              <p className="mt-4 text-3xl font-bold text-carbon-black">{card.value}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <section className="surface-card rounded-[2rem] p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-['DM_Serif_Display'] text-3xl text-carbon-black">Top sellers</h2>
              {analyticsLoading ? <span className="text-sm text-slate-grey">Refreshing…</span> : null}
            </div>
            <div className="mt-6 space-y-3">
              {(analytics?.charts?.topItems || []).map((item) => (
                <div key={item.name} className="flex items-center justify-between rounded-[1.2rem] bg-white p-4">
                  <span className="font-semibold text-carbon-black">{item.name}</span>
                  <span className="text-sm text-slate-grey">{item.quantity} sold</span>
                </div>
              ))}
              {!analytics?.charts?.topItems?.length ? (
                <p className="text-sm text-slate-grey">No paid orders yet.</p>
              ) : null}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/orders" className="rounded-2xl bg-carbon-black px-4 py-3 text-sm font-semibold text-white">
                View orders
              </Link>
              <Link to="/reservations" className="rounded-2xl bg-brand-muted px-4 py-3 text-sm font-semibold text-brand">
                Reservation flow
              </Link>
              <Link to="/analytics" className="rounded-2xl bg-brand px-4 py-3 text-sm font-semibold text-white">
                Analytics
              </Link>
            </div>
          </section>

          <section className="space-y-6">
            <div className="surface-card rounded-[2rem] p-6">
              <h2 className="font-['DM_Serif_Display'] text-3xl text-carbon-black">Current plan</h2>
              <div className="mt-5 rounded-[1.4rem] bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-grey">Subscription</p>
                <p className="mt-2 text-2xl font-bold capitalize text-carbon-black">
                  {currentSubscription?.plan?.name || "free"}
                </p>
                <p className="mt-2 text-sm text-slate-grey">
                  {(currentSubscription?.plan?.features || []).join(" · ")}
                </p>
              </div>
            </div>

            <div className="surface-card rounded-[2rem] p-6">
              <h2 className="font-['DM_Serif_Display'] text-3xl text-carbon-black">Smart prompts</h2>
              <div className="mt-5 space-y-3">
                {smartNotifications.map((notice, index) => (
                  <div key={`${notice.type}-${index}`} className="rounded-[1.2rem] bg-white p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">{notice.type}</p>
                    <p className="mt-2 text-sm text-slate-grey">{notice.message}</p>
                  </div>
                ))}
                {!smartNotifications.length ? (
                  <p className="text-sm text-slate-grey">AI prompts will appear as your restaurant data grows.</p>
                ) : null}
              </div>
            </div>

            <div className="surface-card rounded-[2rem] p-6">
              <h2 className="font-['DM_Serif_Display'] text-3xl text-carbon-black">Realtime feed</h2>
              <div className="mt-5 space-y-3">
                {notifications.slice(0, 5).map((entry, index) => (
                  <div key={`${entry.timestamp}-${index}`} className="rounded-[1.2rem] bg-white p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">{entry.type}</p>
                    <p className="mt-2 text-sm text-slate-grey">{entry.channel}</p>
                  </div>
                ))}
                {!notifications.length ? <p className="text-sm text-slate-grey">Waiting for live activity.</p> : null}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
