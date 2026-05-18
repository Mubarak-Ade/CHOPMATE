import type { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { AppError } from "../shared/utils/app-error.js";

export const notFoundMiddleware = (_req: Request, _res: Response, next: NextFunction) => {
  next(new AppError("Route not found", 404,));
};

export const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
      details: error.details,
    });
  }

  if (error instanceof mongoose.Error.ValidationError) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      details: error.errors,
    });
  }

  if (error instanceof mongoose.Error.CastError) {
    return res.status(400).json({
      success: false,
      message: "Invalid identifier",
    });
  }

  console.error(error);

  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};

