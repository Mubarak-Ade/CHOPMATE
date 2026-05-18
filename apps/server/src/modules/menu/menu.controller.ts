import type { Request, Response } from "express";
import { sendSuccess } from "../../shared/utils/response.js";
import {
  createMenuItemSchema,
  createMenuSchema,
  updateMenuItemSchema,
} from "./menu.validation.js";
import { menuService } from "./menu.service.js";

export const menuController = {
  async createMenu(req: Request, res: Response) {
    const payload = createMenuSchema.parse(req.body);
    const menu = await menuService.createMenu(payload);
    sendSuccess(res, menu, "Menu created", 201);
  },

  async getMenu(req: Request, res: Response) {
    const restaurantId = Array.isArray(req.params.restaurantId)
      ? req.params.restaurantId[0] ?? ""
      : req.params.restaurantId ?? "";
    const menu = await menuService.getMenuByRestaurantId(restaurantId);
    sendSuccess(res, menu, "Menu retrieved");
  },

  async createMenuItem(req: Request, res: Response) {
    const parsedPayload = createMenuItemSchema.parse(req.body);
    const payload = {
      restaurantId: parsedPayload.restaurantId,
      categoryId: parsedPayload.categoryId,
      name: parsedPayload.name,
      description: parsedPayload.description,
      price: parsedPayload.price,
      ...(parsedPayload.image ? { image: parsedPayload.image } : {}),
      ...(parsedPayload.isAvailable !== undefined ? { isAvailable: parsedPayload.isAvailable } : {}),
    };
    const item = await menuService.createMenuItem(payload);
    sendSuccess(res, item, "Menu item created", 201);
  },

  async updateMenuItem(req: Request, res: Response) {
    const menuItemId = Array.isArray(req.params.id)
      ? req.params.id[0] ?? ""
      : req.params.id ?? "";
    const parsedPayload = updateMenuItemSchema.parse(req.body);
    const payload = {
      ...(parsedPayload.categoryId ? { categoryId: parsedPayload.categoryId } : {}),
      ...(parsedPayload.name ? { name: parsedPayload.name } : {}),
      ...(parsedPayload.description !== undefined ? { description: parsedPayload.description } : {}),
      ...(parsedPayload.price !== undefined ? { price: parsedPayload.price } : {}),
      ...(parsedPayload.image ? { image: parsedPayload.image } : {}),
      ...(parsedPayload.isAvailable !== undefined ? { isAvailable: parsedPayload.isAvailable } : {}),
    };
    const item = await menuService.updateMenuItem(menuItemId, payload);
    sendSuccess(res, item, "Menu item updated");
  },

  async deleteMenuItem(req: Request, res: Response) {
    const menuItemId = Array.isArray(req.params.id)
      ? req.params.id[0] ?? ""
      : req.params.id ?? "";
    await menuService.deleteMenuItem(menuItemId);
    sendSuccess(res, null, "Menu item deleted");
  },
};
