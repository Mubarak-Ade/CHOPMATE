import { apiGet, apiPatch, apiPost } from "@/services/api";
import type { Category, MenuItem, OnboardingState, Restaurant, RestaurantMenuResponse } from "@/types/api";

export const getOnboardingState = () => apiGet<OnboardingState>("restaurants/onboarding/state");

export const createRestaurant = (payload: {
  name: string;
  phoneNumber: string;
  email?: string;
  description?: string;
  cuisineTypes: string[];
  address: {
    country: string;
    state: string;
    city: string;
    street: string;
  };
}) => apiPost<Restaurant>("restaurants", payload);

export const updateRestaurant = (restaurantId: string, payload: Record<string, unknown>) =>
  apiPatch<Restaurant>(`restaurants/${restaurantId}`, payload);

export const updateBranding = (
  restaurantId: string,
  payload: { logo?: string; coverImage?: string; description?: string; images?: string[] },
) => apiPatch<Restaurant>(`restaurants/${restaurantId}/branding`, payload);

export const updateDelivery = (
  restaurantId: string,
  payload: {
    deliveryFee: number;
    pickupAvailable: boolean;
    deliveryRadiusKm: number;
    prepTimeMinutes: number;
  },
) => apiPatch<Restaurant>(`restaurants/${restaurantId}/delivery`, payload);

export const publishRestaurant = (restaurantId: string) =>
  apiPost<Restaurant>(`restaurants/${restaurantId}/publish`);

export const completeMenuStep = (restaurantId: string) =>
  apiPost<Restaurant>(`restaurants/${restaurantId}/menu-complete`);

export const registerUploadUrl = (url: string) => apiPost<{ url: string }>("uploads", { url });

export const createCategory = (payload: { restaurantId: string; name: string }) =>
  apiPost<Category>("categories", payload);

export const getCategories = (restaurantId: string) =>
  apiGet<Category[]>(`categories/${restaurantId}`);

export const createMenuItem = (payload: {
  restaurantId: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  image?: string;
}) => apiPost<MenuItem>("menu/items", payload);

export const getRestaurantMenu = (restaurantId: string) =>
  apiGet<RestaurantMenuResponse>(`menu/${restaurantId}`);
