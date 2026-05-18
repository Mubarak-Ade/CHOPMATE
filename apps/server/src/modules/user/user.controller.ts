import type { Request, Response } from "express";
import { sendSuccess } from "../../shared/utils/response.js";
import { updateProfileSchema } from "./user.validation.js";
import { userService } from "./user.service.js";

export const userController = {
  async getMe(req: Request, res: Response) {
    const user = await userService.getProfile(req.auth!.sub);
    sendSuccess(res, user, "Profile retrieved");
  },

  async updateMe(req: Request, res: Response) {
    const parsedPayload = updateProfileSchema.parse(req.body);
    const payload = {
      ...(parsedPayload.name ? { name: parsedPayload.name } : {}),
    };
    const user = await userService.updateProfile(req.auth!.sub, payload);
    sendSuccess(res, user, "Profile updated");
  },

  async addFavorite(req: Request, res: Response) {
    const restaurantId = Array.isArray(req.params.restaurantId)
      ? req.params.restaurantId[0] ?? ""
      : req.params.restaurantId ?? "";
    const user = await userService.addFavorite(req.auth!.sub, restaurantId);
    sendSuccess(res, user, "Favorite saved", 201);
  },

  async getFavorites(req: Request, res: Response) {
    const favorites = await userService.listFavorites(req.auth!.sub);
    sendSuccess(res, favorites, "Favorites retrieved");
  },
};
