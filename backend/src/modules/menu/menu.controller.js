import { menuService } from "./menu.service.js";

export const menuController = {
  getByRestaurant(req, res) {
    res.status(200).json(menuService.getMenuByRestaurant(req.params.restaurantId));
  },

  createItem(req, res) {
    res.status(201).json(menuService.createMenuItem(req.user._id, req.body));
  },

  updateItem(req, res) {
    res.status(200).json(menuService.updateMenuItem(req.user._id, req.params.id, req.body));
  },
};
