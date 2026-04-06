import crypto from "node:crypto";

export const generateToken = () => crypto.randomBytes(24).toString("hex");
