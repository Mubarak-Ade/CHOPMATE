import express from "express";

import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { authorize } from "../../middlewares/authorize.middleware.js";
import { asyncHandler } from "../../utils/http.js";
import { restaurantController } from "./restaurant.controller.js";

const router = express.Router();

router.post("/", authMiddleware, asyncHandler(restaurantController.create));
router.patch(
  "/:id",
  authMiddleware,
  authorize("manage_restaurant", (req) => req.params.id),
  asyncHandler(restaurantController.update)
);
router.get("/:id", asyncHandler(restaurantController.getOne));
router.get("/", asyncHandler(restaurantController.search));

export default router;
