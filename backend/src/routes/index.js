import express from "express";

import analyticsRoutes from "../modules/analytics/analytics.routes.js";
import authRoutes from "../modules/auth/auth.routes.js";
import cartRoutes from "../modules/cart/cart.routes.js";
import inventoryRoutes from "../modules/inventory/inventory.routes.js";
import orderRoutes from "../modules/order/order.routes.js";
import paymentRoutes from "../modules/payment/payment.routes.js";
import planRoutes from "../modules/plan/plan.routes.js";
import recipeRoutes from "../modules/recipe/recipe.routes.js";
import reservationRoutes from "../modules/reservation/reservation.routes.js";
import roleRoutes from "../modules/role/role.routes.js";
import staffRoutes from "../modules/staff/staff.routes.js";
import userRoutes from "../modules/user/user.routes.js";
import restaurantRoutes from "../modules/restaurant/restaurant.routes.js";
import menuRoutes from "../modules/menu/menu.routes.js";
import subscriptionRoutes from "../modules/subscription/subscription.routes.js";
import tableRoutes from "../modules/table/table.routes.js";
import stockRoutes from "../modules/stock/stock.routes.js";
import realtimeRoutes from "../realtime/realtime.routes.js";

const router = express.Router();

router.use("/analytics", analyticsRoutes);
router.use("/auth", authRoutes);
router.use("/cart", cartRoutes);
router.use("/inventory", inventoryRoutes);
router.use("/orders", orderRoutes);
router.use("/users", userRoutes);
router.use("/restaurants", restaurantRoutes);
router.use("/menu", menuRoutes);
router.use("/plans", planRoutes);
router.use("/subscriptions", subscriptionRoutes);
router.use("/payments", paymentRoutes);
router.use("/recipes", recipeRoutes);
router.use("/roles", roleRoutes);
router.use("/staff", staffRoutes);
router.use("/stock", stockRoutes);
router.use("/tables", tableRoutes);
router.use("/reservations", reservationRoutes);
router.use("/realtime", realtimeRoutes);

export default router;
