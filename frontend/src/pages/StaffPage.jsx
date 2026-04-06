import { useEffect, useMemo, useState } from "react";
import { Navigate } from "react-router";
import { useGlobalContext } from "../context/GlobalContext";

export const StaffPage = () => {
  const {
    authUser,
    currentSubscription,
    inviteStaff,
    loadCurrentSubscription,
    loadRoles,
    loadStaff,
    ownerRestaurants,
    roles,
    rolesLoading,
    staffLoading,
    staffMembers,
    subscriptionLoading,
    updateStaffRole,
    removeStaffMember,
  } = useGlobalContext();
  const [selectedRestaurantId, setSelectedRestaurantId] = useState("");
  const [status, setStatus] = useState("");
  const [inviteForm, setInviteForm] = useState({
    email: "",
    roleId: "",
  });

  useEffect(() => {
    loadRoles();
  }, []);

  useEffect(() => {
    if (!selectedRestaurantId && ownerRestaurants.length) {
      setSelectedRestaurantId(ownerRestaurants[0]._id);
    }
  }, [ownerRestaurants, selectedRestaurantId]);

  useEffect(() => {
    if (selectedRestaurantId) {
      loadStaff(selectedRestaurantId);
      loadCurrentSubscription(selectedRestaurantId);
    }
  }, [selectedRestaurantId]);

  const assignableRoles = useMemo(
    () => roles.filter((role) => role.name !== "owner"),
    [roles]
  );

  if (!authUser) {
    return <Navigate to="/login" replace />;
  }

  const handleInvite = async () => {
    setStatus("");
    try {
      await inviteStaff({
        restaurantId: selectedRestaurantId,
        email: inviteForm.email,
        roleId: inviteForm.roleId,
      });
      setInviteForm({ email: "", roleId: "" });
      setStatus("Invite sent.");
    } catch (error) {
      setStatus(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f7fbf8_0%,#fffdfa_45%,#eff5ef_100%)] px-6 py-8 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand">Staff Hub</p>
            <h1 className="mt-3 font-['DM_Serif_Display'] text-5xl text-carbon-black">Manage team access</h1>
          </div>
          <select
            value={selectedRestaurantId}
            onChange={(event) => setSelectedRestaurantId(event.target.value)}
            className="rounded-2xl border border-black/8 bg-white px-4 py-3 text-sm text-carbon-black"
          >
            <option value="">Select restaurant</option>
            {ownerRestaurants.map((restaurant) => (
              <option key={restaurant._id} value={restaurant._id}>
                {restaurant.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <section className="space-y-6">
            <div className="surface-card rounded-[2rem] p-6">
              <h2 className="font-['DM_Serif_Display'] text-3xl text-carbon-black">Subscription snapshot</h2>
              {subscriptionLoading ? <p className="mt-4 text-sm text-slate-grey">Loading subscription...</p> : null}
              {currentSubscription?.plan ? (
                <div className="mt-5 rounded-[1.5rem] border border-black/6 bg-white p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-grey">Active plan</p>
                  <h3 className="mt-2 text-2xl font-bold capitalize text-carbon-black">
                    {currentSubscription.plan.name}
                  </h3>
                  <p className="mt-2 text-sm text-slate-grey">
                    Status: {currentSubscription.subscription?.status || "fallback_free_plan"}
                  </p>
                </div>
              ) : (
                <p className="mt-4 text-sm text-slate-grey">Select a restaurant to see plan access.</p>
              )}
            </div>

            <div className="surface-card rounded-[2rem] p-6">
              <h2 className="font-['DM_Serif_Display'] text-3xl text-carbon-black">Invite teammate</h2>
              <div className="mt-5 grid gap-4">
                <input
                  value={inviteForm.email}
                  onChange={(event) =>
                    setInviteForm((current) => ({ ...current, email: event.target.value }))
                  }
                  placeholder="staff@restaurant.com"
                  className="rounded-2xl border border-black/8 bg-white px-4 py-3 text-sm text-carbon-black"
                />
                <select
                  value={inviteForm.roleId}
                  onChange={(event) =>
                    setInviteForm((current) => ({ ...current, roleId: event.target.value }))
                  }
                  className="rounded-2xl border border-black/8 bg-white px-4 py-3 text-sm text-carbon-black"
                >
                  <option value="">Choose role</option>
                  {assignableRoles.map((role) => (
                    <option key={role._id} value={role._id}>
                      {role.name}
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleInvite}
                  disabled={!selectedRestaurantId || !inviteForm.email || !inviteForm.roleId}
                  className="rounded-2xl bg-brand px-5 py-3 text-sm font-semibold text-white disabled:opacity-50"
                >
                  Send invite
                </button>
                {rolesLoading ? <p className="text-sm text-slate-grey">Loading roles...</p> : null}
                {status ? <p className="text-sm text-slate-grey">{status}</p> : null}
              </div>
            </div>
          </section>

          <section className="surface-card rounded-[2rem] p-6">
            <h2 className="font-['DM_Serif_Display'] text-3xl text-carbon-black">Current team</h2>
            <div className="mt-5 space-y-4">
              {staffLoading ? <p className="text-sm text-slate-grey">Loading staff...</p> : null}
              {staffMembers.map((member) => (
                <article key={member._id} className="rounded-[1.5rem] border border-black/6 bg-white p-5">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <p className="text-lg font-bold text-carbon-black">{member.user?.name || "Staff member"}</p>
                      <p className="mt-1 text-sm text-slate-grey">{member.user?.email}</p>
                      <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                        {member.role?.name}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <select
                        value={member.role?._id || ""}
                        onChange={(event) =>
                          updateStaffRole({
                            membershipId: member._id,
                            roleId: event.target.value,
                            restaurantId: selectedRestaurantId,
                          })
                        }
                        className="rounded-2xl border border-black/8 bg-white px-4 py-3 text-sm text-carbon-black"
                      >
                        {assignableRoles.map((role) => (
                          <option key={role._id} value={role._id}>
                            {role.name}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() =>
                          removeStaffMember({
                            membershipId: member._id,
                            restaurantId: selectedRestaurantId,
                          })
                        }
                        className="rounded-2xl border border-brand/20 bg-brand-muted px-4 py-3 text-sm font-semibold text-brand"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </article>
              ))}
              {!staffLoading && !staffMembers.length ? (
                <p className="text-sm text-slate-grey">No staff records yet for this restaurant.</p>
              ) : null}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
