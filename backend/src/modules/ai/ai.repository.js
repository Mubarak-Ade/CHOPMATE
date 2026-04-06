import { memoryStore } from "../../data/memoryStore.js";

export const aiRepository = {
  getCache(key) {
    const entry = memoryStore.aiCache.find((item) => item.key === key);
    if (!entry) {
      return null;
    }

    if (entry.expiresAt < Date.now()) {
      memoryStore.aiCache = memoryStore.aiCache.filter((item) => item.key !== key);
      return null;
    }

    return entry.value;
  },

  setCache(key, value, ttlMs) {
    memoryStore.aiCache = memoryStore.aiCache.filter((item) => item.key !== key);
    memoryStore.aiCache.push({
      key,
      value,
      expiresAt: Date.now() + ttlMs,
    });
    return value;
  },
};
