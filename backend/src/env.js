import dotenv from "dotenv";
import { cleanEnv, str, port } from "envalid";

dotenv.config();

export const env = cleanEnv(process.env, {
  PORT: port({ default: 5000 }),
  NODE_ENV: str({
    choices: ["development", "production", "test"],
    default: "development",
  }),
  MONGO_URI_DEVELOPMENT: str(),
  MONGO_URI_PRODUCTION: str(),
  CLIENT_URL: str({ default: "http://localhost:3000" }),
});

export default env;
