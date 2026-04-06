import { memoryStore } from "../../data/memoryStore.js";

export const menuRepository = {
  findMenuByRestaurant(restaurantId) {
    return memoryStore.menus.find((menu) => menu.restaurant === restaurantId) || null;
  },

  findCategoriesByRestaurant(restaurantId) {
    return memoryStore.categories.filter((category) => category.restaurant === restaurantId);
  },

  findItemsByRestaurant(restaurantId) {
    return memoryStore.menuItems.filter((item) => item.restaurant === restaurantId);
  },

  findItemById(itemId) {
    return memoryStore.menuItems.find((item) => item._id === itemId);
  },

  createItem(payload) {
    const item = {
      _id: memoryStore.nextId("itm"),
      ...payload,
    };
    memoryStore.menuItems.push(item);
    return item;
  },

  updateItem(itemId, updates) {
    const item = this.findItemById(itemId);
    if (!item) {
      return null;
    }

    Object.assign(item, updates);
    return item;
  },
};
