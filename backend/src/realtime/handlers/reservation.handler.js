import { realtimeEvents } from "../events.js";
import { publishToRestaurant, publishToUser } from "./notification.handler.js";

export const emitReservationCreated = (reservation) => {
  const payload = {
    type: realtimeEvents.RESERVATION_NEW,
    data: {
      reservationId: reservation._id,
      status: reservation.status,
      restaurantId: reservation.restaurant,
      userId: reservation.user,
    },
    timestamp: new Date().toISOString(),
  };

  publishToRestaurant(reservation.restaurant, payload);
  publishToUser(reservation.user, payload);
};

export const emitReservationUpdated = (reservation) => {
  const payload = {
    type:
      reservation.status === "confirmed"
        ? realtimeEvents.RESERVATION_CONFIRMED
        : realtimeEvents.RESERVATION_NEW,
    data: {
      reservationId: reservation._id,
      status: reservation.status,
      restaurantId: reservation.restaurant,
      userId: reservation.user,
    },
    timestamp: new Date().toISOString(),
  };

  publishToRestaurant(reservation.restaurant, payload);
  publishToUser(reservation.user, payload);
};
