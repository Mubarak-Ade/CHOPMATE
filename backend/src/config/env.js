const environment = process.env.NODE_ENV || "development";

const readMongoUri = () => {
  return (
    process.env.MONGO_URI ||
    process.env.MONGO_URI_DEVELOPMENT ||
    process.env.MONGO_URI_PRODUCTION ||
    ""
  );
};

export const env = {
  nodeEnv: environment,
  port: Number(process.env.PORT || 5000),
  clientUrl: process.env.CLIENT_URL || "http://localhost:3000",
  jwtSecret: process.env.JWT_SECRET || "chopmate-stage-1-secret",
  refreshSecret: process.env.REFRESH_SECRET || "chopmate-stage-1-refresh-secret",
  webhookSecret: process.env.WEBHOOK_SECRET || "chopmate-stage-2-webhook-secret",
  mongoUri: readMongoUri(),
  useMemoryStore: process.env.USE_MEMORY_STORE !== "false",
};
