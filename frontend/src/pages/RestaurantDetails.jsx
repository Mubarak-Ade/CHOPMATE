import { useEffect, useState } from "react";
import { Heart, MapPin, Phone, Star } from "lucide-react";
import { Link, useParams } from "react-router";

import { useGlobalContext } from "../context/GlobalContext";

export default function RestaurantDetails() {
  const { addToCart, authUser, loadRestaurantDetails, selectedRestaurant, toggleFavoriteRestaurant, userProfile } =
    useGlobalContext();
  const { id } = useParams();
  const [status, setStatus] = useState("");

  useEffect(() => {
    loadRestaurantDetails(id);
  }, [id]);

  if (!selectedRestaurant) {
    return <div className="px-6 py-10 text-sm text-slate-grey">Loading restaurant…</div>;
  }

  const favoriteIds = (userProfile?.favorites || []).map((item) => item._id);
  const isFavorite = favoriteIds.includes(selectedRestaurant._id);

  const handleAddToCart = async (menuItemId) => {
    try {
      await addToCart(menuItemId, 1);
      setStatus("Added to cart.");
    } catch (error) {
      setStatus(error.message);
    }
  };

  return (
    <div className="dashboard-shell px-6 py-8 lg:px-10">
      <div className="section-shell space-y-8">
        <section className="surface-card rounded-[2rem] p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
                {(selectedRestaurant.cuisine || []).join(" · ")}
              </p>
              <h1 className="mt-3 font-['DM_Serif_Display'] text-5xl text-carbon-black">{selectedRestaurant.name}</h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-slate-grey">{selectedRestaurant.description}</p>
              <div className="mt-5 flex flex-wrap gap-4 text-sm text-slate-grey">
                <span className="inline-flex items-center gap-2"><Star size={16} className="text-brand" />{selectedRestaurant.rating}</span>
                <span className="inline-flex items-center gap-2"><MapPin size={16} className="text-brand" />{selectedRestaurant.address}</span>
                <span className="inline-flex items-center gap-2"><Phone size={16} className="text-brand" />{selectedRestaurant.phone}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              {authUser ? (
                <button onClick={() => toggleFavoriteRestaurant(selectedRestaurant._id)} className="rounded-2xl bg-brand-muted px-4 py-3 text-sm font-semibold text-brand">
                  <span className="inline-flex items-center gap-2"><Heart size={16} />{isFavorite ? "Saved" : "Save"}</span>
                </button>
              ) : null}
              <Link to="/reservations" className="rounded-2xl bg-carbon-black px-4 py-3 text-sm font-semibold text-white">Reserve</Link>
              <Link to="/cart" className="rounded-2xl bg-brand px-4 py-3 text-sm font-semibold text-white">Cart</Link>
            </div>
          </div>
        </section>

        <section className="surface-card rounded-[2rem] p-8">
          <div className="flex items-center justify-between">
            <h2 className="font-['DM_Serif_Display'] text-4xl text-carbon-black">Menu</h2>
            <p className="text-sm text-slate-grey">{selectedRestaurant.menuItems?.length || 0} items</p>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {(selectedRestaurant.menuItems || []).map((item) => (
              <article key={item._id} className="rounded-[1.4rem] border border-black/6 bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-grey">{item.category}</p>
                <h3 className="mt-2 text-2xl font-bold text-carbon-black">{item.name}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-grey">{item.description}</p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-xl font-bold text-brand">NGN {Number(item.price).toLocaleString()}</span>
                  <button
                    onClick={() => handleAddToCart(item._id)}
                    disabled={!authUser}
                    className="rounded-2xl bg-carbon-black px-4 py-3 text-sm font-semibold text-white disabled:opacity-50"
                  >
                    Add to cart
                  </button>
                </div>
              </article>
            ))}
          </div>
          {status ? <p className="mt-4 text-sm text-slate-grey">{status}</p> : null}
        </section>
      </div>
    </div>
  );
}
