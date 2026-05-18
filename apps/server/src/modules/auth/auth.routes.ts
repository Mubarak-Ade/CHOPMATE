import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { asyncHandler } from "../../shared/utils/async-handler.js";
import { authController } from "./auth.controller.js";

const router = Router();

router.post("/register", asyncHandler(authController.register));
router.post("/register-owner", asyncHandler(authController.registerOwner));
router.post("/verify-email", asyncHandler(authController.verifyEmail));
router.post("/resend-verification", authMiddleware, asyncHandler(authController.resendVerification));
router.post("/login", asyncHandler(authController.login));
router.post("/refresh", asyncHandler(authController.refresh));
router.post("/logout", authMiddleware, asyncHandler(authController.logout));
router.get("/me", authMiddleware, asyncHandler(authController.me));

export const authRoutes = router;

