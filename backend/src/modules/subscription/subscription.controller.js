import { subscriptionService } from "./subscription.service.js";

export const subscriptionController = {
  getCurrent(req, res) {
    res.status(200).json(
      subscriptionService.getSubscriptionForRestaurant(req.params.restaurantId)
    );
  },
};
