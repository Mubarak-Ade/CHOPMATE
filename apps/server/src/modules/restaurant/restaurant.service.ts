import { Types } from "mongoose";
import { AppError } from "../../shared/utils/app-error.js";
import { restaurantRepository } from "./restaurant.repository.js";

interface RestaurantPayload {
  name?: string | undefined;
  description?: string | undefined;
  cuisine?: string[] | undefined;
  address?: string | undefined;
  phone?: string | undefined;
  images?: string[] | undefined;
  isOpen?: boolean | undefined;
  location?: {
    lat: number;
    lng: number;
  } | undefined;
}

const mapRestaurantPayload = (payload: RestaurantPayload) => ({
  ...(payload.name ? { name: payload.name } : {}),
  ...(payload.description !== undefined ? { description: payload.description } : {}),
  ...(payload.cuisine ? { cuisine: payload.cuisine } : {}),
  ...(payload.address ? { address: payload.address } : {}),
  ...(payload.phone ? { phone: payload.phone } : {}),
  ...(payload.images ? { images: payload.images } : {}),
  ...(payload.isOpen !== undefined ? { isOpen: payload.isOpen } : {}),
  ...(payload.location
    ? {
        location: {
          type: "Point" as const,
          coordinates: [payload.location.lng, payload.location.lat] as [number, number],
        },
      }
    : {}),
});

export const restaurantService = {
  create(ownerId: string, payload: RestaurantPayload) {
    return restaurantRepository.create({
      owner: new Types.ObjectId(ownerId),
      ...mapRestaurantPayload(payload),
    });
  },

  async update(ownerId: string, restaurantId: string, payload: RestaurantPayload) {
    const restaurant = await restaurantRepository.findById(restaurantId);

    if (!restaurant) {
      throw new AppError("Restaurant not found", 404);
    }

    if (restaurant.owner.toString() !== ownerId) {
      throw new AppError("You can only update your own restaurant", 403);
    }

    return restaurantRepository.updateById(restaurantId, mapRestaurantPayload(payload));
  },

  async getById(restaurantId: string) {
    const restaurant = await restaurantRepository.findById(restaurantId);

    if (!restaurant) {
      throw new AppError("Restaurant not found", 404);
    }

    return restaurant;
  },

  search(query: {
    cuisine?: string | undefined;
    rating?: number | undefined;
    q?: string | undefined;
    lat?: number | undefined;
    lng?: number | undefined;
  }) {
    return restaurantRepository.search({
      ...(query.cuisine ? { cuisine: query.cuisine } : {}),
      ...(query.rating !== undefined ? { rating: query.rating } : {}),
      ...(query.q ? { q: query.q } : {}),
      ...(query.lat !== undefined ? { lat: query.lat } : {}),
      ...(query.lng !== undefined ? { lng: query.lng } : {}),
    });
  },

  listOwnedByUser(ownerId: string) {
    return restaurantRepository.findOwnedByUser(ownerId);
  },
};
