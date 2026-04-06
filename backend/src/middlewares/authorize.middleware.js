import { staffService } from "../modules/staff/staff.service.js";

export const authorize = (permission, restaurantResolver) => (req, _res, next) => {
  try {
    const restaurantId =
      typeof restaurantResolver === "function"
        ? restaurantResolver(req)
        : req.body.restaurantId || req.params.restaurantId || req.query.restaurantId;

    staffService.ensurePermission(req.user._id, restaurantId, permission);
    next();
  } catch (error) {
    next(error);
  }
};
