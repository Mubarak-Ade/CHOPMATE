import { apiGet, apiPost } from "@/services/api";
import type { AuthSession, User } from "@/types/api";

export const registerOwner = (payload: { fullName: string; email: string; password: string }) =>
  apiPost<AuthSession>("auth/register-owner", payload);

export const login = (payload: { email: string; password: string }) =>
  apiPost<AuthSession>("auth/login", payload);

export const logout = () => apiPost<null>("auth/logout");

export const getMe = () => apiGet<User>("auth/me");

export const verifyEmail = (token: string) =>
  apiPost<{ user: User }>("auth/verify-email", { token });

export const resendVerification = () =>
  apiPost<{ user: User; verificationToken?: string }>("auth/resend-verification");
