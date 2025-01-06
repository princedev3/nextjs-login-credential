"use server";
import { formForgotPasswordSchema } from "@/utils/auth-schema";
import { z } from "zod";
import { existingUserByEmail } from "./existing-user-by-email";
import { generateResetTokenPassword } from "./generate-reset-token-password";
import { sendResetPasswordMail } from "./mail";

export const reset = async (
  values: z.infer<typeof formForgotPasswordSchema>
) => {
  try {
    const validatedFields = formForgotPasswordSchema.safeParse(values);
    if (!validatedFields.success) {
      return { error: "invalid credentials" };
    }
    const { email } = validatedFields.data;
    const existingUser = await existingUserByEmail(email);
    if (!existingUser) {
      return { error: "user not found" };
    }
    const token = await generateResetTokenPassword(email);
    await sendResetPasswordMail(email, token.token);
    return { success: "Email sent successfully" };
  } catch (error) {
    console.log(error);
    return { error: "invalid credentials" };
  }
};
