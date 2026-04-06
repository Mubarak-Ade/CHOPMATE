import express from "express";

import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { asyncHandler } from "../../utils/http.js";
import { inventoryController } from "./inventory.controller.js";

const router = express.Router();

router.post("/", authMiddleware, asyncHandler(inventoryController.create));
router.get("/:restaurantId", authMiddleware, asyncHandler(inventoryController.list));
router.patch("/:id", authMiddleware, asyncHandler(inventoryController.update));
router.delete("/:id", authMiddleware, asyncHandler(inventoryController.remove));

export default router;
