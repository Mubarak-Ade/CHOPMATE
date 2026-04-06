import { useEffect, useState } from "react";
import { Navigate } from "react-router";

import { useGlobalContext } from "../context/GlobalContext";

export const InventoryPage = () => {
  const { authUser, inventoryItems, inventoryLoading, loadInventory, ownerRestaurants, updateInventoryRecord } =
    useGlobalContext();
  const [selectedRestaurantId, setSelectedRestaurantId] = useState("");

  useEffect(() => {
    if (!selectedRestaurantId && ownerRestaurants.length) {
      setSelectedRestaurantId(ownerRestaurants[0]._id);
    }
  }, [ownerRestaurants, selectedRestaurantId]);

  useEffect(() => {
    if (selectedRestaurantId) {
      loadInventory(selectedRestaurantId);
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
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand">Inventory</p>
            <h1 className="mt-3 font-['DM_Serif_Display'] text-5xl text-carbon-black">Ingredient control</h1>
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
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {inventoryItems.map((item) => {
            const low = Number(item.quantity) <= Number(item.lowStockThreshold);
            return (
              <article key={item._id} className="surface-card rounded-[1.5rem] p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-carbon-black">{item.name}</h2>
                  <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] ${low ? "bg-red-100 text-red-600" : "bg-emerald/10 text-emerald"}`}>
                    {low ? "Low stock" : "Healthy"}
                  </span>
                </div>
                <p className="mt-3 text-sm text-slate-grey">
                  {item.quantity} {item.unit} on hand · threshold {item.lowStockThreshold}
                </p>
                <div className="mt-5 flex gap-3">
                  <button
                    onClick={() => updateInventoryRecord(item._id, { quantity: Number(item.quantity) + 1 }, selectedRestaurantId)}
                    className="rounded-2xl bg-carbon-black px-4 py-3 text-sm font-semibold text-white"
                  >
                    Restock +1
                  </button>
                  <button
                    onClick={() =>
                      updateInventoryRecord(item._id, { quantity: Math.max(0, Number(item.quantity) - 1) }, selectedRestaurantId)
                    }
                    className="rounded-2xl bg-brand-muted px-4 py-3 text-sm font-semibold text-brand"
                  >
                    Deduct 1
                  </button>
                </div>
              </article>
            );
          })}
        </div>
        {inventoryLoading ? <p className="text-sm text-slate-grey">Refreshing inventory…</p> : null}
      </div>
    </div>
  );
};
