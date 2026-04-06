import { createError } from "../lib/createError.js";

export const requireRole = (...allowedRoles) => (req, _res, next) => {
  if (!req.user) {
    next(createError(401, "authentication required"));
    return;
  }

  if (!allowedRoles.includes(req.user.role)) {
    next(createError(403, "you do not have permission to access this resource"));
    return;
  }

  next();
};
