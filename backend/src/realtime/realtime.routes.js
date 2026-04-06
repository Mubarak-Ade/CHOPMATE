import express from "express";

import { authService } from "../modules/auth/auth.service.js";
import { staffRepository } from "../modules/staff/staff.repository.js";
import { realtimeEvents } from "./events.js";
import { realtimeHub } from "./socket.js";

const router = express.Router();

router.get("/events", (req, res, next) => {
  try {
    const accessToken =
      req.headers.authorization?.startsWith("Bearer ")
        ? req.headers.authorization.slice(7)
        : req.query.token;

    const user = authService.getCurrentUser(accessToken);
    const memberships = staffRepository
      .listMembershipsByUser(user._id)
      .filter((membership) => membership.isActive);

    const channels = [
      `user:${user._id}`,
      ...memberships.map((membership) => `restaurant:${membership.restaurant}`),
    ];

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders?.();

    const unsubscribers = channels.map((channel) =>
      realtimeHub.subscribe(channel, (payload) => {
        res.write(`data: ${JSON.stringify({ channel, ...payload })}\n\n`);
      })
    );

    res.write(
      `data: ${JSON.stringify({
        type: realtimeEvents.CONNECTION_READY,
        channels,
        timestamp: new Date().toISOString(),
      })}\n\n`
    );

    req.on("close", () => {
      unsubscribers.forEach((unsubscribe) => unsubscribe());
      res.end();
    });
  } catch (error) {
    next(error);
  }
});

export default router;
