import { z } from "zod";

export const updateProfileSchema = z
  .object({
    name: z.string().min(2).max(120).optional(),
  })
  .refine((value) => Object.keys(value).length > 0, "Provide at least one field to update");

