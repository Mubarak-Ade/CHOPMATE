import type { Response } from "express";
import { env } from "../../config/env.js";
import { AppError } from "../../shared/utils/app-error.js";
import { compareHash, hashValue } from "../../shared/utils/hash.js";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "../../shared/utils/jwt.js";
import { userRepository } from "../user/user.repository.js";
import type { UserRole } from "../user/user.model.js";

const ACCESS_COOKIE_NAME = "accessToken";
const REFRESH_COOKIE_NAME = "refreshToken";

const buildTokenPayload = (user: { _id: { toString(): string }; email: string; role: UserRole }) => ({
  sub: user._id.toString(),
  email: user.email,
  role: user.role,
});

const buildCookieOptions = (maxAge: number) => ({
  httpOnly: true,
  sameSite: "lax" as const,
  secure: env.NODE_ENV === "production",
  domain: env.COOKIE_DOMAIN || undefined,
  maxAge,
});

const setAccessCookie = (res: Response, accessToken: string) => {
  res.cookie(ACCESS_COOKIE_NAME, accessToken, buildCookieOptions(env.ACCESS_COOKIE_MAX_AGE_MS));
};

const setRefreshCookie = (res: Response, refreshToken: string) => {
  res.cookie(REFRESH_COOKIE_NAME, refreshToken, buildCookieOptions(env.REFRESH_COOKIE_MAX_AGE_MS));
};

const clearAccessCookie = (res: Response) => {
  res.clearCookie(ACCESS_COOKIE_NAME, {
    httpOnly: true,
    sameSite: "lax",
    secure: env.NODE_ENV === "production",
    domain: env.COOKIE_DOMAIN || undefined,
  });
};

const clearRefreshCookie = (res: Response) => {
  res.clearCookie(REFRESH_COOKIE_NAME, {
    httpOnly: true,
    sameSite: "lax",
    secure: env.NODE_ENV === "production",
    domain: env.COOKIE_DOMAIN || undefined,
  });
};

export const authService = {
  async register(
    payload: { name: string; email: string; password: string; role?: UserRole | undefined },
    res: Response,
  ) {
    const existingUser = await userRepository.findByEmail(payload.email);

    if (existingUser) {
      throw new AppError("Email is already in use", 409);
    }

    const password = await hashValue(payload.password);
    const user = await userRepository.create({
      name: payload.name,
      email: payload.email.toLowerCase(),
      password,
      role: payload.role ?? "customer",
    });

    return this.createSession(user, res);
  },

  async login(payload: { email: string; password: string }, res: Response) {
    const user = await userRepository.findByEmail(payload.email);

    if (!user) {
      throw new AppError("Invalid email or password", 401);
    }

    const isPasswordValid = await compareHash(payload.password, user.password);

    if (!isPasswordValid) {
      throw new AppError("Invalid email or password", 401);
    }

    return this.createSession(user, res);
  },

  async refresh(refreshToken: string | undefined, res: Response) {
    if (!refreshToken) {
      throw new AppError("Refresh token is required", 401);
    }

    const payload = verifyRefreshToken(refreshToken);
    const user = await userRepository.findById(payload.sub);

    if (!user || !user.refreshTokenHash) {
      throw new AppError("Session not found", 401);
    }

    const matches = await compareHash(refreshToken, user.refreshTokenHash);

    if (!matches) {
      throw new AppError("Refresh token is invalid", 401);
    }

    return this.createSession(user, res);
  },

  async logout(userId: string | undefined, res: Response) {
    if (userId) {
      await userRepository.clearRefreshToken(userId);
    }

    clearAccessCookie(res);
    clearRefreshCookie(res);
  },

  async me(userId: string) {
    const user = await userRepository.findById(userId);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return user;
  },

  async createSession(
    user: { _id: { toString(): string }; email: string; role: UserRole },
    res: Response,
  ) {
    const tokenPayload = buildTokenPayload(user);
    const accessToken = signAccessToken(tokenPayload);
    const refreshToken = signRefreshToken(tokenPayload);
    const refreshTokenHash = await hashValue(refreshToken);

    await userRepository.updateById(user._id.toString(), { refreshTokenHash });
    setAccessCookie(res, accessToken);
    setRefreshCookie(res, refreshToken);

    return {
      user: await userRepository.findById(user._id.toString()),
    };
  },
};
