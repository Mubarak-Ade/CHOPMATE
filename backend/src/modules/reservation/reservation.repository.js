import { memoryStore } from "../../data/memoryStore.js";

export const reservationRepository = {
  findById(reservationId) {
    return memoryStore.reservations.find(
      (reservation) => reservation._id === reservationId
    );
  },

  listByUser(userId) {
    return memoryStore.reservations.filter((reservation) => reservation.user === userId);
  },

  listByRestaurant(restaurantId) {
    return memoryStore.reservations.filter(
      (reservation) => reservation.restaurant === restaurantId
    );
  },

  listByTableAndDate(tableId, date) {
    return memoryStore.reservations.filter(
      (reservation) =>
        reservation.table === tableId &&
        reservation.date === date &&
        reservation.status !== "cancelled"
    );
  },

  create(payload) {
    const reservation = {
      _id: memoryStore.nextId("res"),
      ...payload,
    };
    memoryStore.reservations.push(reservation);
    return reservation;
  },

  update(reservationId, updates) {
    const reservation = this.findById(reservationId);
    if (!reservation) {
      return null;
    }

    Object.assign(reservation, updates);
    return reservation;
  },
};
