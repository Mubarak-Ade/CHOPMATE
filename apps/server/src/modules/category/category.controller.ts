import type { Request, Response } from "express";
import { sendSuccess } from "../../shared/utils/response.js";
import { categoryService } from "./category.service.js";
import { createCategorySchema } from "./category.validation.js";

export const categoryController = {
  async create(req: Request, res: Response) {
    const payload = createCategorySchema.parse(req.body);
    const category = await categoryService.create(payload);
    sendSuccess(res, category, "Category created", 201);
  },

  async listByRestaurant(req: Request, res: Response) {
    const restaurantId = Array.isArray(req.params.restaurantId)
      ? req.params.restaurantId[0] ?? ""
      : req.params.restaurantId ?? "";
    const categories = await categoryService.listByRestaurant(restaurantId);
    sendSuccess(res, categories, "Categories retrieved");
  },
};
