import express from "express";

import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { asyncHandler } from "../../utils/http.js";
import { stockController } from "./stock.controller.js";

const router = express.Router();

router.get("/history/:inventoryItemId", authMiddleware, asyncHandler(stockController.history));

export default router;
