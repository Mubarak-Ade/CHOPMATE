import express from "express";

import { asyncHandler } from "../../utils/http.js";
import { planController } from "./plan.controller.js";

const router = express.Router();

router.get("/", asyncHandler(planController.list));

export default router;
