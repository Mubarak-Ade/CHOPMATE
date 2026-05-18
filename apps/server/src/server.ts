import { createApp } from "./app/app.js";
import { connectToDatabase } from "./config/db.js";
import { env } from "./config/env.js";

const startServer = async () => {
  await connectToDatabase();

  const app = createApp();

  app.listen(env.PORT, () => {
    console.log(`Chopmate API listening on port ${env.PORT}`);
  });
};

void startServer().catch((error) => {
  console.error("Failed to start server", error);
  process.exit(1);
});
