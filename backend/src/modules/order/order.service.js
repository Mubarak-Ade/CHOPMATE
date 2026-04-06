import { createError } from "../../lib/createError.js";
import { emitOrderCreated, emitOrderUpdated } from "../../realtime/handlers/order.handler.js";
import { authRepository } from "../auth/auth.repository.js";
import { cartRepository } from "../cart/cart.repository.js";
import { inventoryService } from "../inventory/inventory.service.js";
import { menuRepository } from "../menu/menu.repository.js";
import { paymentRepository } from "../payment/payment.repository.js";
import { restaurantRepository } from "../restaurant/restaurant.repository.js";
import { staffService } from "../staff/staff.service.js";
import { subscriptionService } from "../subscription/subscription.service.js";
import { orderRepository } from "./order.repository.js";

const calculateTotal = (items) =>
  items.reduce((sum, item) => sum + Number(item.price) * Number(item.quantity), 0);

const enrichOrder = (order) => ({
  ...order,
  user: authRepository.findUserById(order.user) || null,
  restaurant: restaurantRepository.findById(order.restaurant) || null,
});

export const orderService = {
  createOrderFromCart(userId) {
    const cart = cartRepository.findByUser(userId);
    if (!cart || !cart.items.length) {
      throw createError(400, "cart is empty");
    }

    subscriptionService.ensureFeatureAccess(cart.restaurant, "orders");

    const existingOpenOrder = orderRepository.findOpenCheckoutForUser(userId);
    if (existingOpenOrder) {
      return {
        order: enrichOrder(existingOpenOrder),
        paymentUrl: existingOpenOrder.paymentUrl,
        duplicateCheckoutPrevented: true,
      };
    }

    const validatedItems = cart.items.map((item) => {
      const menuItem = menuRepository.findItemById(item.menuItem);
      if (!menuItem || !menuItem.isAvailable) {
        throw createError(400, `menu item ${item.name} is no longer available`);
      }

      return {
        menuItem: menuItem._id,
        name: menuItem.name,
        price: Number(menuItem.price),
        quantity: Number(item.quantity),
      };
    });

    const totalAmount = calculateTotal(validatedItems);
    const payment = paymentRepository.create({
      user: userId,
      restaurant: cart.restaurant,
      plan: null,
      amount: totalAmount,
      currency: "NGN",
      status: "pending",
      provider: "paystack",
      transactionId: `ordpay_${Date.now()}_${Math.random().toString(16).slice(2, 8)}`,
      createdAt: new Date().toISOString(),
      type: "order",
    });

    const order = orderRepository.create({
      user: userId,
      restaurant: cart.restaurant,
      items: validatedItems,
      totalAmount,
      status: "pending",
      paymentStatus: "pending",
      paymentId: payment._id,
      paymentUrl: `https://payments.chopmate.local/order/${payment.transactionId}`,
      createdAt: new Date().toISOString(),
    });

    emitOrderCreated(order);

    return {
      order: enrichOrder(order),
      paymentUrl: order.paymentUrl,
    };
  },

  markCheckoutPaid(transactionId) {
    const payment = paymentRepository.findByTransactionId(transactionId);
    if (!payment || payment.type !== "order") {
      return null;
    }

    if (payment.status === "success") {
      const order = orderRepository.listByUser(payment.user).find(
        (entry) => entry.paymentId === payment._id
      );
      return order ? enrichOrder(order) : null;
    }

    paymentRepository.update(transactionId, { status: "success" });
    const order = orderRepository.listByUser(payment.user).find(
      (entry) => entry.paymentId === payment._id
    );
    if (!order) {
      return null;
    }

    orderRepository.update(order._id, {
      paymentStatus: "paid",
      status: "paid",
    });

    inventoryService.deductInventoryForOrder(orderRepository.findById(order._id));
    emitOrderUpdated(orderRepository.findById(order._id));

    cartRepository.deleteByUser(payment.user);
    return enrichOrder(orderRepository.findById(order._id));
  },

  getMyOrders(userId) {
    return orderRepository.listByUser(userId).map(enrichOrder);
  },

  getRestaurantOrders(userId, restaurantId) {
    staffService.ensurePermission(userId, restaurantId, "view_orders");
    return orderRepository.listByRestaurant(restaurantId).map(enrichOrder);
  },

  getRestaurantOrdersRaw(restaurantId) {
    return orderRepository.listByRestaurant(restaurantId);
  },

  updateOrderStatus(userId, orderId, status) {
    const order = orderRepository.findById(orderId);
    if (!order) {
      throw createError(404, "order not found");
    }

    staffService.ensurePermission(userId, order.restaurant, "manage_orders");

    if (!["pending", "paid", "preparing", "ready", "completed", "cancelled"].includes(status)) {
      throw createError(400, "invalid order status");
    }

    const nextPaymentStatus =
      status === "cancelled"
        ? order.paymentStatus
        : ["paid", "preparing", "ready", "completed"].includes(status)
          ? "paid"
          : order.paymentStatus;

    const updatedOrder = orderRepository.update(orderId, {
      status,
      paymentStatus: nextPaymentStatus,
    });

    if (["paid", "preparing", "ready", "completed"].includes(status)) {
      inventoryService.deductInventoryForOrder(updatedOrder);
    }

    emitOrderUpdated(updatedOrder);

    return enrichOrder(updatedOrder);
  },
};
