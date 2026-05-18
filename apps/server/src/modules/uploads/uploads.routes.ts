import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { allowRoles } from "../../middlewares/role.middleware.js";
import { asyncHandler } from "../../shared/utils/async-handler.js";
import { uploadsController } from "./uploads.controller.js";

const router = Router();

router.post(
  "/",
  authMiddleware,
  allowRoles("owner", "admin"),
  asyncHandler(uploadsController.registerUrl),
);

export const uploadRoutes = router;
