import { Types } from "mongoose";
import { RestaurantModel } from "./restaurant.model.js";

interface SearchParams {
  cuisine?: string;
  rating?: number;
  q?: string;
  lat?: number;
  lng?: number;
}

export const restaurantRepository = {
  create: (payload: Record<string, unknown>) => RestaurantModel.create(payload),

  findById: (restaurantId: string) => RestaurantModel.findById(restaurantId),

  findBySlug: (slug: string) => RestaurantModel.findOne({ slug }),

  updateById: (restaurantId: string, payload: Record<string, unknown>) =>
    RestaurantModel.findByIdAndUpdate(restaurantId, payload, { new: true }),

  search: ({ cuisine, rating, q, lat, lng }: SearchParams) => {
    const query: Record<string, unknown> = {
      status: "active",
    };

    if (cuisine) {
      query.cuisine = cuisine;
    }

    if (typeof rating === "number") {
      query.rating = { $gte: rating };
    }

    if (q) {
      query.$text = { $search: q };
    }

    if (typeof lat === "number" && typeof lng === "number") {
      query.location = {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [lng, lat],
          },
          $maxDistance: 10000,
        },
      };
    }

    return RestaurantModel.find(query);
  },

  findOwnedByUser: (userId: string) =>
    RestaurantModel.find({ owner: new Types.ObjectId(userId) }).sort({ createdAt: -1 }),

  findOneByOwner: (userId: string) =>
    RestaurantModel.findOne({
      owner: new Types.ObjectId(userId),
    }),

  findDraftByOwner: (userId: string) =>
    RestaurantModel.findOne({
      owner: new Types.ObjectId(userId),
      status: { $in: ["draft", "pending_review"] },
    }),
};
