import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Restaurant, RestaurantAddress } from "@/types/api";

export type OnboardingStepId =
  | "welcome"
  | "restaurant-info"
  | "branding"
  | "menu-setup"
  | "delivery"
  | "preview"
  | "publish";

export const ONBOARDING_STEPS: Array<{ id: OnboardingStepId; label: string; step: number }> = [
  { id: "welcome", label: "Welcome", step: 1 },
  { id: "restaurant-info", label: "Restaurant Info", step: 2 },
  { id: "branding", label: "Branding", step: 3 },
  { id: "menu-setup", label: "Menu", step: 4 },
  { id: "delivery", label: "Delivery", step: 5 },
  { id: "preview", label: "Preview", step: 6 },
  { id: "publish", label: "Publish", step: 7 },
];

interface OnboardingDraft {
  name: string;
  email: string;
  phoneNumber: string;
  description: string;
  cuisineTypes: string[];
  address: RestaurantAddress;
  logo: string;
  coverImage: string;
  deliveryFee: number;
  pickupAvailable: boolean;
  deliveryRadiusKm: number;
  prepTimeMinutes: number;
}

interface OnboardingStore {
  restaurantId: string | null;
  currentStep: OnboardingStepId;
  draft: OnboardingDraft;
  setRestaurantId: (restaurantId: string) => void;
  setCurrentStep: (step: OnboardingStepId) => void;
  setDraft: (partial: Partial<OnboardingDraft>) => void;
  hydrateFromRestaurant: (restaurant: Restaurant) => void;
  reset: () => void;
}

const defaultDraft: OnboardingDraft = {
  name: "",
  email: "",
  phoneNumber: "",
  description: "",
  cuisineTypes: [],
  address: {
    country: "Nigeria",
    state: "",
    city: "",
    street: "",
  },
  logo: "",
  coverImage: "",
  deliveryFee: 0,
  pickupAvailable: true,
  deliveryRadiusKm: 5,
  prepTimeMinutes: 30,
};

export const useOnboardingStore = create<OnboardingStore>()(
  persist(
    (set) => ({
      restaurantId: null,
      currentStep: "welcome",
      draft: defaultDraft,
      setRestaurantId: (restaurantId) => set({ restaurantId }),
      setCurrentStep: (currentStep) => set({ currentStep }),
      setDraft: (partial) =>
        set((state) => ({
          draft: { ...state.draft, ...partial },
        })),
      hydrateFromRestaurant: (restaurant) =>
        set({
          restaurantId: restaurant._id,
          draft: {
            name: restaurant.name,
            email: restaurant.email ?? "",
            phoneNumber: restaurant.phone,
            description: restaurant.description,
            cuisineTypes: restaurant.cuisine,
            address: restaurant.address,
            logo: restaurant.logo ?? "",
            coverImage: restaurant.coverImage ?? "",
            deliveryFee: restaurant.delivery?.fee ?? 0,
            pickupAvailable: restaurant.delivery?.pickupAvailable ?? true,
            deliveryRadiusKm: restaurant.delivery?.radiusKm ?? 5,
            prepTimeMinutes: restaurant.delivery?.prepTimeMinutes ?? 30,
          },
        }),
      reset: () =>
        set({
          restaurantId: null,
          currentStep: "welcome",
          draft: defaultDraft,
        }),
    }),
    {
      name: "chopmate-onboarding",
    },
  ),
);
