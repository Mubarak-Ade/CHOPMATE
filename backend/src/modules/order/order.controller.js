import { orderService } from "./order.service.js";

export const orderController = {
  checkout(req, res) {
    res.status(201).json(orderService.createOrderFromCart(req.user._id));
  },

  create(req, res) {
    res.status(201).json(orderService.createOrderFromCart(req.user._id));
  },

  myOrders(req, res) {
    res.status(200).json(orderService.getMyOrders(req.user._id));
  },

  restaurantOrders(req, res) {
    res.status(200).json(orderService.getRestaurantOrders(req.user._id, req.params.id));
  },

  updateStatus(req, res) {
    res.status(200).json(
      orderService.updateOrderStatus(req.user._id, req.params.id, req.body.status)
    );
  },
};
