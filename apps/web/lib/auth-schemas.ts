import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email(),
  password: z.string().min(8).max(128)
});

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(128)
});

export const acceptInviteSchema = z.object({
  token: z.string().min(1)
});

export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignInInput = z.infer<typeof signInSchema>;
