import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { allowRoles } from "../../middlewares/role.middleware.js";
import { asyncHandler } from "../../shared/utils/async-handler.js";
import { menuController } from "./menu.controller.js";

const router = Router();

router.post("/", authMiddleware, allowRoles("owner", "admin"), asyncHandler(menuController.createMenu));
router.get("/:restaurantId", asyncHandler(menuController.getMenu));
router.post("/items", authMiddleware, allowRoles("owner", "admin"), asyncHandler(menuController.createMenuItem));
router.patch("/items/:id", authMiddleware, allowRoles("owner", "admin"), asyncHandler(menuController.updateMenuItem));
router.delete("/items/:id", authMiddleware, allowRoles("owner", "admin"), asyncHandler(menuController.deleteMenuItem));

export const menuRoutes = router;

