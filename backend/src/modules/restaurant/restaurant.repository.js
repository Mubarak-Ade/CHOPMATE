import { memoryStore } from "../../data/memoryStore.js";

export const restaurantRepository = {
  create(payload) {
    const restaurant = {
      _id: memoryStore.nextId("rst"),
      ...payload,
    };
    memoryStore.restaurants.push(restaurant);
    return restaurant;
  },

  findById(restaurantId) {
    return memoryStore.restaurants.find((restaurant) => restaurant._id === restaurantId);
  },

  update(restaurantId, updates) {
    const restaurant = this.findById(restaurantId);
    if (!restaurant) {
      return null;
    }

    Object.assign(restaurant, updates);
    return restaurant;
  },

  search(filters) {
    const search = String(filters.search || "").toLowerCase();
    const cuisine = String(filters.cuisine || "").toLowerCase();
    const minimumRating = Number(filters.rating || 0);

    return memoryStore.restaurants.filter((restaurant) => {
      const matchesSearch =
        !search ||
        restaurant.name.toLowerCase().includes(search) ||
        restaurant.description.toLowerCase().includes(search);

      const matchesCuisine =
        !cuisine ||
        restaurant.cuisine.some((entry) => entry.toLowerCase().includes(cuisine));

      const matchesRating = Number(restaurant.rating || 0) >= minimumRating;

      return matchesSearch && matchesCuisine && matchesRating;
    });
  },
};
