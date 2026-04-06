import express from "express";

import { authController } from "./auth.controller.js";
import { asyncHandler } from "../../utils/http.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", asyncHandler(authController.register));
router.post("/login", asyncHandler(authController.login));
router.post("/refresh", asyncHandler(authController.refresh));
router.post("/logout", authMiddleware, asyncHandler(authController.logout));
router.get("/me", authMiddleware, asyncHandler(authController.me));

export default router;
