import { planRepository } from "./plan.repository.js";

export const planService = {
  getPlans() {
    return planRepository.findAll();
  },

  getDefaultPlan() {
    return planRepository.findByName("free");
  },
};
