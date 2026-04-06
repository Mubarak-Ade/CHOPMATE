import express from "express";

import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { asyncHandler } from "../../utils/http.js";
import { paymentController } from "./payment.controller.js";

const router = express.Router();

router.post("/initialize", authMiddleware, asyncHandler(paymentController.initialize));
router.post("/webhook", asyncHandler(paymentController.webhook));

export default router;
