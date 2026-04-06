import express from "express";

import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { asyncHandler } from "../../utils/http.js";
import { analyticsController } from "./analytics.controller.js";

const router = express.Router();

router.get("/:restaurantId", authMiddleware, asyncHandler(analyticsController.dashboard));

export default router;
