import { paymentService } from "./payment.service.js";

export const paymentController = {
  initialize(req, res) {
    res.status(201).json(paymentService.initializePayment(req.user._id, req.body));
  },

  webhook(req, res) {
    const signature = req.headers["x-chopmate-signature"];
    res.status(200).json(paymentService.handleWebhook(req.body, signature));
  },
};
