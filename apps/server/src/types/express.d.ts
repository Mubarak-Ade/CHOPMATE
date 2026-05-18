import type { JwtPayload } from "../shared/utils/jwt.js";

declare global {
  namespace Express {
    interface Request {
      auth?: JwtPayload;
    }
  }
}

export {};

