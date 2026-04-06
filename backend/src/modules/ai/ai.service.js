import { createError } from "../../lib/createError.js";
import { aiRepository } from "./ai.repository.js";
import { analyticsService } from "../analytics/analytics.service.js";
import { authRepository } from "../auth/auth.repository.js";
import { inventoryRepository } from "../inventory/inventory.repository.js";
import { menuRepository } from "../menu/menu.repository.js";
import { orderRepository } from "../order/order.repository.js";
import { restaurantRepository } from "../restaurant/restaurant.repository.js";
import { staffService } from "../staff/staff.service.js";
import { subscriptionService } from "../subscription/subscription.service.js";
import { recommendationService } from "./recommendation.service.js";
import { predictionService } from "./prediction.service.js";

const AI_CACHE_TTL = 1000 * 60 * 10;

const withCache = (key, factory) => {
  const cached = aiRepository.getCache(key);
  if (cached) {
    return cached;
  }

  return aiRepository.setCache(key, factory(), AI_CACHE_TTL);
};

export const aiService = {
  getRecommendations(userId) {
    const user = authRepository.findUserById(userId);
    if (!user) {
      throw createError(404, "user not found");
    }

    return withCache(`ai:user:${userId}:recommendations`, () =>
      recommendationService.getRecommendations(userId)
    );
  },

  getMenuInsights(userId, restaurantId) {
    subscriptionService.ensureFeatureAccess(restaurantId, "analytics");
    staffService.ensurePermission(userId, restaurantId, "view_analytics");

    return withCache(`ai:restaurant:${restaurantId}:menu-insights`, () => {
      const orders = orderRepository
        .listByRestaurant(restaurantId)
        .filter((order) => order.paymentStatus === "paid");
      const items = menuRepository.findItemsByRestaurant(restaurantId);
      const quantityByItem = new Map();

      orders.forEach((order) => {
        order.items.forEach((item) => {
          quantityByItem.set(
            item.menuItem,
            (quantityByItem.get(item.menuItem) || 0) + Number(item.quantity)
          );
        });
      });

      return items.map((item) => {
        const sold = quantityByItem.get(item._id) || 0;
        return {
          menuItemId: item._id,
          name: item.name,
          orders: sold,
          suggestion:
            sold === 0
              ? "Promote, discount, or replace"
              : sold < 3
                ? "Consider spotlighting this item"
                : "Keep featured",
        };
      });
    });
  },

  getDemand(userId, restaurantId) {
    subscriptionService.ensureFeatureAccess(restaurantId, "analytics");
    staffService.ensurePermission(userId, restaurantId, "view_analytics");

    return withCache(`ai:restaurant:${restaurantId}:demand`, () =>
      predictionService.getDemandPrediction(restaurantId)
    );
  },

  getCustomers(userId, restaurantId) {
    subscriptionService.ensureFeatureAccess(restaurantId, "analytics");
    staffService.ensurePermission(userId, restaurantId, "view_analytics");

    return withCache(`ai:restaurant:${restaurantId}:customers`, () => {
      const orders = orderRepository
        .listByRestaurant(restaurantId)
        .filter((order) => order.paymentStatus === "paid");
      const byCustomer = new Map();

      orders.forEach((order) => {
        const current = byCustomer.get(order.user) || {
          userId: order.user,
          orders: 0,
          totalSpent: 0,
        };

        current.orders += 1;
        current.totalSpent += Number(order.totalAmount || 0);
        byCustomer.set(order.user, current);
      });

      return Array.from(byCustomer.values()).map((entry) => {
        const user = authRepository.findUserById(entry.userId);
        const segment =
          entry.orders >= 5
            ? "frequent"
            : entry.totalSpent >= 20000
              ? "high_spender"
              : entry.orders <= 1
                ? "new"
                : "occasional";

        return {
          user: user
            ? {
                _id: user._id,
                name: user.name,
                email: user.email,
              }
            : null,
          segment,
          metrics: {
            orders: entry.orders,
            totalSpent: entry.totalSpent,
          },
        };
      });
    });
  },

  getSmartNotifications(userId, restaurantId) {
    subscriptionService.ensureFeatureAccess(restaurantId, "analytics");
    staffService.ensurePermission(userId, restaurantId, "view_analytics");

    return withCache(`ai:restaurant:${restaurantId}:notifications`, () => {
      const inventoryItems = inventoryRepository.listByRestaurant(restaurantId);
      const lowStockItems = inventoryItems.filter(
        (item) => Number(item.quantity) <= Number(item.lowStockThreshold)
      );
      const demand = predictionService.getDemandPrediction(restaurantId);
      const analytics = analyticsService.getDashboard(userId, restaurantId);
      const restaurant = restaurantRepository.findById(restaurantId);

      const notifications = [];

      if (lowStockItems.length) {
        notifications.push({
          type: "inventory",
          message: `Low stock on ${lowStockItems[0].name}. Restock before the next rush.`,
        });
      }

      if (demand.peakHours.length) {
        notifications.push({
          type: "demand",
          message: `${restaurant?.name} usually peaks around ${demand.peakHours
            .map((entry) => entry.hour)
            .join(", ")}.`,
        });
      }

      if ((analytics.charts.topItems || []).length) {
        notifications.push({
          type: "menu",
          message: `${analytics.charts.topItems[0].name} is your current best-seller. Consider promoting it.`,
        });
      }

      return notifications;
    });
  },
};
