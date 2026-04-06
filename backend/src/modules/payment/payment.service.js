import crypto from "node:crypto";

import { env } from "../../config/env.js";
import { createError } from "../../lib/createError.js";
import { generateToken } from "../../utils/generateToken.js";
import { paymentRepository } from "./payment.repository.js";
import { planRepository } from "../plan/plan.repository.js";
import { orderService } from "../order/order.service.js";
import { restaurantRepository } from "../restaurant/restaurant.repository.js";
import { subscriptionService } from "../subscription/subscription.service.js";

const signPayload = (payload) =>
  crypto
    .createHmac("sha256", env.webhookSecret)
    .update(JSON.stringify(payload))
    .digest("hex");

export const paymentService = {
  initializePayment(userId, payload) {
    const { planId, restaurantId, provider = "paystack" } = payload;

    const restaurant = restaurantRepository.findById(restaurantId);
    if (!restaurant) {
      throw createError(404, "restaurant not found");
    }

    if (restaurant.owner !== userId) {
      throw createError(403, "only the restaurant owner can initialize subscription payments");
    }

    const plan = planRepository.findById(planId);
    if (!plan) {
      throw createError(404, "plan not found");
    }

    const transactionId = generateToken();
    const payment = paymentRepository.create({
      user: userId,
      restaurant: restaurantId,
      plan: planId,
      amount: plan.price,
      currency: "NGN",
      status: "pending",
      provider,
      transactionId,
      createdAt: new Date().toISOString(),
    });

    return {
      paymentUrl: `https://payments.chopmate.local/pay/${transactionId}`,
      transactionId,
      webhookSignaturePreview: signPayload({
        event: "payment.success",
        transactionId,
      }),
      payment,
    };
  },

  handleWebhook(payload, signature) {
    const expectedSignature = signPayload(payload);
    if (signature !== expectedSignature) {
      throw createError(401, "invalid webhook signature");
    }

    const payment = paymentRepository.findByTransactionId(payload.transactionId);
    if (!payment) {
      throw createError(404, "payment not found");
    }

    if (payment.status === "success") {
      return payment;
    }

    if (payload.event !== "payment.success") {
      return paymentRepository.update(payment.transactionId, {
        status: "failed",
      });
    }

    const updatedPayment = paymentRepository.update(payment.transactionId, {
      status: "success",
      providerReference: payload.providerReference || null,
    });

    if (updatedPayment.type === "order") {
      orderService.markCheckoutPaid(updatedPayment.transactionId);
    } else {
      subscriptionService.activateSubscription({
        userId: updatedPayment.user,
        restaurantId: updatedPayment.restaurant,
        planId: updatedPayment.plan,
        provider: updatedPayment.provider,
        externalId: payload.providerReference || updatedPayment.transactionId,
      });
    }

    return updatedPayment;
  },
};
