import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import env from "./env.js";
import healthRoutes from "./routes/healthRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (_req, res) => {
  res.status(200).json({
    message: "ChopMate API is running",
  });
});

app.use("/api/health", healthRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
