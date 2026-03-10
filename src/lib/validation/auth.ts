import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email().max(160),
  password: z
    .string()
    .min(8)
    .max(128)
    .regex(/[A-Z]/, "Password must include an uppercase letter")
    .regex(/[0-9]/, "Password must include a number")
});

export const loginSchema = z.object({
  email: z.string().email().max(160),
  password: z.string().min(8).max(128)
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;

