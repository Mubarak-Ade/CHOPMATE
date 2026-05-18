import type { NextFunction, Request, Response } from "express";
import { AppError } from "../shared/utils/app-error.js";
import { verifyAccessToken } from "../shared/utils/jwt.js";

const ACCESS_COOKIE_NAME = "accessToken";

export const authMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  const token = req.cookies[ACCESS_COOKIE_NAME] as string | undefined;

  if (!token) {
    return next(new AppError("Authentication required", 401));
  }

  try {
    req.auth = verifyAccessToken(token);
    next();
  } catch {
    next(new AppError("Invalid or expired token", 401));
  }
};
