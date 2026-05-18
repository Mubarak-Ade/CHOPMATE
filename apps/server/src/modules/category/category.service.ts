import { Types } from "mongoose";
import { categoryRepository } from "./category.repository.js";

export const categoryService = {
  create(payload: { restaurantId: string; name: string }) {
    return categoryRepository.create({
      restaurant: new Types.ObjectId(payload.restaurantId),
      name: payload.name,
    });
  },

  listByRestaurant(restaurantId: string) {
    return categoryRepository.findByRestaurantId(restaurantId);
  },
};

