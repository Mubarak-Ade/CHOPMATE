import { memoryStore } from "../../data/memoryStore.js";

export const planRepository = {
  findAll() {
    return memoryStore.plans;
  },

  findById(planId) {
    return memoryStore.plans.find((plan) => plan._id === planId);
  },

  findByName(name) {
    return memoryStore.plans.find((plan) => plan.name === name);
  },
};
