import type { Request, Response } from "express";
import { sendSuccess } from "../../shared/utils/response.js";
import { uploadUrlSchema } from "./uploads.validation.js";

export const uploadsController = {
  async registerUrl(req: Request, res: Response) {
    const { url } = uploadUrlSchema.parse(req.body);
    sendSuccess(res, { url }, "Upload URL registered");
  },
};
