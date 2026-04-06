import crypto from "node:crypto";

export const hashValue = (value) =>
  crypto.createHash("sha256").update(String(value)).digest("hex");

export const compareHash = (value, hashedValue) => hashValue(value) === hashedValue;
