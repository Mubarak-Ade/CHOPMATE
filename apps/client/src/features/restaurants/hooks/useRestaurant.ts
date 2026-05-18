import { useQuery } from "@tanstack/react-query";
import {
  getRestaurantById,
  getRestaurantCategories,
  getRestaurantMenu,
} from "../services/restaurant.api";

export const useRestaurant = (restaurantId: string) =>
  useQuery({
    queryKey: ["restaurants", restaurantId],
    queryFn: () => getRestaurantById(restaurantId),
    enabled: Boolean(restaurantId),
  });

export const useRestaurantCategories = (restaurantId: string) =>
  useQuery({
    queryKey: ["categories", restaurantId],
    queryFn: () => getRestaurantCategories(restaurantId),
    enabled: Boolean(restaurantId),
  });

export const useRestaurantMenu = (restaurantId: string) =>
  useQuery({
    queryKey: ["menu", restaurantId],
    queryFn: () => getRestaurantMenu(restaurantId),
    enabled: Boolean(restaurantId),
  });
