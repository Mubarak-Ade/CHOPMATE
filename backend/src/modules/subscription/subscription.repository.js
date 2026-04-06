import { memoryStore } from "../../data/memoryStore.js";

export const subscriptionRepository = {
  findByRestaurant(restaurantId) {
    return memoryStore.subscriptions.find(
      (subscription) => subscription.restaurant === restaurantId
    );
  },

  upsertByRestaurant(restaurantId, payload) {
    const existing = this.findByRestaurant(restaurantId);
    if (existing) {
      Object.assign(existing, payload);
      return existing;
    }

    const subscription = {
      _id: memoryStore.nextId("sub"),
      restaurant: restaurantId,
      ...payload,
    };

    memoryStore.subscriptions.push(subscription);
    return subscription;
  },
};
