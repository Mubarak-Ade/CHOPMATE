import express from "express";

import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { featureGate } from "../../middlewares/featureGate.middleware.js";
import { asyncHandler } from "../../utils/http.js";
import { menuController } from "./menu.controller.js";

const router = express.Router();

router.get("/:restaurantId", asyncHandler(menuController.getByRestaurant));
router.post(
  "/items",
  authMiddleware,
  featureGate("add_menu"),
  asyncHandler(menuController.createItem)
);
router.patch("/items/:id", authMiddleware, asyncHandler(menuController.updateItem));

export default router;
