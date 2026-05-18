import type { Request, Response } from "express";
import { sendSuccess } from "../../shared/utils/response.js";
import { authService } from "./auth.service.js";
import { loginSchema, registerSchema } from "./auth.validation.js";

export const authController = {
  async register(req: Request, res: Response) {
    const parsedPayload = registerSchema.parse(req.body);
    const payload = {
      name: parsedPayload.name,
      email: parsedPayload.email,
      password: parsedPayload.password,
      ...(parsedPayload.role ? { role: parsedPayload.role } : {}),
    };
    const session = await authService.register(payload, res);
    sendSuccess(res, session, "Registration successful", 201);
  },

  async login(req: Request, res: Response) {
    const payload = loginSchema.parse(req.body);
    const session = await authService.login(payload, res);
    sendSuccess(res, session, "Login successful");
  },

  async refresh(req: Request, res: Response) {
    const session = await authService.refresh(req.cookies.refreshToken as string | undefined, res);
    sendSuccess(res, session, "Session refreshed");
  },

  async logout(req: Request, res: Response) {
    await authService.logout(req.auth?.sub, res);
    sendSuccess(res, null, "Logout successful");
  },

  async me(req: Request, res: Response) {
    const user = await authService.me(req.auth!.sub);
    sendSuccess(res, user, "Authenticated user retrieved");
  },
};
