import { memoryStore } from "../../data/memoryStore.js";

export const cartRepository = {
  findByUser(userId) {
    return memoryStore.carts.find((cart) => cart.user === userId) || null;
  },

  create(payload) {
    const cart = {
      _id: memoryStore.nextId("crt"),
      ...payload,
    };
    memoryStore.carts.push(cart);
    return cart;
  },

  update(cartId, updates) {
    const cart = memoryStore.carts.find((entry) => entry._id === cartId);
    if (!cart) {
      return null;
    }

    Object.assign(cart, updates);
    return cart;
  },

  deleteByUser(userId) {
    const index = memoryStore.carts.findIndex((cart) => cart.user === userId);
    if (index >= 0) {
      memoryStore.carts.splice(index, 1);
    }
  },
};
