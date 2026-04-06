import { memoryStore } from "../../data/memoryStore.js";

export const stockRepository = {
  createMovement(payload) {
    const movement = {
      _id: memoryStore.nextId("stk"),
      ...payload,
    };
    memoryStore.stockMovements.push(movement);
    return movement;
  },

  listByInventoryItem(inventoryItemId) {
    return memoryStore.stockMovements.filter(
      (movement) => movement.inventoryItem === inventoryItemId
    );
  },

  createAlert(payload) {
    const alert = {
      _id: memoryStore.nextId("alt"),
      ...payload,
    };
    memoryStore.alerts.push(alert);
    return alert;
  },
};
