import { createError } from "../../lib/createError.js";
import { userRepository } from "./user.repository.js";

const sanitizeUser = (user) => {
  const { password, ...safeUser } = user;
  return safeUser;
};

export const userService = {
  getProfile(userId) {
    const user = userRepository.findById(userId);
    if (!user) {
      throw createError(404, "user not found");
    }

    return {
      ...sanitizeUser(user),
      favorites: userRepository.findFavoriteRestaurants(user.favorites || []),
    };
  },

  updateProfile(userId, updates) {
    const currentUser = userRepository.findById(userId);
    if (!currentUser) {
      throw createError(404, "user not found");
    }

    const nextUser = userRepository.update(userId, {
      name: updates.name ?? currentUser.name,
      isVerified: updates.isVerified ?? currentUser.isVerified,
    });

    return this.getProfile(nextUser._id);
  },

  toggleFavorite(userId, restaurantId) {
    const currentUser = userRepository.findById(userId);
    if (!currentUser) {
      throw createError(404, "user not found");
    }

    const currentFavorites = currentUser.favorites || [];
    const hasFavorite = currentFavorites.includes(restaurantId);

    userRepository.update(userId, {
      favorites: hasFavorite
        ? currentFavorites.filter((entry) => entry !== restaurantId)
        : [...currentFavorites, restaurantId],
    });

    return this.getProfile(userId);
  },

  getFavorites(userId) {
    return this.getProfile(userId).favorites;
  },
};
