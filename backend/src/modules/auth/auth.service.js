import { createError } from "../../lib/createError.js";
import { ROLE_VALUES } from "../../types/global.types.js";
import { compareHash, hashValue } from "../../utils/hash.js";
import { generateToken } from "../../utils/generateToken.js";
import { authRepository } from "./auth.repository.js";

const sanitizeUser = (user) => {
  if (!user) {
    return null;
  }

  const { password, ...safeUser } = user;
  return safeUser;
};

export const authService = {
  register(payload) {
    const { name, email, password, role = "customer" } = payload;

    if (!name || !email || !password) {
      throw createError(400, "name, email, and password are required");
    }

    if (!ROLE_VALUES.includes(role)) {
      throw createError(400, "invalid role supplied");
    }

    if (authRepository.findUserByEmail(email)) {
      throw createError(409, "email already exists");
    }

    const user = authRepository.createUser({
      name,
      email: email.toLowerCase(),
      password: hashValue(password),
      role,
      isVerified: false,
      favorites: [],
      createdAt: new Date().toISOString(),
    });

    return this.createSessionForUser(user);
  },

  login(payload) {
    const { email, password } = payload;

    if (!email || !password) {
      throw createError(400, "email and password are required");
    }

    const user = authRepository.findUserByEmail(email);
    if (!user || !compareHash(password, user.password)) {
      throw createError(401, "invalid email or password");
    }

    return this.createSessionForUser(user);
  },

  refresh(refreshToken) {
    if (!refreshToken) {
      throw createError(401, "refresh token is required");
    }

    const session = authRepository.findSessionByRefreshToken(refreshToken);
    if (!session) {
      throw createError(401, "invalid refresh token");
    }

    authRepository.deleteSessionByRefreshToken(refreshToken);
    const user = authRepository.findUserById(session.userId);
    return this.createSessionForUser(user);
  },

  logout(accessToken, refreshToken) {
    if (accessToken) {
      authRepository.deleteSessionByAccessToken(accessToken);
    }

    if (refreshToken) {
      authRepository.deleteSessionByRefreshToken(refreshToken);
    }

    return { success: true };
  },

  getCurrentUser(accessToken) {
    if (!accessToken) {
      throw createError(401, "authentication required");
    }

    const session = authRepository.findSessionByAccessToken(accessToken);
    if (!session) {
      throw createError(401, "invalid access token");
    }

    return sanitizeUser(authRepository.findUserById(session.userId));
  },

  createSessionForUser(user) {
    const accessToken = generateToken();
    const refreshToken = generateToken();

    authRepository.saveSession({
      _id: generateToken(),
      userId: user._id,
      accessToken,
      refreshToken,
      createdAt: new Date().toISOString(),
    });

    return {
      user: sanitizeUser(user),
      accessToken,
      refreshToken,
    };
  },
};
