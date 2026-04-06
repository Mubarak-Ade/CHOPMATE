import express from "express";

import { asyncHandler } from "../../utils/http.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { requireRole } from "../../middlewares/role.middleware.js";
import { roleController } from "./role.controller.js";

const router = express.Router();

router.get("/", authMiddleware, asyncHandler(roleController.list));
router.post("/", authMiddleware, requireRole("admin"), asyncHandler(roleController.create));

export default router;
