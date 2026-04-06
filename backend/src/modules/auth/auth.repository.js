import { memoryStore } from "../../data/memoryStore.js";

export const authRepository = {
  findUserByEmail(email) {
    return memoryStore.users.find(
      (user) => user.email.toLowerCase() === String(email).toLowerCase()
    );
  },

  findUserById(userId) {
    return memoryStore.users.find((user) => user._id === userId);
  },

  createUser(payload) {
    const user = {
      _id: memoryStore.nextId("usr"),
      ...payload,
    };
    memoryStore.users.push(user);
    return user;
  },

  saveSession(session) {
    memoryStore.sessions.push(session);
    return session;
  },

  findSessionByAccessToken(accessToken) {
    return memoryStore.sessions.find((session) => session.accessToken === accessToken);
  },

  findSessionByRefreshToken(refreshToken) {
    return memoryStore.sessions.find((session) => session.refreshToken === refreshToken);
  },

  deleteSessionByAccessToken(accessToken) {
    const index = memoryStore.sessions.findIndex(
      (session) => session.accessToken === accessToken
    );

    if (index >= 0) {
      memoryStore.sessions.splice(index, 1);
    }
  },

  deleteSessionByRefreshToken(refreshToken) {
    const index = memoryStore.sessions.findIndex(
      (session) => session.refreshToken === refreshToken
    );

    if (index >= 0) {
      memoryStore.sessions.splice(index, 1);
    }
  },
};
