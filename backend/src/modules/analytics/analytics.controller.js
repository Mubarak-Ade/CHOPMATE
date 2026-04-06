import { analyticsService } from "./analytics.service.js";

export const analyticsController = {
  dashboard(req, res) {
    res.status(200).json(
      analyticsService.getDashboard(req.user._id, req.params.restaurantId)
    );
  },
};
