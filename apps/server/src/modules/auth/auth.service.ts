import crypto from "node:crypto";
import type { Response } from "express";
import { env } from "../../config/env.js";
import { AppError } from "../../shared/utils/app-error.js";
import { compareHash, hashValue } from "../../shared/utils/hash.js";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "../../shared/utils/jwt.js";
import { toPublicUser } from "../../shared/utils/user.js";
import { userRepository } from "../user/user.repository.js";
import type { UserRole } from "../user/user.model.js";

const ACCESS_COOKIE_NAME = "accessToken";
const REFRESH_COOKIE_NAME = "refreshToken";
const VERIFICATION_TTL_MS = 24 * 60 * 60 * 1000;

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

const createVerificationToken = () => crypto.randomBytes(32).toString("hex");

const logVerificationLink = (email: string, token: string) => {
  const verifyUrl = `${env.CLIENT_ORIGIN}/verify-email?token=${token}`;
  // eslint-disable-next-line no-console
  console.info(`[auth] Verification link for ${email}: ${verifyUrl}`);
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

  async registerOwner(
    payload: { fullName: string; email: string; password: string },
    res: Response,
  ) {
    const existingUser = await userRepository.findByEmail(payload.email);

    if (existingUser) {
      throw new AppError("Email is already in use", 409);
    }

    const verificationToken = createVerificationToken();
    const password = await hashValue(payload.password);

    const user = await userRepository.create({
      name: payload.fullName,
      email: payload.email.toLowerCase(),
      password,
      role: "owner",
      isVerified: false,
      onboardingCompleted: false,
      emailVerificationToken: verificationToken,
      emailVerificationExpires: new Date(Date.now() + VERIFICATION_TTL_MS),
    });

    logVerificationLink(user.email, verificationToken);

    return this.createSession(user, res, { includeVerificationToken: env.NODE_ENV !== "production" });
  },

  async verifyEmail(token: string) {
    const user = await userRepository.findByVerificationToken(token);

    if (!user) {
      throw new AppError("Invalid or expired verification token", 400);
    }

    const updatedUser = await userRepository.updateById(user._id.toString(), {
      isVerified: true,
      $unset: {
        emailVerificationToken: 1,
        emailVerificationExpires: 1,
      },
    });

    return toPublicUser(updatedUser);
  },

  async resendVerificationEmail(userId: string) {
    const user = await userRepository.findById(userId);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    if (user.isVerified) {
      throw new AppError("Email is already verified", 400);
    }

    const verificationToken = createVerificationToken();
    const updatedUser = await userRepository.updateById(userId, {
      emailVerificationToken: verificationToken,
      emailVerificationExpires: new Date(Date.now() + VERIFICATION_TTL_MS),
    });

    logVerificationLink(user.email, verificationToken);

    return {
      user: toPublicUser(updatedUser),
      ...(env.NODE_ENV !== "production" ? { verificationToken } : {}),
    };
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

    return toPublicUser(user);
  },

  async createSession(
    user: { _id: { toString(): string }; email: string; role: UserRole },
    res: Response,
    options?: { includeVerificationToken?: boolean },
  ) {
    const tokenPayload = buildTokenPayload(user);
    const accessToken = signAccessToken(tokenPayload);
    const refreshToken = signRefreshToken(tokenPayload);
    const refreshTokenHash = await hashValue(refreshToken);

    await userRepository.updateById(user._id.toString(), { refreshTokenHash });
    setAccessCookie(res, accessToken);
    setRefreshCookie(res, refreshToken);

    const publicUser = await userRepository.findById(user._id.toString());

    return {
      user: toPublicUser(publicUser),
      ...(options?.includeVerificationToken && publicUser?.emailVerificationToken
        ? { verificationToken: publicUser.emailVerificationToken }
        : {}),
    };
  },
};
