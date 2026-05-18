import { z } from "zod";

const addressSchema = z.object({
  country: z.string().min(2).max(80),
  state: z.string().min(2).max(80),
  city: z.string().min(2).max(80),
  street: z.string().min(3).max(200),
});

const locationSchema = z
  .object({
    lat: z.number().min(-90).max(90),
    lng: z.number().min(-180).max(180),
  })
  .optional();

const openingHourSchema = z.object({
  day: z.string().min(3).max(12),
  open: z.string().min(4).max(5),
  close: z.string().min(4).max(5),
  closed: z.boolean().default(false),
});

export const createRestaurantSchema = z.object({
  name: z.string().min(2).max(160),
  email: z.string().email().optional(),
  description: z.string().max(1000).default(""),
  cuisineTypes: z.array(z.string().min(2)).min(1),
  address: addressSchema,
  phoneNumber: z.string().min(7).max(30),
  location: locationSchema,
});

export const updateRestaurantSchema = z
  .object({
    name: z.string().min(2).max(160),
    email: z.string().email(),
    description: z.string().max(1000),
    cuisineTypes: z.array(z.string().min(2)),
    address: addressSchema,
    phoneNumber: z.string().min(7).max(30),
    openingHours: z.array(openingHourSchema),
    location: locationSchema,
    onboardingStep: z.number().int().min(1).max(6),
  })
  .partial()
  .refine((value) => Object.keys(value).length > 0, "Provide at least one field to update");

export const brandingSchema = z
  .object({
    logo: z.string().url(),
    coverImage: z.string().url(),
    description: z.string().max(1000),
    images: z.array(z.string().url()),
  })
  .partial()
  .refine((value) => Object.keys(value).length > 0, "Provide at least one branding field");

export const deliverySchema = z.object({
  deliveryFee: z.number().min(0),
  pickupAvailable: z.boolean(),
  deliveryRadiusKm: z.number().min(0),
  prepTimeMinutes: z.number().int().min(5).max(180),
});

export const searchRestaurantsSchema = z.object({
  cuisine: z.string().optional(),
  rating: z.coerce.number().min(0).max(5).optional(),
  q: z.string().optional(),
  lat: z.coerce.number().min(-90).max(90).optional(),
  lng: z.coerce.number().min(-180).max(180).optional(),
});
