import { authRepository } from "../auth/auth.repository.js";
import { menuRepository } from "../menu/menu.repository.js";
import { orderRepository } from "../order/order.repository.js";
import { restaurantRepository } from "../restaurant/restaurant.repository.js";

const averagePrice = (items) => {
  if (!items.length) {
    return 0;
  }

  return items.reduce((sum, item) => sum + Number(item.price || 0), 0) / items.length;
};

export const recommendationService = {
  getRecommendations(userId) {
    const user = authRepository.findUserById(userId);
    const preferences = user?.preferences || { cuisines: [], priceRange: 0 };
    const myOrders = orderRepository.listByUser(userId);
    const orderedRestaurantIds = new Set(myOrders.map((order) => order.restaurant));
    const favoriteRestaurantIds = new Set(user?.favorites || []);
    const cuisines = new Set(preferences.cuisines || []);

    const scoredRestaurants = restaurantRepository.search({}).map((restaurant) => {
      let score = 0;

      if (favoriteRestaurantIds.has(restaurant._id)) {
        score += 5;
      }

      if (orderedRestaurantIds.has(restaurant._id)) {
        score += 4;
      }

      if (restaurant.cuisine.some((entry) => cuisines.has(entry))) {
        score += 3;
      }

      score += Number(restaurant.rating || 0);

      return { restaurant, score };
    });

    const restaurants = scoredRestaurants
      .sort((left, right) => right.score - left.score)
      .slice(0, 4)
      .map((entry) => entry.restaurant);

    const allMenuItems = restaurantRepository
      .search({})
      .flatMap((restaurant) => menuRepository.findItemsByRestaurant(restaurant._id));

    const menuSuggestions = allMenuItems
      .map((item) => {
        const restaurant = restaurantRepository.findById(item.restaurant);
        let score = 0;

        if (favoriteRestaurantIds.has(item.restaurant)) {
          score += 4;
        }

        if (orderedRestaurantIds.has(item.restaurant)) {
          score += 3;
        }

        if (restaurant?.cuisine.some((entry) => cuisines.has(entry))) {
          score += 2;
        }

        const itemRestaurantMenu = menuRepository.findItemsByRestaurant(item.restaurant);
        const priceBand = averagePrice(itemRestaurantMenu);
        if (
          preferences.priceRange &&
          Math.abs(Number(item.price || 0) - priceBand) <= preferences.priceRange * 1500
        ) {
          score += 1;
        }

        return { ...item, score };
      })
      .sort((left, right) => right.score - left.score)
      .slice(0, 6);

    return {
      restaurants,
      menuItems: menuSuggestions,
    };
  },
};
