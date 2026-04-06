import express from "express";

import { asyncHandler } from "../../utils/http.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { featureGate } from "../../middlewares/featureGate.middleware.js";
import { staffController } from "./staff.controller.js";

const router = express.Router();

router.post(
  "/invite",
  authMiddleware,
  featureGate("staff"),
  asyncHandler(staffController.invite)
);
router.post("/accept-invite", authMiddleware, asyncHandler(staffController.acceptInvite));
router.get("/:restaurantId", authMiddleware, asyncHandler(staffController.list));
router.patch("/:id/role", authMiddleware, asyncHandler(staffController.updateRole));
router.delete("/:id", authMiddleware, asyncHandler(staffController.remove));

export default router;
