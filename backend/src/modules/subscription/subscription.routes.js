import express from "express";

import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { asyncHandler } from "../../utils/http.js";
import { subscriptionController } from "./subscription.controller.js";

const router = express.Router();

router.get("/:restaurantId", authMiddleware, asyncHandler(subscriptionController.getCurrent));

export default router;
