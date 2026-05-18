import { CategoryModel, type CategoryDocument } from "./category.model.js";

export const categoryRepository = {
  create: (payload: Partial<CategoryDocument>) => CategoryModel.create(payload),
  findByRestaurantId: (restaurantId: string) => CategoryModel.find({ restaurant: restaurantId }),
};
