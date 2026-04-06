import { memoryStore } from "../../data/memoryStore.js";

export const tableRepository = {
  findById(tableId) {
    return memoryStore.tables.find((table) => table._id === tableId);
  },

  listByRestaurant(restaurantId) {
    return memoryStore.tables.filter((table) => table.restaurant === restaurantId);
  },

  create(payload) {
    const table = {
      _id: memoryStore.nextId("tbl"),
      ...payload,
    };
    memoryStore.tables.push(table);
    return table;
  },

  update(tableId, updates) {
    const table = this.findById(tableId);
    if (!table) {
      return null;
    }

    Object.assign(table, updates);
    return table;
  },
};
