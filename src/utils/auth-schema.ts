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

export const ticketSchema = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  title: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  email: z.string().email().min(2, {
    message: "email must be written correctly.",
  }),
  status: z.enum(["open", "closed", "paid", "pending"], {
    invalid_type_error: "Status must be one of: open, closed",
  }),
  desc: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  value: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), { message: "Value must be a number." }),
});

export type TicketType = {
  id: string;
  desc: string;
  status: "open" | "closed" | "paid" | "pending"; // Adjust as needed for valid statuses
  email: string;
  createdAt: Date;
  name: string;
  value: number;
  createdby: string;
};
