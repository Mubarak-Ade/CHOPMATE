import { Schema, Types, model } from "mongoose";

export interface RestaurantDocument {
  _id: Types.ObjectId;
  owner: Types.ObjectId;
  name: string;
  description: string;
  cuisine: string[];
  address: string;
  location?: {
    type: "Point";
    coordinates: [number, number];
  };
  phone: string;
  images: string[];
  isOpen: boolean;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}

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
    description: {
      type: String,
      default: "",
    },
    cuisine: {
      type: [String],
      default: [],
    },
    address: {
      type: String,
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
    images: {
      type: [String],
      default: [],
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

export const RestaurantModel = model<RestaurantDocument>("Restaurant", restaurantSchema);

