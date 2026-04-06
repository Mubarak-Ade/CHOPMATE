import { useEffect, useMemo, useState } from "react";
import { Navigate } from "react-router";
import { useGlobalContext } from "../context/GlobalContext";

const reservationStatuses = ["confirmed", "cancelled", "completed"];

export const ReservationsPage = () => {
  const {
    authUser,
    cancelReservation,
    createReservation,
    getReservationAvailability,
    loadMyReservations,
    loadRestaurantReservations,
    myReservations,
    myReservationsLoading,
    ownerRestaurants,
    restaurants,
    restaurantReservations,
    restaurantReservationsLoading,
    updateReservationStatus,
  } = useGlobalContext();
  const [selectedRestaurantId, setSelectedRestaurantId] = useState("");
  const [availability, setAvailability] = useState([]);
  const [status, setStatus] = useState("");
  const [form, setForm] = useState({
    restaurantId: "",
    date: "",
    guests: 2,
    startTime: "",
  });

  useEffect(() => {
    if (authUser) {
      loadMyReservations();
    }
  }, [authUser]);

  useEffect(() => {
    if (!selectedRestaurantId && ownerRestaurants.length) {
      setSelectedRestaurantId(ownerRestaurants[0]._id);
    }
  }, [ownerRestaurants, selectedRestaurantId]);

  useEffect(() => {
    if (selectedRestaurantId) {
      loadRestaurantReservations(selectedRestaurantId);
    }
  }, [selectedRestaurantId]);

  const canCheckAvailability = useMemo(
    () => form.restaurantId && form.date && form.guests,
    [form]
  );

  if (!authUser) {
    return <Navigate to="/login" replace />;
  }

  const handleAvailability = async () => {
    setStatus("");
    try {
      const result = await getReservationAvailability(form);
      setAvailability(result.availableSlots || []);
      if (!result.availableSlots?.length) {
        setStatus("No slots available for that date.");
      }
    } catch (error) {
      setStatus(error.message);
    }
  };

  const handleCreateReservation = async () => {
    setStatus("");
    try {
      await createReservation(form);
      setStatus("Reservation created.");
      setForm((current) => ({ ...current, startTime: "" }));
    } catch (error) {
      setStatus(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fffdfa_0%,#f5efe7_100%)] px-6 py-10 lg:px-10">
      <div className="section-shell space-y-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand">Reservations</p>
          <h1 className="mt-3 font-['DM_Serif_Display'] text-5xl text-carbon-black">Book and manage tables</h1>
        </div>

        <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <section className="surface-card rounded-[2rem] p-6">
            <h2 className="font-['DM_Serif_Display'] text-3xl text-carbon-black">Create a reservation</h2>
            <div className="mt-6 grid gap-4">
              <select
                value={form.restaurantId}
                onChange={(event) => setForm((current) => ({ ...current, restaurantId: event.target.value }))}
                className="rounded-2xl border border-black/8 bg-white px-4 py-3 text-sm text-carbon-black"
              >
                <option value="">Select restaurant</option>
                {restaurants.map((restaurant) => (
                  <option key={restaurant._id} value={restaurant._id}>
                    {restaurant.name}
                  </option>
                ))}
              </select>
              <input
                type="date"
                value={form.date}
                onChange={(event) => setForm((current) => ({ ...current, date: event.target.value }))}
                className="rounded-2xl border border-black/8 bg-white px-4 py-3 text-sm text-carbon-black"
              />
              <input
                type="number"
                min="1"
                max="12"
                value={form.guests}
                onChange={(event) => setForm((current) => ({ ...current, guests: Number(event.target.value) }))}
                className="rounded-2xl border border-black/8 bg-white px-4 py-3 text-sm text-carbon-black"
              />
              <button
                onClick={handleAvailability}
                disabled={!canCheckAvailability}
                className="rounded-2xl bg-carbon-black px-5 py-3 text-sm font-semibold text-white disabled:opacity-50"
              >
                Check availability
              </button>
            </div>

            {availability.length ? (
              <div className="mt-6 flex flex-wrap gap-3">
                {availability.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setForm((current) => ({ ...current, startTime: slot }))}
                    className={`rounded-full px-4 py-2 text-sm font-semibold ${
                      form.startTime === slot ? "bg-brand text-white" : "bg-brand-muted text-brand"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            ) : null}

            <button
              onClick={handleCreateReservation}
              disabled={!form.startTime}
              className="mt-6 rounded-2xl bg-brand px-5 py-3 text-sm font-semibold text-white disabled:opacity-50"
            >
              Confirm reservation
            </button>
            {status ? <p className="mt-4 text-sm text-slate-grey">{status}</p> : null}
          </section>

          <section className="space-y-6">
            <div className="surface-card rounded-[2rem] p-6">
              <h2 className="font-['DM_Serif_Display'] text-3xl text-carbon-black">My reservations</h2>
              <div className="mt-5 space-y-4">
                {myReservationsLoading ? <p className="text-sm text-slate-grey">Loading your reservations...</p> : null}
                {myReservations.map((reservation) => (
                  <article key={reservation._id} className="rounded-[1.4rem] border border-black/6 bg-white p-4">
                    <p className="font-semibold text-carbon-black">{reservation.restaurant?.name}</p>
                    <p className="mt-2 text-sm text-slate-grey">
                      {reservation.date} · {reservation.startTime} - {reservation.endTime} · {reservation.guests} guests
                    </p>
                    <p className="mt-1 text-sm text-brand">Status: {reservation.status}</p>
                    {reservation.status !== "cancelled" ? (
                      <button
                        onClick={() => cancelReservation(reservation._id)}
                        className="mt-4 rounded-2xl border border-brand/20 bg-brand-muted px-4 py-2 text-sm font-semibold text-brand"
                      >
                        Cancel reservation
                      </button>
                    ) : null}
                  </article>
                ))}
              </div>
            </div>

            {ownerRestaurants.length ? (
              <div className="surface-card rounded-[2rem] p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <h2 className="font-['DM_Serif_Display'] text-3xl text-carbon-black">Restaurant reservations</h2>
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
                <div className="mt-5 space-y-4">
                  {restaurantReservationsLoading ? <p className="text-sm text-slate-grey">Loading restaurant reservations...</p> : null}
                  {restaurantReservations.map((reservation) => (
                    <article key={reservation._id} className="rounded-[1.4rem] border border-black/6 bg-white p-4">
                      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                          <p className="font-semibold text-carbon-black">{reservation.user?.name || "Guest"}</p>
                          <p className="mt-2 text-sm text-slate-grey">
                            {reservation.date} · {reservation.startTime} · Table {reservation.table?.name || "Assigned"}
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {reservationStatuses.map((nextStatus) => (
                            <button
                              key={nextStatus}
                              onClick={() =>
                                updateReservationStatus(reservation._id, nextStatus, selectedRestaurantId)
                              }
                              className="rounded-full bg-brand-muted px-3 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-brand"
                            >
                              {nextStatus}
                            </button>
                          ))}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ) : null}
          </section>
        </div>
      </div>
    </div>
  );
};
