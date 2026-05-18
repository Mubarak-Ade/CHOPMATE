import { Types } from "mongoose";
import { restaurantService } from "../restaurant/restaurant.service.js";
import { categoryRepository } from "./category.repository.js";

export const categoryService = {
  async create(ownerId: string, payload: { restaurantId: string; name: string }) {
    await restaurantService.assertOwner(ownerId, payload.restaurantId);

    return categoryRepository.create({
      restaurant: new Types.ObjectId(payload.restaurantId),
      name: payload.name,
    });
  },

  listByRestaurant(restaurantId: string) {
    return categoryRepository.findByRestaurantId(restaurantId);
  },
};
