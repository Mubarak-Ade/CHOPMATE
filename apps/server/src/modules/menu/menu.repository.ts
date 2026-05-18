import { Types } from "mongoose";
import { MenuItemModel, MenuModel } from "./menu.model.js";

export const menuRepository = {
  createMenu: (payload: Record<string, unknown>) => MenuModel.create(payload),
  findMenuByRestaurantId: (restaurantId: string) =>
    MenuModel.findOne({ restaurant: new Types.ObjectId(restaurantId) }).populate("categories"),
  createMenuItem: (payload: Record<string, unknown>) => MenuItemModel.create(payload),
  findMenuItemsByRestaurantId: (restaurantId: string) =>
    MenuItemModel.find({ restaurant: new Types.ObjectId(restaurantId) }).populate("category"),
  findMenuItemById: (menuItemId: string) => MenuItemModel.findById(menuItemId),
  updateMenuItemById: (menuItemId: string, payload: Record<string, unknown>) =>
    MenuItemModel.findByIdAndUpdate(menuItemId, payload, { new: true }),
  deleteMenuItemById: (menuItemId: string) => MenuItemModel.findByIdAndDelete(menuItemId),
};
