import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.routes.js";
import { categoryRoutes } from "../modules/category/category.routes.js";
import { menuRoutes } from "../modules/menu/menu.routes.js";
import { restaurantRoutes } from "../modules/restaurant/restaurant.routes.js";
import { userRoutes } from "../modules/user/user.routes.js";

const router = Router();

router.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Chopmate API is healthy",
  });
});

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/restaurants", restaurantRoutes);
router.use("/menu", menuRoutes);
router.use("/categories", categoryRoutes);

export const apiRoutes = router;

