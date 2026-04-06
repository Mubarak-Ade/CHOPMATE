import { createError } from "../../lib/createError.js";
import { restaurantRepository } from "../restaurant/restaurant.repository.js";
import { staffService } from "../staff/staff.service.js";
import { subscriptionService } from "../subscription/subscription.service.js";
import { menuRepository } from "./menu.repository.js";

const buildMenuView = (restaurantId) => {
  const categories = menuRepository.findCategoriesByRestaurant(restaurantId);
  const items = menuRepository.findItemsByRestaurant(restaurantId);

  return {
    menu: menuRepository.findMenuByRestaurant(restaurantId),
    categories: categories.map((category) => ({
      ...category,
      items: items.filter((item) => item.category === category._id),
    })),
    items,
  };
};

export const menuService = {
  getMenuByRestaurant(restaurantId) {
    if (!restaurantRepository.findById(restaurantId)) {
      throw createError(404, "restaurant not found");
    }

    return buildMenuView(restaurantId);
  },

  createMenuItem(userId, payload) {
    const restaurant = restaurantRepository.findById(payload.restaurantId);
    if (!restaurant) {
      throw createError(404, "restaurant not found");
    }

    if (!payload.name || typeof payload.price !== "number" || !payload.category) {
      throw createError(400, "name, price, and category are required");
    }

    staffService.ensurePermission(userId, payload.restaurantId, "manage_menu");

    const maxMenuItems = subscriptionService.getPlanLimit(
      payload.restaurantId,
      "maxMenuItems"
    );
    const existingItemCount = menuRepository.findItemsByRestaurant(payload.restaurantId).length;
    if (maxMenuItems !== null && existingItemCount >= maxMenuItems) {
      throw createError(403, "current plan has reached its menu item limit");
    }

    return menuRepository.createItem({
      restaurant: payload.restaurantId,
      category: payload.category,
      name: payload.name,
      description: payload.description || "",
      price: payload.price,
      image: payload.image || "",
      isAvailable: payload.isAvailable ?? true,
    });
  },

  updateMenuItem(userId, itemId, updates) {
    const item = menuRepository.findItemById(itemId);
    if (!item) {
      throw createError(404, "menu item not found");
    }

    staffService.ensurePermission(userId, item.restaurant, "manage_menu");

    return menuRepository.updateItem(itemId, {
      category: updates.category ?? item.category,
      name: updates.name ?? item.name,
      description: updates.description ?? item.description,
      price: updates.price ?? item.price,
      image: updates.image ?? item.image,
      isAvailable: updates.isAvailable ?? item.isAvailable,
    });
  },
};
