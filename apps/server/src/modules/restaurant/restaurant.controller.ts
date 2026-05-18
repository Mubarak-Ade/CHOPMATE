import type { Request, Response } from "express";
import { sendSuccess } from "../../shared/utils/response.js";
import {
  brandingSchema,
  createRestaurantSchema,
  deliverySchema,
  searchRestaurantsSchema,
  updateRestaurantSchema,
} from "./restaurant.validation.js";
import { restaurantService } from "./restaurant.service.js";

export const restaurantController = {
  async create(req: Request, res: Response) {
    const parsedPayload = createRestaurantSchema.parse(req.body);
    const restaurant = await restaurantService.create(req.auth!.sub, {
      name: parsedPayload.name,
      description: parsedPayload.description,
      cuisineTypes: parsedPayload.cuisineTypes,
      address: parsedPayload.address,
      phoneNumber: parsedPayload.phoneNumber,
      ...(parsedPayload.email ? { email: parsedPayload.email } : {}),
      ...(parsedPayload.location ? { location: parsedPayload.location } : {}),
    });
    sendSuccess(res, restaurant, "Restaurant draft created", 201);
  },

  async update(req: Request, res: Response) {
    const restaurantId = Array.isArray(req.params.id) ? req.params.id[0] ?? "" : req.params.id ?? "";
    const parsedPayload = updateRestaurantSchema.parse(req.body);
    const restaurant = await restaurantService.update(req.auth!.sub, restaurantId, {
      ...(parsedPayload.name ? { name: parsedPayload.name } : {}),
      ...(parsedPayload.email ? { email: parsedPayload.email } : {}),
      ...(parsedPayload.description !== undefined ? { description: parsedPayload.description } : {}),
      ...(parsedPayload.cuisineTypes ? { cuisineTypes: parsedPayload.cuisineTypes } : {}),
      ...(parsedPayload.address ? { address: parsedPayload.address } : {}),
      ...(parsedPayload.phoneNumber ? { phoneNumber: parsedPayload.phoneNumber } : {}),
      ...(parsedPayload.openingHours ? { openingHours: parsedPayload.openingHours } : {}),
      ...(parsedPayload.onboardingStep ? { onboardingStep: parsedPayload.onboardingStep } : {}),
      ...(parsedPayload.location ? { location: parsedPayload.location } : {}),
    });
    sendSuccess(res, restaurant, "Restaurant updated");
  },

  async updateBranding(req: Request, res: Response) {
    const restaurantId = Array.isArray(req.params.id) ? req.params.id[0] ?? "" : req.params.id ?? "";
    const parsedPayload = brandingSchema.parse(req.body);
    const restaurant = await restaurantService.updateBranding(req.auth!.sub, restaurantId, {
      ...(parsedPayload.logo ? { logo: parsedPayload.logo } : {}),
      ...(parsedPayload.coverImage ? { coverImage: parsedPayload.coverImage } : {}),
      ...(parsedPayload.description !== undefined ? { description: parsedPayload.description } : {}),
      ...(parsedPayload.images ? { images: parsedPayload.images } : {}),
    });
    sendSuccess(res, restaurant, "Branding updated");
  },

  async updateDelivery(req: Request, res: Response) {
    const restaurantId = Array.isArray(req.params.id) ? req.params.id[0] ?? "" : req.params.id ?? "";
    const parsedPayload = deliverySchema.parse(req.body);
    const restaurant = await restaurantService.updateDelivery(req.auth!.sub, restaurantId, {
      deliveryFee: parsedPayload.deliveryFee,
      pickupAvailable: parsedPayload.pickupAvailable,
      deliveryRadiusKm: parsedPayload.deliveryRadiusKm,
      prepTimeMinutes: parsedPayload.prepTimeMinutes,
    });
    sendSuccess(res, restaurant, "Delivery settings updated");
  },

  async publish(req: Request, res: Response) {
    const restaurantId = Array.isArray(req.params.id) ? req.params.id[0] ?? "" : req.params.id ?? "";
    const restaurant = await restaurantService.publish(req.auth!.sub, restaurantId);
    sendSuccess(res, restaurant, "Restaurant published");
  },

  async completeMenuStep(req: Request, res: Response) {
    const restaurantId = Array.isArray(req.params.id) ? req.params.id[0] ?? "" : req.params.id ?? "";
    const restaurant = await restaurantService.markMenuComplete(req.auth!.sub, restaurantId);
    sendSuccess(res, restaurant, "Menu step marked complete");
  },

  async getOnboardingState(req: Request, res: Response) {
    const state = await restaurantService.getOnboardingState(req.auth!.sub);
    sendSuccess(res, state, "Onboarding state retrieved");
  },

  async getById(req: Request, res: Response) {
    const restaurantId = Array.isArray(req.params.id) ? req.params.id[0] ?? "" : req.params.id ?? "";
    const restaurant = await restaurantService.getById(restaurantId);
    sendSuccess(res, restaurant, "Restaurant retrieved");
  },

  async search(req: Request, res: Response) {
    const parsedQuery = searchRestaurantsSchema.parse(req.query);
    const restaurants = await restaurantService.search({
      ...(parsedQuery.cuisine ? { cuisine: parsedQuery.cuisine } : {}),
      ...(parsedQuery.rating !== undefined ? { rating: parsedQuery.rating } : {}),
      ...(parsedQuery.q ? { q: parsedQuery.q } : {}),
      ...(parsedQuery.lat !== undefined ? { lat: parsedQuery.lat } : {}),
      ...(parsedQuery.lng !== undefined ? { lng: parsedQuery.lng } : {}),
    });
    sendSuccess(res, restaurants, "Restaurants retrieved");
  },

  async getMyRestaurants(req: Request, res: Response) {
    const restaurants = await restaurantService.listOwnedByUser(req.auth!.sub);
    sendSuccess(res, restaurants, "Owned restaurants retrieved");
  },
};
