import { createError } from "../../lib/createError.js";
import { staffService } from "../staff/staff.service.js";
import { restaurantRepository } from "./restaurant.repository.js";

export const restaurantService = {
  createRestaurant(ownerId, payload) {
    if (!payload.name || !payload.address) {
      throw createError(400, "name and address are required");
    }

    const restaurant = restaurantRepository.create({
      owner: ownerId,
      name: payload.name,
      description: payload.description || "",
      cuisine: payload.cuisine || [],
      address: payload.address,
      location: payload.location || { type: "Point", coordinates: [0, 0] },
      phone: payload.phone || "",
      images: payload.images || [],
      isOpen: payload.isOpen ?? true,
      rating: payload.rating ?? 0,
      createdAt: new Date().toISOString(),
    });

    staffService.createOwnerMembership(restaurant._id, ownerId);
    return restaurant;
  },

  updateRestaurant(userId, restaurantId, updates) {
    const restaurant = restaurantRepository.findById(restaurantId);
    if (!restaurant) {
      throw createError(404, "restaurant not found");
    }

    return restaurantRepository.update(restaurantId, {
      name: updates.name ?? restaurant.name,
      description: updates.description ?? restaurant.description,
      cuisine: updates.cuisine ?? restaurant.cuisine,
      address: updates.address ?? restaurant.address,
      location: updates.location ?? restaurant.location,
      phone: updates.phone ?? restaurant.phone,
      images: updates.images ?? restaurant.images,
      isOpen: updates.isOpen ?? restaurant.isOpen,
    });
  },

  getRestaurant(restaurantId) {
    const restaurant = restaurantRepository.findById(restaurantId);
    if (!restaurant) {
      throw createError(404, "restaurant not found");
    }

    return restaurant;
  },

  searchRestaurants(filters) {
    return restaurantRepository.search(filters);
  },
};
