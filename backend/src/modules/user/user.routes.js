import express from "express";

import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { asyncHandler } from "../../utils/http.js";
import { userController } from "./user.controller.js";

const router = express.Router();

router.get("/me", authMiddleware, asyncHandler(userController.getProfile));
router.patch("/me", authMiddleware, asyncHandler(userController.updateProfile));
router.post(
  "/favorites/:restaurantId",
  authMiddleware,
  asyncHandler(userController.toggleFavorite)
);
router.get("/favorites", authMiddleware, asyncHandler(userController.getFavorites));

export default router;
