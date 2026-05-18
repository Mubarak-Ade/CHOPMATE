import { Schema, Types, model } from "mongoose";

export type RestaurantStatus = "draft" | "pending_review" | "active" | "suspended";

export interface RestaurantAddress {
  country: string;
  state: string;
  city: string;
  street: string;
}

export interface OpeningHour {
  day: string;
  open: string;
  close: string;
  closed: boolean;
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

export interface RestaurantDocument {
  _id: Types.ObjectId;
  owner: Types.ObjectId;
  name: string;
  slug: string;
  description: string;
  email?: string;
  cuisine: string[];
  address: RestaurantAddress;
  location?: {
    type: "Point";
    coordinates: [number, number];
  };
  phone: string;
  logo?: string;
  coverImage?: string;
  images: string[];
  openingHours: OpeningHour[];
  delivery: RestaurantDelivery;
  onboardingStep: number;
  status: RestaurantStatus;
  completedSections: CompletedSections;
  isOpen: boolean;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}

const addressSchema = new Schema<RestaurantAddress>(
  {
    country: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    street: { type: String, required: true, trim: true },
  },
  { _id: false },
);

const openingHourSchema = new Schema<OpeningHour>(
  {
    day: { type: String, required: true },
    open: { type: String, default: "09:00" },
    close: { type: String, default: "22:00" },
    closed: { type: Boolean, default: false },
  },
  { _id: false },
);

const deliverySchema = new Schema<RestaurantDelivery>(
  {
    fee: { type: Number, default: 0, min: 0 },
    pickupAvailable: { type: Boolean, default: true },
    radiusKm: { type: Number, default: 5, min: 0 },
    prepTimeMinutes: { type: Number, default: 30, min: 5 },
  },
  { _id: false },
);

const completedSectionsSchema = new Schema<CompletedSections>(
  {
    basicInfo: { type: Boolean, default: false },
    branding: { type: Boolean, default: false },
    menu: { type: Boolean, default: false },
    delivery: { type: Boolean, default: false },
  },
  { _id: false },
);

const restaurantSchema = new Schema<RestaurantDocument>(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    cuisine: {
      type: [String],
      default: [],
    },
    address: {
      type: addressSchema,
      required: true,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
      },
      coordinates: {
        type: [Number],
      },
    },
    phone: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
    },
    coverImage: {
      type: String,
    },
    images: {
      type: [String],
      default: [],
    },
    openingHours: {
      type: [openingHourSchema],
      default: [],
    },
    delivery: {
      type: deliverySchema,
      default: () => ({}),
    },
    onboardingStep: {
      type: Number,
      default: 1,
      min: 1,
      max: 6,
    },
    status: {
      type: String,
      enum: ["draft", "pending_review", "active", "suspended"],
      default: "draft",
    },
    completedSections: {
      type: completedSectionsSchema,
      default: () => ({}),
    },
    isOpen: {
      type: Boolean,
      default: true,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
  },
  { timestamps: true },
);

restaurantSchema.index({ location: "2dsphere" });
restaurantSchema.index({ name: "text", cuisine: "text" });
restaurantSchema.index({ owner: 1 });

export const formatRestaurantAddress = (address: RestaurantAddress) =>
  `${address.street}, ${address.city}, ${address.state}, ${address.country}`;

export const RestaurantModel = model<RestaurantDocument>("Restaurant", restaurantSchema);
