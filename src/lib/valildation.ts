import { z } from "zod";

const requiredString = z.string().trim().min(1, "This field is required");

export const signUpSchema = z.object({
  email: requiredString.email("Invalid email address"),
  name: requiredString.max(50, "Name must be at most 50 characters long"),
  username: requiredString.regex(
    /^[a-zA-Z0-9_]+$/,
    "Username can only contain letters, numbers, dash and underscores",
  ),
  password: requiredString.min(
    8,
    "Password must be at least 8 characters long",
  ),
});

export type SignUpValues = z.infer<typeof signUpSchema>;

export const loginSchema = z.object({
  username: requiredString,
  password: requiredString,
});

export type LoginValues = z.infer<typeof loginSchema>;

export const createPostSchema = z.object({
  content: requiredString,
});

export const updateUserProfileSchema = z.object({
  name: requiredString,
  bio: z
    .string()
    .max(1000, "Bio must be at most 1000 characters long")
    .optional(),
});

export type UpdateUserProfileValues = z.infer<typeof updateUserProfileSchema>;
