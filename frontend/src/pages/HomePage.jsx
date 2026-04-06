import { useEffect, useState } from "react";
import { Link } from "react-router";

import { useGlobalContext } from "../context/GlobalContext";

export const HomePage = () => {
  const { authUser, bootstrap, loadRestaurants, recommendations, restaurants } = useGlobalContext();
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadRestaurants();
  }, []);

  return (
    <div className="dashboard-shell px-6 py-8 lg:px-10">
      <div className="section-shell space-y-10">
        <section className="surface-card overflow-hidden rounded-[2rem] p-8 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand">Chopmate</p>
              <h1 className="mt-4 max-w-4xl font-['DM_Serif_Display'] text-5xl text-carbon-black lg:text-6xl">
                A restaurant operating system with marketplace, staff, reservations, orders, inventory, analytics, and AI.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-grey">
                Built for busy kitchens that need fast scanning, clear priorities, and live operational feedback.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to={authUser ? "/dashboard" : "/login"} className="rounded-2xl bg-brand px-6 py-3 text-sm font-semibold text-white">
                  {authUser ? "Open dashboard" : "Login to demo"}
                </Link>
                <Link to="/cart" className="rounded-2xl border border-black/10 bg-white px-6 py-3 text-sm font-semibold text-carbon-black">
                  Open cart
                </Link>
              </div>
            </div>
            <div className="rounded-[1.8rem] bg-carbon-black p-6 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60">Demo credentials</p>
              <div className="mt-5 space-y-3">
                {(bootstrap?.demoUsers || []).map((user) => (
                  <div key={user.email} className="rounded-[1.2rem] bg-white/8 p-4">
                    <p className="font-semibold capitalize">{user.role}</p>
                    <p className="mt-1 text-sm text-white/75">{user.email}</p>
                    <p className="text-sm text-white/55">password: {user.password}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {authUser && recommendations.restaurants?.length ? (
          <section>
            <div className="mb-4">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">Recommended</p>
              <h2 className="mt-2 font-['DM_Serif_Display'] text-4xl text-carbon-black">Your likely next choices</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {recommendations.restaurants.map((restaurant) => (
                <Link key={restaurant._id} to={`/restaurants/${restaurant._id}`} className="surface-card rounded-[1.4rem] p-5">
                  <p className="text-xs uppercase tracking-[0.16em] text-slate-grey">{restaurant.cuisine.join(" · ")}</p>
                  <h3 className="mt-3 text-2xl font-bold text-carbon-black">{restaurant.name}</h3>
                  <p className="mt-2 text-sm text-slate-grey">{restaurant.description}</p>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <section>
          <div className="mb-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">Marketplace</p>
              <h2 className="mt-2 font-['DM_Serif_Display'] text-4xl text-carbon-black">Discover restaurants</h2>
            </div>
            <div className="flex gap-3">
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search restaurants"
                className="rounded-2xl border border-black/8 bg-white px-4 py-3 text-sm text-carbon-black"
              />
              <button onClick={() => loadRestaurants(search)} className="rounded-2xl bg-carbon-black px-5 py-3 text-sm font-semibold text-white">
                Search
              </button>
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {restaurants.map((restaurant) => (
              <article key={restaurant._id} className="surface-card rounded-[1.6rem] p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-grey">
                  {(restaurant.cuisine || []).join(" · ")}
                </p>
                <h3 className="mt-3 text-2xl font-bold text-carbon-black">{restaurant.name}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-grey">{restaurant.description}</p>
                <p className="mt-4 text-sm text-slate-grey">Rating {restaurant.rating}</p>
                <Link to={`/restaurants/${restaurant._id}`} className="mt-5 inline-flex rounded-2xl bg-brand px-4 py-3 text-sm font-semibold text-white">
                  View restaurant
                </Link>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
