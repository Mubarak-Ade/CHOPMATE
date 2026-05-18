import { z } from "zod";

export const uploadUrlSchema = z.object({
  url: z.string().url(),
});
