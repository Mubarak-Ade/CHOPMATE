import jwt from "jsonwebtoken";
import { env } from "../../config/env.js";

export interface JwtPayload {
  sub: string;
  email: string;
  role: "customer" | "owner" | "staff" | "admin";
}

const accessTokenExpiresIn = env.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"] & {};
const refreshTokenExpiresIn = env.REFRESH_EXPIRES_IN as jwt.SignOptions["expiresIn"] & {};

export const signAccessToken = (payload: JwtPayload) =>
  jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: accessTokenExpiresIn,
  });

export const signRefreshToken = (payload: JwtPayload) =>
  jwt.sign(payload, env.REFRESH_SECRET, {
    expiresIn: refreshTokenExpiresIn,
  });

export const verifyAccessToken = (token: string) =>
  jwt.verify(token, env.JWT_SECRET) as JwtPayload;

export const verifyRefreshToken = (token: string) =>
  jwt.verify(token, env.REFRESH_SECRET) as JwtPayload;
