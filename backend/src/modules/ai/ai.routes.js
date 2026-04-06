import express from "express";

import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { asyncHandler } from "../../utils/http.js";
import { aiController } from "./ai.controller.js";

const router = express.Router();

router.get("/recommendations", authMiddleware, asyncHandler(aiController.recommendations));
router.get("/menu-insights", authMiddleware, asyncHandler(aiController.menuInsights));
router.get("/demand", authMiddleware, asyncHandler(aiController.demand));
router.get("/customers", authMiddleware, asyncHandler(aiController.customers));
router.get("/notifications", authMiddleware, asyncHandler(aiController.notifications));

export default router;
