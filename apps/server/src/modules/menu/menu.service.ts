import { Types } from "mongoose";
import { AppError } from "../../shared/utils/app-error.js";
import { restaurantService } from "../restaurant/restaurant.service.js";
import { menuRepository } from "./menu.repository.js";

export const menuService = {
  async createMenu(ownerId: string, payload: { restaurantId: string; name: string; categories: string[] }) {
    await restaurantService.assertOwner(ownerId, payload.restaurantId);

    return menuRepository.createMenu({
      restaurant: new Types.ObjectId(payload.restaurantId),
      name: payload.name,
      categories: payload.categories.map((categoryId) => new Types.ObjectId(categoryId)),
    });
  },

  async getMenuByRestaurantId(restaurantId: string) {
    const menu = await menuRepository.findMenuByRestaurantId(restaurantId);
    const items = await menuRepository.findMenuItemsByRestaurantId(restaurantId);

    return {
      menu,
      items,
    };
  },

  async createMenuItem(
    ownerId: string,
    payload: {
      restaurantId: string;
      categoryId: string;
      name: string;
      description: string;
      price: number;
      image?: string | undefined;
      isAvailable?: boolean | undefined;
    },
  ) {
    await restaurantService.assertOwner(ownerId, payload.restaurantId);

    return menuRepository.createMenuItem({
      restaurant: new Types.ObjectId(payload.restaurantId),
      category: new Types.ObjectId(payload.categoryId),
      name: payload.name,
      description: payload.description,
      price: payload.price,
      ...(payload.image ? { image: payload.image } : {}),
      isAvailable: payload.isAvailable ?? true,
    });
  },

  async updateMenuItem(
    ownerId: string,
    menuItemId: string,
    payload: {
      categoryId?: string | undefined;
      name?: string | undefined;
      description?: string | undefined;
      price?: number | undefined;
      image?: string | undefined;
      isAvailable?: boolean | undefined;
    },
  ) {
    const existingItem = await menuRepository.findMenuItemById(menuItemId);

    if (!existingItem) {
      throw new AppError("Menu item not found", 404);
    }

    await restaurantService.assertOwner(ownerId, existingItem.restaurant.toString());

    const updatedPayload = {
      ...(payload.name ? { name: payload.name } : {}),
      ...(payload.description !== undefined ? { description: payload.description } : {}),
      ...(payload.price !== undefined ? { price: payload.price } : {}),
      ...(payload.image ? { image: payload.image } : {}),
      ...(payload.isAvailable !== undefined ? { isAvailable: payload.isAvailable } : {}),
      ...(payload.categoryId ? { category: new Types.ObjectId(payload.categoryId) } : {}),
    };
    const item = await menuRepository.updateMenuItemById(menuItemId, updatedPayload);

    if (!item) {
      throw new AppError("Menu item not found", 404);
    }

    return item;
  },

  async deleteMenuItem(ownerId: string, menuItemId: string) {
    const existingItem = await menuRepository.findMenuItemById(menuItemId);

    if (!existingItem) {
      throw new AppError("Menu item not found", 404);
    }

    await restaurantService.assertOwner(ownerId, existingItem.restaurant.toString());

    const item = await menuRepository.deleteMenuItemById(menuItemId);

    if (!item) {
      throw new AppError("Menu item not found", 404);
    }
  },
};
