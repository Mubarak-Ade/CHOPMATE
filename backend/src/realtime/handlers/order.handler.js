import { realtimeEvents } from "../events.js";
import { publishToRestaurant, publishToUser } from "./notification.handler.js";

export const emitOrderCreated = (order) => {
  const payload = {
    type: realtimeEvents.ORDER_NEW,
    data: {
      orderId: order._id,
      status: order.status,
      restaurantId: order.restaurant,
      userId: order.user,
    },
    timestamp: new Date().toISOString(),
  };

  publishToRestaurant(order.restaurant, payload);
  publishToUser(order.user, payload);
};

export const emitOrderUpdated = (order) => {
  const payload = {
    type: realtimeEvents.ORDER_UPDATE,
    data: {
      orderId: order._id,
      status: order.status,
      paymentStatus: order.paymentStatus,
      restaurantId: order.restaurant,
      userId: order.user,
    },
    timestamp: new Date().toISOString(),
  };

  publishToRestaurant(order.restaurant, payload);
  publishToUser(order.user, payload);
};
