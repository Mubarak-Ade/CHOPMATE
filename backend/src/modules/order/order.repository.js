import { memoryStore } from "../../data/memoryStore.js";

export const orderRepository = {
  findById(orderId) {
    return memoryStore.orders.find((order) => order._id === orderId);
  },

  findOpenCheckoutForUser(userId) {
    return memoryStore.orders.find(
      (order) =>
        order.user === userId &&
        order.paymentStatus === "pending" &&
        ["pending"].includes(order.status)
    );
  },

  listByUser(userId) {
    return memoryStore.orders.filter((order) => order.user === userId);
  },

  listByRestaurant(restaurantId) {
    return memoryStore.orders.filter((order) => order.restaurant === restaurantId);
  },

  create(payload) {
    const order = {
      _id: memoryStore.nextId("ord"),
      ...payload,
    };
    memoryStore.orders.push(order);
    return order;
  },

  update(orderId, updates) {
    const order = this.findById(orderId);
    if (!order) {
      return null;
    }

    Object.assign(order, updates);
    return order;
  },
};
