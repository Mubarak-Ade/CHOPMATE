import { planService } from "./plan.service.js";

export const planController = {
  list(_req, res) {
    res.status(200).json(planService.getPlans());
  },
};
