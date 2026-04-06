import express from "express";

import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { asyncHandler } from "../../utils/http.js";
import { tableController } from "./table.controller.js";

const router = express.Router();

router.post("/", authMiddleware, asyncHandler(tableController.create));
router.get("/:restaurantId", authMiddleware, asyncHandler(tableController.list));
router.patch("/:id", authMiddleware, asyncHandler(tableController.update));
router.delete("/:id", authMiddleware, asyncHandler(tableController.remove));

export default router;
