import { createError } from "../../lib/createError.js";
import { restaurantRepository } from "../restaurant/restaurant.repository.js";
import { planRepository } from "../plan/plan.repository.js";
import { subscriptionRepository } from "./subscription.repository.js";

const normalizeStatus = (subscription) => {
  if (!subscription) {
    return null;
  }

  if (new Date(subscription.endDate).getTime() < Date.now()) {
    subscription.status = "expired";
  }

  return subscription;
};

export const subscriptionService = {
  getSubscriptionForRestaurant(restaurantId) {
    const restaurant = restaurantRepository.findById(restaurantId);
    if (!restaurant) {
      throw createError(404, "restaurant not found");
    }

    const fallbackPlan = planRepository.findByName("free");
    const subscription = normalizeStatus(
      subscriptionRepository.findByRestaurant(restaurantId) || {
        _id: null,
        user: restaurant.owner,
        restaurant: restaurantId,
        plan: fallbackPlan._id,
        status: "trial",
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * fallbackPlan.duration).toISOString(),
        paymentProvider: "paystack",
        externalId: null,
      }
    );

    return {
      subscription,
      plan: planRepository.findById(subscription.plan) || fallbackPlan,
    };
  },

  activateSubscription({ userId, restaurantId, planId, provider, externalId }) {
    const plan = planRepository.findById(planId);
    if (!plan) {
      throw createError(404, "plan not found");
    }

    const startDate = new Date();
    const endDate = new Date(startDate.getTime() + 1000 * 60 * 60 * 24 * plan.duration);

    return subscriptionRepository.upsertByRestaurant(restaurantId, {
      user: userId,
      plan: plan._id,
      status: "active",
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      paymentProvider: provider,
      externalId,
    });
  },

  ensureFeatureAccess(restaurantId, featureName) {
    const { subscription, plan } = this.getSubscriptionForRestaurant(restaurantId);

    if (subscription.status === "expired" || subscription.status === "cancelled") {
      throw createError(403, "subscription has expired");
    }

    if (!plan.features.includes(featureName)) {
      throw createError(403, `current plan does not include ${featureName}`);
    }

    return { subscription, plan };
  },

  getPlanLimit(restaurantId, limitKey) {
    const { plan } = this.getSubscriptionForRestaurant(restaurantId);
    return plan.limits?.[limitKey] ?? null;
  },
};
