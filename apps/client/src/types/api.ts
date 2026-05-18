export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface Restaurant {
  _id: string;
  name: string;
  description: string;
  cuisine: string[];
  address: string;
  phone: string;
  images: string[];
  isOpen: boolean;
  rating: number;
  createdAt: string;
  updatedAt: string;
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
