import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router";
import { Heart, Save, UserRound } from "lucide-react";
import { useGlobalContext } from "../context/GlobalContext";
import { Input } from "../components/custom/form/Input";
import { Icon } from "../components/custom/Icon";

export const AccountCenterPage = () => {
  const {
    authUser,
    profileLoading,
    restaurants,
    toggleFavoriteRestaurant,
    updateUserProfile,
    userProfile,
  } = useGlobalContext();
  const [form, setForm] = useState({
    name: "",
    isVerified: false,
  });
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (userProfile) {
      setForm({
        name: userProfile.name || "",
        isVerified: Boolean(userProfile.isVerified),
      });
    }
  }, [userProfile]);

  if (!authUser) {
    return <Navigate to="/login" replace />;
  }

  const favorites = userProfile?.favorites || [];
  const recommended = restaurants.filter(
    (restaurant) =>
      !favorites.some((favorite) => String(favorite._id) === String(restaurant._id))
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("");

    try {
      await updateUserProfile({
        name: form.name,
        isVerified: form.isVerified,
      });
      setStatus("Account updated.");
    } catch (error) {
      setStatus(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fffdfa_0%,#f5efe7_100%)] px-6 py-10 lg:px-10">
      <div className="section-shell space-y-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand">Account Center</p>
          <h1 className="mt-3 font-['DM_Serif_Display'] text-5xl text-carbon-black">Your profile and favorites</h1>
        </div>

        <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
          <section className="surface-card rounded-[2rem] p-6">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-brand-muted text-brand">
              <Icon icon={UserRound} size={24} />
            </div>
            <form onSubmit={handleSubmit} className="mt-5">
              <Input
                name="name"
                label="Full Name"
                value={form.name}
                onChange={(event) =>
                  setForm((current) => ({ ...current, name: event.target.value }))
                }
              />
              <Input
                name="email"
                label="Email"
                value={userProfile?.email || authUser.email || ""}
                readOnly
                className="cursor-not-allowed opacity-80"
              />
              <label className="mt-5 flex items-center gap-3 rounded-2xl border border-black/8 bg-white px-4 py-4 text-sm font-semibold text-carbon-black">
                <input
                  type="checkbox"
                  checked={form.isVerified}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, isVerified: event.target.checked }))
                  }
                />
                Mark profile as verified
              </label>
              <button
                type="submit"
                className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-brand px-5 py-3 text-sm font-semibold text-white"
              >
                <Icon icon={Save} size={16} />
                Save Changes
              </button>
            </form>
            {status ? <p className="mt-4 text-sm text-slate-grey">{status}</p> : null}
            {profileLoading ? <p className="mt-3 text-sm text-slate-grey">Refreshing profile...</p> : null}
          </section>

          <section className="space-y-6">
            <div className="surface-card rounded-[2rem] p-6">
              <div className="flex items-center justify-between">
                <h2 className="font-['DM_Serif_Display'] text-3xl text-carbon-black">Saved restaurants</h2>
                <span className="rounded-full bg-brand-muted px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-brand">
                  {favorites.length} favorites
                </span>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {favorites.length ? (
                  favorites.map((restaurant) => (
                    <article key={restaurant._id} className="rounded-[1.5rem] border border-black/6 bg-white p-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-grey">
                        {(restaurant.cuisine || []).join(" · ") || "Restaurant"}
                      </p>
                      <h3 className="mt-2 text-2xl font-bold text-carbon-black">{restaurant.name}</h3>
                      <p className="mt-2 text-sm text-slate-grey">Rating {restaurant.rating || 0}</p>
                      <div className="mt-5 flex gap-3">
                        <Link
                          to={`/restaurants/${restaurant._id}`}
                          className="rounded-2xl bg-carbon-black px-4 py-3 text-sm font-semibold text-white"
                        >
                          View
                        </Link>
                        <button
                          onClick={() => toggleFavoriteRestaurant(restaurant._id)}
                          className="rounded-2xl border border-brand/20 bg-brand-muted px-4 py-3 text-sm font-semibold text-brand"
                        >
                          Remove
                        </button>
                      </div>
                    </article>
                  ))
                ) : (
                  <p className="text-sm text-slate-grey">No favorites yet.</p>
                )}
              </div>
            </div>

            <div className="surface-card rounded-[2rem] p-6">
              <h2 className="font-['DM_Serif_Display'] text-3xl text-carbon-black">Discover more</h2>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {recommended.slice(0, 4).map((restaurant) => (
                  <article key={restaurant._id} className="rounded-[1.5rem] border border-black/6 bg-white p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-xl font-bold text-carbon-black">{restaurant.name}</h3>
                        <p className="mt-2 text-sm text-slate-grey">
                          {(restaurant.cuisine || []).join(" · ") || "Restaurant"}
                        </p>
                      </div>
                      <button
                        onClick={() => toggleFavoriteRestaurant(restaurant._id)}
                        className="rounded-full bg-brand-muted p-3 text-brand"
                      >
                        <Icon icon={Heart} size={16} />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
