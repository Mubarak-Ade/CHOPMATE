import { Schema, Types, model } from "mongoose";

export type UserRole = "customer" | "owner" | "staff" | "admin";

export interface UserDocument {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  favorites: Types.ObjectId[];
  isVerified: boolean;
  onboardingCompleted: boolean;
  emailVerificationToken?: string;
  emailVerificationExpires?: Date;
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
      enum: ["customer", "owner", "staff", "admin"],
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
    onboardingCompleted: {
      type: Boolean,
      default: false,
    },
    emailVerificationToken: {
      type: String,
    },
    emailVerificationExpires: {
      type: Date,
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
