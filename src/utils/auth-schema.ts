import { z } from "zod";

export const formRegisterSchema = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  email: z.string().email().min(2, {
    message: "email must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "password must be at least 2 characters.",
  }),
});

export const tokenSchema = z.object({
  token: z.string().min(1, {
    message: "name must be at least 6 characters.",
  }),
});

export const formLoginSchema = formRegisterSchema.pick({
  email: true,
  password: true,
});

export const formForgotPasswordSchema = formRegisterSchema.pick({
  email: true,
});
