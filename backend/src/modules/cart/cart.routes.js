import express from "express";

import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { asyncHandler } from "../../utils/http.js";
import { cartController } from "./cart.controller.js";

const router = express.Router();

router.post("/add", authMiddleware, asyncHandler(cartController.add));
router.get("/", authMiddleware, asyncHandler(cartController.get));
router.patch("/update", authMiddleware, asyncHandler(cartController.update));
router.delete("/clear", authMiddleware, asyncHandler(cartController.clear));

export default router;
