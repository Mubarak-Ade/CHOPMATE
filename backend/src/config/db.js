import mongoose from "mongoose";
import env from "../env.js";

const connectDB = async () => {
  const mongoUri = env.MONGO_URI_DEVELOPMENT;

  if (!mongoUri) {
    throw new Error("MONGO_URI is missing from environment variables");
  }

  await mongoose.connect(mongoUri);
  console.log("MongoDB connected");
};

export default connectDB;
