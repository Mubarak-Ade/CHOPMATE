export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export type UserRole = "customer" | "owner" | "staff" | "admin";

export type RestaurantStatus = "draft" | "pending_review" | "active" | "suspended";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  isVerified: boolean;
  onboardingCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthSession {
  user: User | null;
  verificationToken?: string;
}

export interface RestaurantAddress {
  country: string;
  state: string;
  city: string;
  street: string;
}

export interface RestaurantDelivery {
  fee: number;
  pickupAvailable: boolean;
  radiusKm: number;
  prepTimeMinutes: number;
}

export interface CompletedSections {
  basicInfo: boolean;
  branding: boolean;
  menu: boolean;
  delivery: boolean;
}

export interface Restaurant {
  _id: string;
  owner: string;
  name: string;
  slug: string;
  description: string;
  email?: string;
  cuisine: string[];
  address: RestaurantAddress;
  phone: string;
  logo?: string;
  coverImage?: string;
  images: string[];
  delivery: RestaurantDelivery;
  onboardingStep: number;
  status: RestaurantStatus;
  completedSections: CompletedSections;
  isOpen: boolean;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

export interface OnboardingState {
  user: User | null;
  restaurant: Restaurant | null;
  progress: {
    categoryCount: number;
    menuItemCount: number;
    formattedAddress: string | null;
  };
}

export interface Category {
  _id: string;
  restaurant: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface MenuCategory {
  _id: string;
  name: string;
}

export interface Menu {
  _id: string;
  restaurant: string;
  name: string;
  categories: MenuCategory[];
  createdAt: string;
  updatedAt: string;
}

export interface MenuItem {
  _id: string;
  restaurant: string;
  category:
    | string
    | {
        _id: string;
        name: string;
      };
  name: string;
  description: string;
  price: number;
  image?: string;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface RestaurantMenuResponse {
  menu: Menu | null;
  items: MenuItem[];
}

export interface RestaurantSearchParams {
  q?: string;
  cuisine?: string;
  rating?: number;
}

export const formatAddress = (address: RestaurantAddress) =>
  `${address.street}, ${address.city}, ${address.state}, ${address.country}`;
