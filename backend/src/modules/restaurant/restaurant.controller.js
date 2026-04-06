import { restaurantService } from "./restaurant.service.js";

export const restaurantController = {
  create(req, res) {
    res.status(201).json(restaurantService.createRestaurant(req.user._id, req.body));
  },

  update(req, res) {
    res.status(200).json(
      restaurantService.updateRestaurant(req.user._id, req.params.id, req.body)
    );
  },

  getOne(req, res) {
    res.status(200).json(restaurantService.getRestaurant(req.params.id));
  },

  search(req, res) {
    res.status(200).json(restaurantService.searchRestaurants(req.query));
  },
};
