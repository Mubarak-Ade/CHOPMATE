import { z } from "zod";

export const createMenuSchema = z.object({
  restaurantId: z.string().min(1),
  name: z.string().min(2).max(120),
  categories: z.array(z.string()).default([]),
});

export const createMenuItemSchema = z.object({
  restaurantId: z.string().min(1),
  categoryId: z.string().min(1),
  name: z.string().min(2).max(160),
  description: z.string().max(1000).default(""),
  price: z.number().nonnegative(),
  image: z.string().url().optional(),
  isAvailable: z.boolean().optional(),
});

export const updateMenuItemSchema = createMenuItemSchema
  .omit({ restaurantId: true, categoryId: true })
  .extend({
    categoryId: z.string().min(1).optional(),
  })
  .partial()
  .refine((value) => Object.keys(value).length > 0, "Provide at least one field to update");

