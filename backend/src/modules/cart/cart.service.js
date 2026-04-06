import { createError } from "../../lib/createError.js";
import { menuRepository } from "../menu/menu.repository.js";
import { subscriptionService } from "../subscription/subscription.service.js";
import { cartRepository } from "./cart.repository.js";

const calculateTotal = (items) =>
  items.reduce((sum, item) => sum + Number(item.price) * Number(item.quantity), 0);

export const cartService = {
  addToCart(userId, payload) {
    const menuItem = menuRepository.findItemById(payload.menuItemId);
    if (!menuItem || !menuItem.isAvailable) {
      throw createError(404, "menu item not found");
    }

    subscriptionService.ensureFeatureAccess(menuItem.restaurant, "orders");

    let cart = cartRepository.findByUser(userId);
    if (!cart) {
      cart = cartRepository.create({
        user: userId,
        restaurant: menuItem.restaurant,
        items: [],
        totalAmount: 0,
        updatedAt: new Date().toISOString(),
      });
    }

    if (cart.restaurant && cart.restaurant !== menuItem.restaurant) {
      cart.items = [];
      cart.restaurant = menuItem.restaurant;
    }

    const quantity = Number(payload.quantity || 1);
    const existingLine = cart.items.find((item) => item.menuItem === menuItem._id);
    if (existingLine) {
      existingLine.quantity += quantity;
    } else {
      cart.items.push({
        menuItem: menuItem._id,
        name: menuItem.name,
        price: menuItem.price,
        quantity,
      });
    }

    return cartRepository.update(cart._id, {
      items: cart.items,
      totalAmount: calculateTotal(cart.items),
      updatedAt: new Date().toISOString(),
    });
  },

  getCart(userId) {
    return (
      cartRepository.findByUser(userId) || {
        _id: null,
        user: userId,
        restaurant: null,
        items: [],
        totalAmount: 0,
        updatedAt: null,
      }
    );
  },

  updateCart(userId, payload) {
    const cart = cartRepository.findByUser(userId);
    if (!cart) {
      throw createError(404, "cart not found");
    }

    const line = cart.items.find((item) => item.menuItem === payload.menuItemId);
    if (!line) {
      throw createError(404, "cart item not found");
    }

    line.quantity = Number(payload.quantity);
    cart.items = cart.items.filter((item) => item.quantity > 0);

    return cartRepository.update(cart._id, {
      items: cart.items,
      totalAmount: calculateTotal(cart.items),
      updatedAt: new Date().toISOString(),
    });
  },

  clearCart(userId) {
    cartRepository.deleteByUser(userId);
    return { success: true };
  },
};
