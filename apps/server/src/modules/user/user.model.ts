import { Schema, Types, model } from "mongoose";

export type UserRole = "customer" | "owner" | "admin";

export interface UserDocument {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  favorites: Types.ObjectId[];
  isVerified: boolean;
  refreshTokenHash?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<UserDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["customer", "owner", "admin"],
      default: "customer",
    },
    favorites: [
      {
        type: Schema.Types.ObjectId,
        ref: "Restaurant",
      },
    ],
    isVerified: {
      type: Boolean,
      default: false,
    },
    refreshTokenHash: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export const UserModel = model<UserDocument>("User", userSchema);

