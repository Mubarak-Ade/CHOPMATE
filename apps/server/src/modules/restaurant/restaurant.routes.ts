import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { allowRoles } from "../../middlewares/role.middleware.js";
import { requireVerifiedEmail } from "../../middlewares/verified.middleware.js";
import { asyncHandler } from "../../shared/utils/async-handler.js";
import { restaurantController } from "./restaurant.controller.js";

const router = Router();

router.get("/", asyncHandler(restaurantController.search));
router.get(
  "/onboarding/state",
  authMiddleware,
  allowRoles("owner", "admin"),
  asyncHandler(restaurantController.getOnboardingState),
);
router.get("/mine", authMiddleware, allowRoles("owner", "admin"), asyncHandler(restaurantController.getMyRestaurants));
router.post(
  "/",
  authMiddleware,
  allowRoles("owner", "admin"),
  requireVerifiedEmail,
  asyncHandler(restaurantController.create),
);
router.get("/:id", asyncHandler(restaurantController.getById));
router.patch(
  "/:id",
  authMiddleware,
  allowRoles("owner", "admin"),
  requireVerifiedEmail,
  asyncHandler(restaurantController.update),
);
router.patch(
  "/:id/branding",
  authMiddleware,
  allowRoles("owner", "admin"),
  requireVerifiedEmail,
  asyncHandler(restaurantController.updateBranding),
);
router.patch(
  "/:id/delivery",
  authMiddleware,
  allowRoles("owner", "admin"),
  requireVerifiedEmail,
  asyncHandler(restaurantController.updateDelivery),
);
router.post(
  "/:id/menu-complete",
  authMiddleware,
  allowRoles("owner", "admin"),
  requireVerifiedEmail,
  asyncHandler(restaurantController.completeMenuStep),
);
router.post(
  "/:id/publish",
  authMiddleware,
  allowRoles("owner", "admin"),
  requireVerifiedEmail,
  asyncHandler(restaurantController.publish),
);

export const restaurantRoutes = router;
