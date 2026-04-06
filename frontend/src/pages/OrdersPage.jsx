import { useEffect } from "react";
import { Link, Navigate } from "react-router";
import { useGlobalContext } from "../context/GlobalContext";

export const OrdersPage = () => {
  const { authUser, loadMyOrders, myOrders, myOrdersLoading } = useGlobalContext();

  useEffect(() => {
    if (authUser) {
      loadMyOrders();
    }
  }, [authUser]);

  if (!authUser) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fffdfa_0%,#f5efe7_100%)] px-6 py-10 lg:px-10">
      <div className="section-shell space-y-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand">Orders</p>
          <h1 className="mt-3 font-['DM_Serif_Display'] text-5xl text-carbon-black">Your order history</h1>
        </div>
        <div className="grid gap-5">
          {myOrdersLoading ? <p className="text-sm text-slate-grey">Loading orders...</p> : null}
          {myOrders.length ? (
            myOrders.map((order) => (
              <article key={order._id} className="surface-card rounded-[2rem] p-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-grey">
                      {order.restaurant?.name || "Restaurant"}
                    </p>
                    <h2 className="mt-2 text-2xl font-bold text-carbon-black">
                      Order #{String(order._id).slice(-6).toUpperCase()}
                    </h2>
                    <p className="mt-2 text-sm text-slate-grey">
                      Status: {order.status} · Payment: {order.paymentStatus}
                    </p>
                  </div>
                  <p className="text-2xl font-bold text-brand">
                    NGN {Number(order.totalAmount || 0).toLocaleString()}
                  </p>
                </div>
                <div className="mt-5 grid gap-3 md:grid-cols-2">
                  {(order.items || []).map((item) => (
                    <div key={`${order._id}-${item.menuItem}`} className="rounded-[1.3rem] bg-white p-4">
                      <p className="font-semibold text-carbon-black">{item.name}</p>
                      <p className="mt-1 text-sm text-slate-grey">
                        {item.quantity} x NGN {Number(item.price || 0).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </article>
            ))
          ) : (
            <div className="surface-card rounded-[2rem] p-6 text-sm text-slate-grey">
              No orders yet. <Link to="/" className="font-semibold text-brand">Start browsing restaurants.</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
