import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { env } from "../config/env.js";
import { errorMiddleware, notFoundMiddleware } from "../middlewares/error.middleware.js";
import { apiRoutes } from "./routes.js";

export const createApp = () => {
  const app = express();

  app.use(
    cors({
      origin: env.CLIENT_ORIGIN,
      credentials: true,
    }),
  );
  app.use(express.json());
  app.use(cookieParser());

  app.use("/api", apiRoutes);
  app.use(notFoundMiddleware);
  app.use(errorMiddleware);

  return app;
};

