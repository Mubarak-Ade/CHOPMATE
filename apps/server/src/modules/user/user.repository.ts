import { Types } from "mongoose";
import { UserModel } from "./user.model.js";

export const userRepository = {
  create: (payload: Record<string, unknown>) => UserModel.create(payload),
  findByEmail: (email: string) => UserModel.findOne({ email: email.toLowerCase() }),
  findById: (userId: string) => UserModel.findById(userId),
  updateById: (userId: string, payload: Record<string, unknown>) =>
    UserModel.findByIdAndUpdate(userId, payload, { new: true }),
  clearRefreshToken: (userId: string) =>
    UserModel.findByIdAndUpdate(userId, { $unset: { refreshTokenHash: 1 } }, { new: true }),
  addFavorite: (userId: string, restaurantId: string) =>
    UserModel.findByIdAndUpdate(
      userId,
      { $addToSet: { favorites: new Types.ObjectId(restaurantId) } },
      { new: true },
    ),
  listFavorites: (userId: string) => UserModel.findById(userId).populate("favorites"),
};
