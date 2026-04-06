import { Link, Navigate } from "react-router";

import { useGlobalContext } from "../context/GlobalContext";

export const CartPage = () => {
  const { authUser, cart, clearCart, createOrder, updateCartQuantity } = useGlobalContext();

  if (!authUser) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="dashboard-shell px-6 py-8 lg:px-10">
      <div className="section-shell grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="space-y-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">Cart</p>
            <h1 className="mt-3 font-['DM_Serif_Display'] text-5xl text-carbon-black">Review your order</h1>
          </div>
          {(cart.items || []).map((item) => (
            <article key={item.menuItem} className="surface-card rounded-[1.5rem] p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-carbon-black">{item.name}</h2>
                  <p className="mt-2 text-sm text-slate-grey">NGN {Number(item.price).toLocaleString()} each</p>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => updateCartQuantity(item.menuItem, item.quantity - 1)} className="rounded-full bg-brand-muted px-3 py-2 text-sm font-semibold text-brand">-</button>
                  <span className="min-w-10 text-center font-semibold text-carbon-black">{item.quantity}</span>
                  <button onClick={() => updateCartQuantity(item.menuItem, item.quantity + 1)} className="rounded-full bg-carbon-black px-3 py-2 text-sm font-semibold text-white">+</button>
                </div>
              </div>
            </article>
          ))}
          {!cart.items?.length ? (
            <div className="surface-card rounded-[1.5rem] p-6 text-sm text-slate-grey">
              Your cart is empty. <Link to="/" className="font-semibold text-brand">Browse restaurants.</Link>
            </div>
          ) : null}
        </section>
        <aside className="surface-card rounded-[2rem] p-6">
          <h2 className="font-['DM_Serif_Display'] text-3xl text-carbon-black">Summary</h2>
          <div className="mt-6 space-y-3 text-sm text-slate-grey">
            <div className="flex items-center justify-between">
              <span>Items</span>
              <span>{(cart.items || []).reduce((sum, item) => sum + item.quantity, 0)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Total</span>
              <span className="font-semibold text-carbon-black">NGN {Number(cart.totalAmount || 0).toLocaleString()}</span>
            </div>
          </div>
          <button onClick={createOrder} disabled={!cart.items?.length} className="mt-6 w-full rounded-2xl bg-brand px-5 py-4 text-sm font-semibold text-white disabled:opacity-50">
            Checkout
          </button>
          <button onClick={clearCart} disabled={!cart.items?.length} className="mt-3 w-full rounded-2xl bg-brand-muted px-5 py-4 text-sm font-semibold text-brand disabled:opacity-50">
            Clear cart
          </button>
        </aside>
      </div>
    </div>
  );
};
