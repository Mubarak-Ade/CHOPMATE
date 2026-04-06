import express from "express";

import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { asyncHandler } from "../../utils/http.js";
import { orderController } from "./order.controller.js";

const router = express.Router();

router.post("/", authMiddleware, asyncHandler(orderController.create));
router.post("/checkout", authMiddleware, asyncHandler(orderController.checkout));
router.get("/my", authMiddleware, asyncHandler(orderController.myOrders));
router.get("/restaurant/:id", authMiddleware, asyncHandler(orderController.restaurantOrders));
router.patch("/:id/status", authMiddleware, asyncHandler(orderController.updateStatus));

export default router;
