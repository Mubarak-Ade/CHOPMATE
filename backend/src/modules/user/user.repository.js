import { memoryStore } from "../../data/memoryStore.js";

export const userRepository = {
  findById(userId) {
    return memoryStore.users.find((user) => user._id === userId);
  },

  update(userId, updates) {
    const user = this.findById(userId);
    if (!user) {
      return null;
    }

    Object.assign(user, updates);
    return user;
  },

  findFavoriteRestaurants(restaurantIds) {
    return memoryStore.restaurants.filter((restaurant) =>
      restaurantIds.includes(restaurant._id)
    );
  },
};
