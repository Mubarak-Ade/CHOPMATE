import { useQuery } from "@tanstack/react-query";
import { getRestaurants } from "../services/restaurant.api";
import type { RestaurantSearchParams } from "../../../types/api";

export const useRestaurants = (params: RestaurantSearchParams) =>
  useQuery({
    queryKey: ["restaurants", params],
    queryFn: () => getRestaurants(params),
  });
