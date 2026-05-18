import { Types } from "mongoose";
import { AppError } from "../../shared/utils/app-error.js";
import { buildUniqueSlug } from "../../shared/utils/slug.js";
import { userRepository } from "../user/user.repository.js";
import { categoryRepository } from "../category/category.repository.js";
import { menuRepository } from "../menu/menu.repository.js";
import type { RestaurantAddress, RestaurantDelivery } from "./restaurant.model.js";
import { formatRestaurantAddress } from "./restaurant.model.js";
import { restaurantRepository } from "./restaurant.repository.js";

interface LocationPayload {
  lat: number;
  lng: number;
}

interface CreateRestaurantPayload {
  name: string;
  email?: string | undefined;
  description?: string | undefined;
  cuisineTypes: string[];
  address: RestaurantAddress;
  phoneNumber: string;
  location?: LocationPayload | undefined;
}

interface UpdateRestaurantPayload {
  name?: string | undefined;
  email?: string | undefined;
  description?: string | undefined;
  cuisineTypes?: string[] | undefined;
  address?: RestaurantAddress | undefined;
  phoneNumber?: string | undefined;
  openingHours?: Array<{
    day: string;
    open: string;
    close: string;
    closed: boolean;
  }> | undefined;
  location?: LocationPayload | undefined;
  onboardingStep?: number | undefined;
}

interface BrandingPayload {
  logo?: string | undefined;
  coverImage?: string | undefined;
  description?: string | undefined;
  images?: string[] | undefined;
}

interface DeliveryPayload {
  deliveryFee: number;
  pickupAvailable: boolean;
  deliveryRadiusKm: number;
  prepTimeMinutes: number;
}

const mapLocation = (location?: LocationPayload) =>
  location
    ? {
        location: {
          type: "Point" as const,
          coordinates: [location.lng, location.lat] as [number, number],
        },
      }
    : {};

export const restaurantService = {
  async assertOwner(ownerId: string, restaurantId: string) {
    const restaurant = await restaurantRepository.findById(restaurantId);

    if (!restaurant) {
      throw new AppError("Restaurant not found", 404);
    }

    if (restaurant.owner.toString() !== ownerId) {
      throw new AppError("You can only manage your own restaurant", 403);
    }

    return restaurant;
  },

  async create(ownerId: string, payload: CreateRestaurantPayload) {
    const existingDraft = await restaurantRepository.findOneByOwner(ownerId);

    if (existingDraft) {
      throw new AppError("You already have a restaurant linked to this owner account", 409);
    }

    const slug = buildUniqueSlug(payload.name, new Types.ObjectId().toString());

    return restaurantRepository.create({
      owner: new Types.ObjectId(ownerId),
      name: payload.name,
      slug,
      email: payload.email,
      description: payload.description ?? "",
      cuisine: payload.cuisineTypes,
      address: payload.address,
      phone: payload.phoneNumber,
      status: "draft",
      onboardingStep: 1,
      completedSections: {
        basicInfo: true,
        branding: false,
        menu: false,
        delivery: false,
      },
      ...mapLocation(payload.location),
    });
  },

  async update(ownerId: string, restaurantId: string, payload: UpdateRestaurantPayload) {
    await this.assertOwner(ownerId, restaurantId);

    const updatePayload: Record<string, unknown> = {
      ...(payload.name ? { name: payload.name } : {}),
      ...(payload.email ? { email: payload.email } : {}),
      ...(payload.description !== undefined ? { description: payload.description } : {}),
      ...(payload.cuisineTypes ? { cuisine: payload.cuisineTypes } : {}),
      ...(payload.address ? { address: payload.address } : {}),
      ...(payload.phoneNumber ? { phone: payload.phoneNumber } : {}),
      ...(payload.openingHours ? { openingHours: payload.openingHours } : {}),
      ...(payload.onboardingStep ? { onboardingStep: payload.onboardingStep } : {}),
      ...mapLocation(payload.location),
    };

    if (payload.name || payload.address) {
      updatePayload["completedSections.basicInfo"] = true;
    }

    return restaurantRepository.updateById(restaurantId, updatePayload);
  },

  async updateBranding(ownerId: string, restaurantId: string, payload: BrandingPayload) {
    await this.assertOwner(ownerId, restaurantId);

    const updatePayload: Record<string, unknown> = {
      ...(payload.logo ? { logo: payload.logo } : {}),
      ...(payload.coverImage ? { coverImage: payload.coverImage } : {}),
      ...(payload.description !== undefined ? { description: payload.description } : {}),
      ...(payload.images ? { images: payload.images } : {}),
      "completedSections.branding": true,
      onboardingStep: 3,
    };

    return restaurantRepository.updateById(restaurantId, updatePayload);
  },

  async updateDelivery(ownerId: string, restaurantId: string, payload: DeliveryPayload) {
    await this.assertOwner(ownerId, restaurantId);

    const delivery: RestaurantDelivery = {
      fee: payload.deliveryFee,
      pickupAvailable: payload.pickupAvailable,
      radiusKm: payload.deliveryRadiusKm,
      prepTimeMinutes: payload.prepTimeMinutes,
    };

    return restaurantRepository.updateById(restaurantId, {
      delivery,
      "completedSections.delivery": true,
      onboardingStep: 5,
    });
  },

  async markMenuComplete(ownerId: string, restaurantId: string) {
    await this.assertOwner(ownerId, restaurantId);

    return restaurantRepository.updateById(restaurantId, {
      "completedSections.menu": true,
      onboardingStep: 4,
    });
  },

  async publish(ownerId: string, restaurantId: string) {
    const restaurant = await this.assertOwner(ownerId, restaurantId);
    const categories = await categoryRepository.findByRestaurantId(restaurantId);
    const items = await menuRepository.findMenuItemsByRestaurantId(restaurantId);

    if (!restaurant.completedSections.basicInfo) {
      throw new AppError("Complete basic restaurant information before publishing", 400);
    }

    if (!restaurant.completedSections.branding) {
      throw new AppError("Add branding before publishing", 400);
    }

    if (!restaurant.completedSections.menu || categories.length === 0 || items.length === 0) {
      throw new AppError("Add at least one menu category and item before publishing", 400);
    }

    if (!restaurant.completedSections.delivery) {
      throw new AppError("Configure delivery settings before publishing", 400);
    }

    const updatedRestaurant = await restaurantRepository.updateById(restaurantId, {
      status: "active",
      onboardingStep: 6,
      isOpen: true,
    });

    await userRepository.updateById(ownerId, { onboardingCompleted: true });

    return updatedRestaurant;
  },

  async getOnboardingState(ownerId: string) {
    const user = await userRepository.findById(ownerId);
    const restaurant = await restaurantRepository.findDraftByOwner(ownerId);

    let menuItemCount = 0;
    let categoryCount = 0;

    if (restaurant) {
      const categories = await categoryRepository.findByRestaurantId(restaurant._id.toString());
      const items = await menuRepository.findMenuItemsByRestaurantId(restaurant._id.toString());
      categoryCount = categories.length;
      menuItemCount = items.length;
    }

    return {
      user: user
        ? {
            _id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
            isVerified: user.isVerified,
            onboardingCompleted: user.onboardingCompleted,
          }
        : null,
      restaurant,
      progress: {
        categoryCount,
        menuItemCount,
        formattedAddress: restaurant ? formatRestaurantAddress(restaurant.address) : null,
      },
    };
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
