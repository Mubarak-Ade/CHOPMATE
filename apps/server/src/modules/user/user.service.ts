import { AppError } from "../../shared/utils/app-error.js";
import { userRepository } from "./user.repository.js";

export const userService = {
  async getProfile(userId: string) {
    const user = await userRepository.findById(userId);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return user;
  },

  async updateProfile(userId: string, payload: { name?: string }) {
    const user = await userRepository.updateById(userId, {
      ...(payload.name ? { name: payload.name } : {}),
    });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return user;
  },

  async addFavorite(userId: string, restaurantId: string) {
    const user = await userRepository.addFavorite(userId, restaurantId);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return user;
  },

  async listFavorites(userId: string) {
    const user = await userRepository.listFavorites(userId);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return user.favorites;
  },
};
