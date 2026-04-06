import { userService } from "./user.service.js";

export const userController = {
  getProfile(req, res) {
    res.status(200).json(userService.getProfile(req.user._id));
  },

  updateProfile(req, res) {
    res.status(200).json(userService.updateProfile(req.user._id, req.body));
  },

  toggleFavorite(req, res) {
    res.status(200).json(userService.toggleFavorite(req.user._id, req.params.restaurantId));
  },

  getFavorites(req, res) {
    res.status(200).json(userService.getFavorites(req.user._id));
  },
};
