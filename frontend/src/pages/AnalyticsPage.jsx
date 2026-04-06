import { useEffect, useState } from "react";
import { Navigate } from "react-router";

import { useGlobalContext } from "../context/GlobalContext";

export const AnalyticsPage = () => {
  const {
    analytics,
    analyticsLoading,
    authUser,
    customerSegments,
    demandPrediction,
    loadAiInsights,
    loadAnalytics,
    menuInsights,
    ownerRestaurants,
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
      loadAiInsights(selectedRestaurantId);
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
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand">Analytics & AI</p>
            <h1 className="mt-3 font-['DM_Serif_Display'] text-5xl text-carbon-black">Signals and decisions</h1>
          </div>
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
        </div>

        <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
          <section className="surface-card rounded-[2rem] p-6">
            <h2 className="font-['DM_Serif_Display'] text-3xl text-carbon-black">Menu insights</h2>
            <div className="mt-5 space-y-3">
              {menuInsights.map((item) => (
                <article key={item.menuItemId} className="rounded-[1.2rem] bg-white p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-semibold text-carbon-black">{item.name}</p>
                      <p className="mt-1 text-sm text-slate-grey">{item.orders} tracked orders</p>
                    </div>
                    <span className="rounded-full bg-brand-muted px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-brand">
                      {item.suggestion}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="surface-card rounded-[2rem] p-6">
            <h2 className="font-['DM_Serif_Display'] text-3xl text-carbon-black">Demand prediction</h2>
            <div className="mt-5 space-y-3">
              {(demandPrediction.peakHours || []).map((entry) => (
                <div key={entry.hour} className="rounded-[1.2rem] bg-white p-4">
                  <p className="font-semibold text-carbon-black">{entry.hour}</p>
                  <p className="mt-1 text-sm text-slate-grey">{entry.count} observed paid orders</p>
                </div>
              ))}
              {!demandPrediction.peakHours?.length ? (
                <p className="text-sm text-slate-grey">Not enough paid-order history yet.</p>
              ) : null}
            </div>
          </section>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
          <section className="surface-card rounded-[2rem] p-6">
            <h2 className="font-['DM_Serif_Display'] text-3xl text-carbon-black">Customer segments</h2>
            <div className="mt-5 space-y-3">
              {customerSegments.map((segment) => (
                <article key={segment.user?._id || segment.segment} className="rounded-[1.2rem] bg-white p-4">
                  <p className="font-semibold text-carbon-black">{segment.user?.name || "Guest"}</p>
                  <p className="mt-1 text-sm capitalize text-brand">{segment.segment.replace("_", " ")}</p>
                  <p className="mt-1 text-sm text-slate-grey">
                    {segment.metrics.orders} orders · NGN {segment.metrics.totalSpent.toLocaleString()}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="surface-card rounded-[2rem] p-6">
            <h2 className="font-['DM_Serif_Display'] text-3xl text-carbon-black">Smart notifications</h2>
            <div className="mt-5 space-y-3">
              {smartNotifications.map((notice, index) => (
                <div key={`${notice.type}-${index}`} className="rounded-[1.2rem] bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">{notice.type}</p>
                  <p className="mt-2 text-sm text-slate-grey">{notice.message}</p>
                </div>
              ))}
            </div>
            {analyticsLoading ? <p className="mt-4 text-sm text-slate-grey">Refreshing analytics…</p> : null}
            {analytics?.summary ? (
              <div className="mt-6 rounded-[1.2rem] border border-black/6 bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-grey">Snapshot</p>
                <p className="mt-2 text-sm text-slate-grey">
                  Avg order value: NGN {Number(analytics.summary.averageOrderValue || 0).toLocaleString()}
                </p>
              </div>
            ) : null}
          </section>
        </div>
      </div>
    </div>
  );
};
