import { apiRequest } from "../../../services/api";
import type {
  Category,
  Restaurant,
  RestaurantMenuResponse,
  RestaurantSearchParams,
} from "../../../types/api";

export const getRestaurants = (params: RestaurantSearchParams) =>
  apiRequest<Restaurant[]>("restaurants", { ...params });

export const getRestaurantById = (restaurantId: string) =>
  apiRequest<Restaurant>(`restaurants/${restaurantId}`);

export const getRestaurantCategories = (restaurantId: string) =>
  apiRequest<Category[]>(`categories/${restaurantId}`);

export const getRestaurantMenu = (restaurantId: string) =>
  apiRequest<RestaurantMenuResponse>(`menu/${restaurantId}`);
