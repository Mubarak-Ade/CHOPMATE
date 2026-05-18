import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { allowRoles } from "../../middlewares/role.middleware.js";
import { asyncHandler } from "../../shared/utils/async-handler.js";
import { restaurantController } from "./restaurant.controller.js";

const router = Router();

router.get("/", asyncHandler(restaurantController.search));
router.get("/mine", authMiddleware, allowRoles("owner", "admin"), asyncHandler(restaurantController.getMyRestaurants));
router.post("/", authMiddleware, allowRoles("owner", "admin"), asyncHandler(restaurantController.create));
router.get("/:id", asyncHandler(restaurantController.getById));
router.patch("/:id", authMiddleware, allowRoles("owner", "admin"), asyncHandler(restaurantController.update));

export const restaurantRoutes = router;

