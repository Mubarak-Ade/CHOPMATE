import { z } from "zod";

const locationSchema = z
  .object({
    lat: z.number().min(-90).max(90),
    lng: z.number().min(-180).max(180),
  })
  .optional();

export const createRestaurantSchema = z.object({
  name: z.string().min(2).max(160),
  description: z.string().max(1000).default(""),
  cuisine: z.array(z.string().min(2)).default([]),
  address: z.string().min(5).max(300),
  phone: z.string().min(7).max(30),
  images: z.array(z.string().url()).default([]),
  isOpen: z.boolean().optional(),
  location: locationSchema,
});

export const updateRestaurantSchema = createRestaurantSchema.partial().refine(
  (value) => Object.keys(value).length > 0,
  "Provide at least one field to update",
);

export const searchRestaurantsSchema = z.object({
  cuisine: z.string().optional(),
  rating: z.coerce.number().min(0).max(5).optional(),
  q: z.string().optional(),
  lat: z.coerce.number().min(-90).max(90).optional(),
  lng: z.coerce.number().min(-180).max(180).optional(),
});

