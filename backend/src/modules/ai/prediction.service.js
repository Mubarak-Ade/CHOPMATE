import { orderRepository } from "../order/order.repository.js";

const bucketHour = (dateValue) => {
  const hour = new Date(dateValue).getHours();
  return `${String(hour).padStart(2, "0")}:00`;
};

export const predictionService = {
  getDemandPrediction(restaurantId) {
    const orderCounts = new Map();
    const orders = orderRepository
      .listByRestaurant(restaurantId)
      .filter((order) => order.paymentStatus === "paid");

    orders.forEach((order) => {
      const key = bucketHour(order.createdAt);
      orderCounts.set(key, (orderCounts.get(key) || 0) + 1);
    });

    const peakHours = Array.from(orderCounts.entries())
      .sort((left, right) => right[1] - left[1])
      .slice(0, 3)
      .map(([hour, count]) => ({ hour, count }));

    return {
      peakHours,
      totalObservedOrders: orders.length,
    };
  },
};
