import { subscriptionService } from "../modules/subscription/subscription.service.js";

export const featureGate = (featureName, restaurantResolver) => (req, _res, next) => {
  try {
    const restaurantId =
      typeof restaurantResolver === "function"
        ? restaurantResolver(req)
        : req.body.restaurantId || req.params.restaurantId || req.query.restaurantId;

    subscriptionService.ensureFeatureAccess(restaurantId, featureName);
    next();
  } catch (error) {
    next(error);
  }
};
