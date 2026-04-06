import { createError } from "../../lib/createError.js";
import { inventoryRepository } from "../inventory/inventory.repository.js";
import { menuRepository } from "../menu/menu.repository.js";
import { restaurantRepository } from "../restaurant/restaurant.repository.js";
import { staffService } from "../staff/staff.service.js";
import { subscriptionService } from "../subscription/subscription.service.js";
import { analyticsRepository } from "./analytics.repository.js";

const toDayKey = (value) => new Date(value).toISOString().slice(0, 10);

const increment = (map, key, amount = 1) => {
  map.set(key, (map.get(key) || 0) + amount);
};

export const analyticsService = {
  getDashboard(userId, restaurantId) {
    const restaurant = restaurantRepository.findById(restaurantId);
    if (!restaurant) {
      throw createError(404, "restaurant not found");
    }

    subscriptionService.ensureFeatureAccess(restaurantId, "analytics");
    staffService.ensurePermission(userId, restaurantId, "view_analytics");

    const orders = analyticsRepository.getOrdersByRestaurant(restaurantId);
    const reservations = analyticsRepository.getReservationsByRestaurant(restaurantId);
    const subscription = analyticsRepository.getSubscriptionByRestaurant(restaurantId);
    const menuItems = menuRepository.findItemsByRestaurant(restaurantId);
    const inventoryItems = inventoryRepository.listByRestaurant(restaurantId);

    const paidOrders = orders.filter((order) => order.paymentStatus === "paid");
    const revenue = paidOrders.reduce(
      (sum, order) => sum + Number(order.totalAmount || 0),
      0
    );
    const averageOrderValue = paidOrders.length ? revenue / paidOrders.length : 0;
    const pendingOrders = orders.filter((order) =>
      ["pending", "paid", "preparing"].includes(order.status)
    ).length;
    const activeReservations = reservations.filter((reservation) =>
      ["pending", "confirmed"].includes(reservation.status)
    ).length;

    const salesByDayMap = new Map();
    const orderStatusMap = new Map();
    const popularItemsMap = new Map();
    const reservationStatusMap = new Map();

    paidOrders.forEach((order) => {
      increment(salesByDayMap, toDayKey(order.createdAt), Number(order.totalAmount || 0));
      increment(orderStatusMap, order.status);
      order.items.forEach((item) => increment(popularItemsMap, item.name, Number(item.quantity)));
    });

    reservations.forEach((reservation) => {
      increment(reservationStatusMap, reservation.status);
    });

    const salesByDay = Array.from(salesByDayMap.entries())
      .sort((left, right) => left[0].localeCompare(right[0]))
      .map(([date, amount]) => ({ date, amount }));

    const orderStatusBreakdown = Array.from(orderStatusMap.entries()).map(
      ([status, count]) => ({
        status,
        count,
      })
    );

    const reservationStatusBreakdown = Array.from(reservationStatusMap.entries()).map(
      ([status, count]) => ({
        status,
        count,
      })
    );

    const topItems = Array.from(popularItemsMap.entries())
      .sort((left, right) => right[1] - left[1])
      .slice(0, 5)
      .map(([name, quantity]) => ({ name, quantity }));

    return {
      summary: {
        restaurantId,
        restaurantName: restaurant.name,
        revenue,
        totalOrders: orders.length,
        paidOrders: paidOrders.length,
        pendingOrders,
        activeReservations,
        averageOrderValue: Number(averageOrderValue.toFixed(2)),
        menuItemCount: menuItems.length,
        lowStockItems: inventoryItems.filter(
          (item) => Number(item.quantity) <= Number(item.lowStockThreshold)
        ).length,
        currentPlan: subscription?.plan || null,
        subscriptionStatus: subscription?.status || "trial",
      },
      charts: {
        salesByDay,
        orderStatusBreakdown,
        reservationStatusBreakdown,
        topItems,
      },
    };
  },
};
