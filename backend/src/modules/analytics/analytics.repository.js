import { memoryStore } from "../../data/memoryStore.js";

export const analyticsRepository = {
  getOrdersByRestaurant(restaurantId) {
    return memoryStore.orders.filter((order) => order.restaurant === restaurantId);
  },

  getReservationsByRestaurant(restaurantId) {
    return memoryStore.reservations.filter(
      (reservation) => reservation.restaurant === restaurantId
    );
  },

  getSubscriptionByRestaurant(restaurantId) {
    return memoryStore.subscriptions.find(
      (subscription) => subscription.restaurant === restaurantId
    );
  },
};
