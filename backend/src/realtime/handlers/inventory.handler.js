import { realtimeEvents } from "../events.js";
import { publishToRestaurant } from "./notification.handler.js";

export const emitInventoryLow = (inventoryItem) => {
  publishToRestaurant(inventoryItem.restaurant, {
    type: realtimeEvents.INVENTORY_LOW,
    data: {
      inventoryItemId: inventoryItem._id,
      name: inventoryItem.name,
      quantity: inventoryItem.quantity,
      restaurantId: inventoryItem.restaurant,
    },
    timestamp: new Date().toISOString(),
  });
};
