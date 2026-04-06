import { memoryStore } from "../../data/memoryStore.js";

export const inventoryRepository = {
  findById(inventoryId) {
    return memoryStore.inventoryItems.find((item) => item._id === inventoryId);
  },

  listByRestaurant(restaurantId) {
    return memoryStore.inventoryItems.filter((item) => item.restaurant === restaurantId);
  },

  create(payload) {
    const item = {
      _id: memoryStore.nextId("inv"),
      ...payload,
    };
    memoryStore.inventoryItems.push(item);
    return item;
  },

  update(inventoryId, updates) {
    const item = this.findById(inventoryId);
    if (!item) {
      return null;
    }

    Object.assign(item, updates);
    return item;
  },

  delete(inventoryId) {
    const index = memoryStore.inventoryItems.findIndex((item) => item._id === inventoryId);
    if (index >= 0) {
      memoryStore.inventoryItems.splice(index, 1);
    }
  },
};
