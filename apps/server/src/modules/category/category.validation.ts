import { z } from "zod";

export const createCategorySchema = z.object({
  restaurantId: z.string().min(1),
  name: z.string().min(2).max(120),
});

