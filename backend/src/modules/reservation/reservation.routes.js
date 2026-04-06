import express from "express";

import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { asyncHandler } from "../../utils/http.js";
import { reservationController } from "./reservation.controller.js";

const router = express.Router();

router.get("/availability", authMiddleware, asyncHandler(reservationController.availability));
router.post("/", authMiddleware, asyncHandler(reservationController.create));
router.get("/my", authMiddleware, asyncHandler(reservationController.myReservations));
router.get(
  "/restaurant/:id",
  authMiddleware,
  asyncHandler(reservationController.restaurantReservations)
);
router.patch("/:id/status", authMiddleware, asyncHandler(reservationController.updateStatus));
router.delete("/:id", authMiddleware, asyncHandler(reservationController.remove));

export default router;
