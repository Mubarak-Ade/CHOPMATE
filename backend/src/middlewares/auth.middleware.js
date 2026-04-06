import { authService } from "../modules/auth/auth.service.js";
import { createError } from "../lib/createError.js";

export const authMiddleware = (req, _res, next) => {
  try {
    const authorization = req.headers.authorization || "";
    const accessToken = authorization.startsWith("Bearer ")
      ? authorization.slice(7)
      : null;

    if (!accessToken) {
      throw createError(401, "missing bearer token");
    }

    req.accessToken = accessToken;
    req.user = authService.getCurrentUser(accessToken);
    next();
  } catch (error) {
    next(error);
  }
};
