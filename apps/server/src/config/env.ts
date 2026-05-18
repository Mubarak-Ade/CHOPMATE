import dotenv from "dotenv";
import { cleanEnv, num, str } from "envalid";

dotenv.config();

export const env = cleanEnv(process.env, {
  NODE_ENV: str({
    choices: ["development", "test", "production"],
    default: "development",
  }),
  PORT: num({ default: 4000 }),
  CLIENT_ORIGIN: str({ default: "http://localhost:3000" }),
  MONGO_URI: str(),
  JWT_SECRET: str(),
  JWT_EXPIRES_IN: str({ default: "15m" }),
  REFRESH_SECRET: str(),
  REFRESH_EXPIRES_IN: str({ default: "7d" }),
  ACCESS_COOKIE_MAX_AGE_MS: num({ default: 15 * 60 * 1000 }),
  REFRESH_COOKIE_MAX_AGE_MS: num({ default: 7 * 24 * 60 * 60 * 1000 }),
  COOKIE_DOMAIN: str({ default: "" }),
});
