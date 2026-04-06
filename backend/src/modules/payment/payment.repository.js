import { memoryStore } from "../../data/memoryStore.js";

export const paymentRepository = {
  create(payload) {
    const payment = {
      _id: memoryStore.nextId("pay"),
      ...payload,
    };

    memoryStore.payments.push(payment);
    return payment;
  },

  findByTransactionId(transactionId) {
    return memoryStore.payments.find(
      (payment) => payment.transactionId === transactionId
    );
  },

  update(transactionId, updates) {
    const payment = this.findByTransactionId(transactionId);
    if (!payment) {
      return null;
    }

    Object.assign(payment, updates);
    return payment;
  },
};
