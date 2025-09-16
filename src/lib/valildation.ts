import { z } from "zod";

const requiredString = z.string().trim().min(1, "This field is required");

export const signUpSchema = z.object({
  email: requiredString.email("Invalid email address"),
  name: requiredString.max(50, "Name must be at most 50 characters long"),
  nim: requiredString
    .regex(/^[0-9]+$/, "NIM can only contain numbers")
    .min(5, "Enter a valid NIM")
    .max(20, "NIM is not valid"),
  password: requiredString.min(
    8,
    "Password must be at least 8 characters long",
  ),
});

export type SignUpValues = z.infer<typeof signUpSchema>;

export const updateNimSchema = z.object({
  nim: requiredString
    .regex(/^[0-9]+$/, "NIM can only contain numbers")
    .min(5, "Enter a valid NIM")
    .max(20, "NIM is not valid"),
});

export type UpdateNimValues = z.infer<typeof updateNimSchema>;

export const loginSchema = z.object({
  nim: requiredString,
  password: requiredString,
});

export type LoginValues = z.infer<typeof loginSchema>;

export const createPostSchema = z.object({
  content: requiredString,
  mediaIds: z
    .array(z.string())
    .max(5, "You can only attach up to 5 media files"),
});

export const updateUserProfileSchema = z.object({
  name: requiredString,
});

export type UpdateUserProfileValues = z.infer<typeof updateUserProfileSchema>;

export const createCommentSchema = z.object({
  content: requiredString,
});
