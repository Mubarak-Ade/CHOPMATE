import { cartService } from "./cart.service.js";

export const cartController = {
  add(req, res) {
    res.status(201).json(cartService.addToCart(req.user._id, req.body));
  },

  get(req, res) {
    res.status(200).json(cartService.getCart(req.user._id));
  },

  update(req, res) {
    res.status(200).json(cartService.updateCart(req.user._id, req.body));
  },

  clear(req, res) {
    res.status(200).json(cartService.clearCart(req.user._id));
  },
};
