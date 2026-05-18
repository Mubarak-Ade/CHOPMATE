import type { Request, Response } from "express";
import { sendSuccess } from "../../shared/utils/response.js";
import {
  createRestaurantSchema,
  searchRestaurantsSchema,
  updateRestaurantSchema,
} from "./restaurant.validation.js";
import { restaurantService } from "./restaurant.service.js";

export const restaurantController = {
  async create(req: Request, res: Response) {
    const parsedPayload = createRestaurantSchema.parse(req.body);
    const payload = {
      name: parsedPayload.name,
      description: parsedPayload.description,
      cuisine: parsedPayload.cuisine,
      address: parsedPayload.address,
      phone: parsedPayload.phone,
      images: parsedPayload.images,
      ...(parsedPayload.isOpen !== undefined ? { isOpen: parsedPayload.isOpen } : {}),
      ...(parsedPayload.location ? { location: parsedPayload.location } : {}),
    };
    const restaurant = await restaurantService.create(req.auth!.sub, payload);
    sendSuccess(res, restaurant, "Restaurant created", 201);
  },

  async update(req: Request, res: Response) {
    const restaurantId = Array.isArray(req.params.id)
      ? req.params.id[0] ?? ""
      : req.params.id ?? "";
    const parsedPayload = updateRestaurantSchema.parse(req.body);
    const payload = {
      ...(parsedPayload.name ? { name: parsedPayload.name } : {}),
      ...(parsedPayload.description !== undefined ? { description: parsedPayload.description } : {}),
      ...(parsedPayload.cuisine ? { cuisine: parsedPayload.cuisine } : {}),
      ...(parsedPayload.address ? { address: parsedPayload.address } : {}),
      ...(parsedPayload.phone ? { phone: parsedPayload.phone } : {}),
      ...(parsedPayload.images ? { images: parsedPayload.images } : {}),
      ...(parsedPayload.isOpen !== undefined ? { isOpen: parsedPayload.isOpen } : {}),
      ...(parsedPayload.location ? { location: parsedPayload.location } : {}),
    };
    const restaurant = await restaurantService.update(req.auth!.sub, restaurantId, payload);
    sendSuccess(res, restaurant, "Restaurant updated");
  },

  async getById(req: Request, res: Response) {
    const restaurantId = Array.isArray(req.params.id)
      ? req.params.id[0] ?? ""
      : req.params.id ?? "";
    const restaurant = await restaurantService.getById(restaurantId);
    sendSuccess(res, restaurant, "Restaurant retrieved");
  },

  async search(req: Request, res: Response) {
    const parsedQuery = searchRestaurantsSchema.parse(req.query);
    const query = {
      ...(parsedQuery.cuisine ? { cuisine: parsedQuery.cuisine } : {}),
      ...(parsedQuery.rating !== undefined ? { rating: parsedQuery.rating } : {}),
      ...(parsedQuery.q ? { q: parsedQuery.q } : {}),
      ...(parsedQuery.lat !== undefined ? { lat: parsedQuery.lat } : {}),
      ...(parsedQuery.lng !== undefined ? { lng: parsedQuery.lng } : {}),
    };
    const restaurants = await restaurantService.search(query);
    sendSuccess(res, restaurants, "Restaurants retrieved");
  },

  async getMyRestaurants(req: Request, res: Response) {
    const restaurants = await restaurantService.listOwnedByUser(req.auth!.sub);
    sendSuccess(res, restaurants, "Owned restaurants retrieved");
  },
};
