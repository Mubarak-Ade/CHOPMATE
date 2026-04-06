import express from "express";

import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { asyncHandler } from "../../utils/http.js";
import { recipeController } from "./recipe.controller.js";

const router = express.Router();

router.post("/", authMiddleware, asyncHandler(recipeController.create));
router.get("/:menuItemId", authMiddleware, asyncHandler(recipeController.getOne));
router.patch("/:id", authMiddleware, asyncHandler(recipeController.update));

export default router;
