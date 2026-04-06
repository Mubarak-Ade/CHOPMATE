import { aiService } from "./ai.service.js";

export const aiController = {
  recommendations(req, res) {
    res.status(200).json(aiService.getRecommendations(req.user._id));
  },

  menuInsights(req, res) {
    res.status(200).json(aiService.getMenuInsights(req.user._id, req.query.restaurantId));
  },

  demand(req, res) {
    res.status(200).json(aiService.getDemand(req.user._id, req.query.restaurantId));
  },

  customers(req, res) {
    res.status(200).json(aiService.getCustomers(req.user._id, req.query.restaurantId));
  },

  notifications(req, res) {
    res.status(200).json(
      aiService.getSmartNotifications(req.user._id, req.query.restaurantId)
    );
  },
};
