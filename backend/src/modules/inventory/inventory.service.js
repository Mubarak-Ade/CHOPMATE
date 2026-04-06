import { createError } from "../../lib/createError.js";
import { emitInventoryLow } from "../../realtime/handlers/inventory.handler.js";
import { menuRepository } from "../menu/menu.repository.js";
import { restaurantRepository } from "../restaurant/restaurant.repository.js";
import { staffService } from "../staff/staff.service.js";
import { subscriptionService } from "../subscription/subscription.service.js";
import { recipeRepository } from "../recipe/recipe.repository.js";
import { stockRepository } from "../stock/stock.repository.js";
import { inventoryRepository } from "./inventory.repository.js";

const ensureInventoryAccess = (userId, restaurantId) => {
  subscriptionService.ensureFeatureAccess(restaurantId, "inventory");
  staffService.ensurePermission(userId, restaurantId, "view_analytics");
};

const ensureInventoryManageAccess = (userId, restaurantId) => {
  subscriptionService.ensureFeatureAccess(restaurantId, "inventory");
  staffService.ensurePermission(userId, restaurantId, "manage_orders");
};

export const inventoryService = {
  createInventoryItem(userId, payload) {
    if (!restaurantRepository.findById(payload.restaurantId)) {
      throw createError(404, "restaurant not found");
    }

    ensureInventoryManageAccess(userId, payload.restaurantId);

    if (!payload.name || !payload.unit) {
      throw createError(400, "name and unit are required");
    }

    return inventoryRepository.create({
      restaurant: payload.restaurantId,
      name: payload.name,
      unit: payload.unit,
      quantity: Number(payload.quantity || 0),
      lowStockThreshold: Number(payload.lowStockThreshold || 0),
      createdAt: new Date().toISOString(),
    });
  },

  getInventory(userId, restaurantId) {
    ensureInventoryAccess(userId, restaurantId);
    return inventoryRepository.listByRestaurant(restaurantId);
  },

  updateInventoryItem(userId, inventoryId, updates) {
    const item = inventoryRepository.findById(inventoryId);
    if (!item) {
      throw createError(404, "inventory item not found");
    }

    ensureInventoryManageAccess(userId, item.restaurant);

    const previousQuantity = Number(item.quantity);
    const nextQuantity = Number(updates.quantity ?? item.quantity);
    const updatedItem = inventoryRepository.update(inventoryId, {
      name: updates.name ?? item.name,
      unit: updates.unit ?? item.unit,
      quantity: nextQuantity,
      lowStockThreshold: Number(updates.lowStockThreshold ?? item.lowStockThreshold),
    });

    if (previousQuantity !== nextQuantity) {
      stockRepository.createMovement({
        inventoryItem: inventoryId,
        type: nextQuantity > previousQuantity ? "in" : "out",
        quantity: Math.abs(nextQuantity - previousQuantity),
        reason: updates.reason || (nextQuantity > previousQuantity ? "restock" : "manual"),
        referenceId: null,
        createdAt: new Date().toISOString(),
      });
    }

    if (nextQuantity <= Number(updatedItem.lowStockThreshold)) {
      stockRepository.createAlert({
        inventoryItem: inventoryId,
        restaurant: updatedItem.restaurant,
        type: "low_stock",
        message: `${updatedItem.name} is low on stock`,
        createdAt: new Date().toISOString(),
      });
      emitInventoryLow(updatedItem);
    }

    return updatedItem;
  },

  deleteInventoryItem(userId, inventoryId) {
    const item = inventoryRepository.findById(inventoryId);
    if (!item) {
      throw createError(404, "inventory item not found");
    }

    ensureInventoryManageAccess(userId, item.restaurant);
    inventoryRepository.delete(inventoryId);
    return { success: true };
  },

  createRecipe(userId, payload) {
    const menuItem = menuRepository.findItemById(payload.menuItem);
    if (!menuItem) {
      throw createError(404, "menu item not found");
    }

    ensureInventoryManageAccess(userId, menuItem.restaurant);

    if (!Array.isArray(payload.ingredients) || !payload.ingredients.length) {
      throw createError(400, "ingredients are required");
    }

    payload.ingredients.forEach((ingredient) => {
      const inventoryItem = inventoryRepository.findById(ingredient.item);
      if (!inventoryItem || inventoryItem.restaurant !== menuItem.restaurant) {
        throw createError(400, "all ingredients must belong to the same restaurant");
      }
    });

    const existingRecipe = recipeRepository.findByMenuItem(menuItem._id);
    if (existingRecipe) {
      throw createError(409, "recipe already exists for this menu item");
    }

    return recipeRepository.create({
      menuItem: menuItem._id,
      ingredients: payload.ingredients.map((ingredient) => ({
        item: ingredient.item,
        quantity: Number(ingredient.quantity),
      })),
    });
  },

  getRecipe(userId, menuItemId) {
    const menuItem = menuRepository.findItemById(menuItemId);
    if (!menuItem) {
      throw createError(404, "menu item not found");
    }

    ensureInventoryAccess(userId, menuItem.restaurant);
    return recipeRepository.findByMenuItem(menuItemId);
  },

  updateRecipe(userId, recipeId, updates) {
    const recipe = recipeRepository.findById(recipeId);
    if (!recipe) {
      throw createError(404, "recipe not found");
    }

    const menuItem = menuRepository.findItemById(recipe.menuItem);
    ensureInventoryManageAccess(userId, menuItem.restaurant);

    return recipeRepository.update(recipeId, {
      ingredients: (updates.ingredients || recipe.ingredients).map((ingredient) => ({
        item: ingredient.item,
        quantity: Number(ingredient.quantity),
      })),
    });
  },

  getStockHistory(userId, inventoryItemId) {
    const item = inventoryRepository.findById(inventoryItemId);
    if (!item) {
      throw createError(404, "inventory item not found");
    }

    ensureInventoryAccess(userId, item.restaurant);
    return stockRepository.listByInventoryItem(inventoryItemId);
  },

  deductInventoryForOrder(order) {
    if (!order || order.inventoryDeductedAt) {
      return order;
    }

    order.items.forEach((lineItem) => {
      const recipe = recipeRepository.findByMenuItem(lineItem.menuItem);
      if (!recipe) {
        return;
      }

      recipe.ingredients.forEach((ingredient) => {
        const inventoryItem = inventoryRepository.findById(ingredient.item);
        if (!inventoryItem) {
          return;
        }

        const deduction = Number(ingredient.quantity) * Number(lineItem.quantity);
        const nextQuantity = Number(inventoryItem.quantity) - deduction;
        if (nextQuantity < 0) {
          throw createError(
            409,
            `insufficient stock for ${inventoryItem.name} while processing order`
          );
        }

        inventoryRepository.update(inventoryItem._id, { quantity: nextQuantity });
        stockRepository.createMovement({
          inventoryItem: inventoryItem._id,
          type: "out",
          quantity: deduction,
          reason: "order",
          referenceId: order._id,
          createdAt: new Date().toISOString(),
        });

        if (nextQuantity <= Number(inventoryItem.lowStockThreshold)) {
          stockRepository.createAlert({
            inventoryItem: inventoryItem._id,
            restaurant: inventoryItem.restaurant,
            type: "low_stock",
            message: `${inventoryItem.name} is low on stock`,
            createdAt: new Date().toISOString(),
          });
          emitInventoryLow({
            ...inventoryItem,
            quantity: nextQuantity,
          });
        }
      });
    });

    order.inventoryDeductedAt = new Date().toISOString();
    return order;
  },
};
