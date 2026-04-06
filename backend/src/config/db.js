import mongoose from "mongoose";
import { env } from "./env.js";

const connectDB = async () => {
  if (!env.mongoUri || env.useMemoryStore) {
    console.log("Using in-memory Stage 1 store");
    return;
  }

  await mongoose.connect(env.mongoUri);
  console.log("MongoDB connected");
};

export default connectDB;
