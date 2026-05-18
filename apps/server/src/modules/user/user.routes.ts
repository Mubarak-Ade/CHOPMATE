import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { asyncHandler } from "../../shared/utils/async-handler.js";
import { userController } from "./user.controller.js";

const router = Router();

router.get("/me", authMiddleware, asyncHandler(userController.getMe));
router.patch("/me", authMiddleware, asyncHandler(userController.updateMe));
router.post("/favorites/:restaurantId", authMiddleware, asyncHandler(userController.addFavorite));
router.get("/favorites", authMiddleware, asyncHandler(userController.getFavorites));

export const userRoutes = router;

