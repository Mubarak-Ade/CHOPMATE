import type { NextFunction, Request, Response } from "express";
import { AppError } from "../shared/utils/app-error.js";
import { userRepository } from "../modules/user/user.repository.js";

export const requireVerifiedEmail = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    const user = await userRepository.findById(req.auth!.sub);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    if (!user.isVerified) {
      throw new AppError("Email verification required", 403);
    }

    next();
  } catch (error) {
    next(error);
  }
};
