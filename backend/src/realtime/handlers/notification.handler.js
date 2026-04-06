import { realtimeHub } from "../socket.js";

export const publishToUser = (userId, payload) => {
  realtimeHub.publish(`user:${userId}`, payload);
};

export const publishToRestaurant = (restaurantId, payload) => {
  realtimeHub.publish(`restaurant:${restaurantId}`, payload);
};
