import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { allowRoles } from "../../middlewares/role.middleware.js";
import { asyncHandler } from "../../shared/utils/async-handler.js";
import { categoryController } from "./category.controller.js";

const router = Router();

router.post("/", authMiddleware, allowRoles("owner", "admin"), asyncHandler(categoryController.create));
router.get("/:restaurantId", asyncHandler(categoryController.listByRestaurant));

export const categoryRoutes = router;

