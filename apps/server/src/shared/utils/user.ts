import type { UserDocument } from "../../modules/user/user.model.js";

export const toPublicUser = (user: UserDocument | null) => {
  if (!user) {
    return null;
  }

  return {
    _id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
    isVerified: user.isVerified,
    onboardingCompleted: user.onboardingCompleted,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};
