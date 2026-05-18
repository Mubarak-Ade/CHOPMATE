import type { NextFunction, Request, Response } from "express";
import { AppError } from "../shared/utils/app-error.js";

export const allowRoles = (...roles: Array<"customer" | "owner" | "admin">) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.auth) {
      return next(new AppError("Authentication required", 401));
    }

    if (!roles.includes(req.auth.role)) {
      return next(new AppError("You do not have permission to access this resource", 403));
    }

    next();
  };
};

