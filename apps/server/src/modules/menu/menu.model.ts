import { Schema, Types, model } from "mongoose";

export interface MenuDocument {
  _id: Types.ObjectId;
  restaurant: Types.ObjectId;
  name: string;
  categories: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

export interface MenuItemDocument {
  _id: Types.ObjectId;
  restaurant: Types.ObjectId;
  category: Types.ObjectId;
  name: string;
  description: string;
  price: number;
  image?: string;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const menuSchema = new Schema<MenuDocument>(
  {
    restaurant: {
      type: Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
  },
  { timestamps: true },
);

const menuItemSchema = new Schema<MenuItemDocument>(
  {
    restaurant: {
      type: Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    image: {
      type: String,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export const MenuModel = model<MenuDocument>("Menu", menuSchema);
export const MenuItemModel = model<MenuItemDocument>("MenuItem", menuItemSchema);

