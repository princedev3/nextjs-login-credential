"use server";

import prisma from "@/lib/prisma";
import { tokenSchema } from "@/utils/auth-schema";
import { z } from "zod";
import { generateResetTokenPassword } from "./generate-reset-token-password";
import { sendResetPasswordMail } from "./mail";

export const confirmResetPasswordToken = async (
  values: z.infer<typeof tokenSchema>
) => {
  try {
    const validatedFields = tokenSchema.parse(values);
    if (!validatedFields) {
      return { error: "Error validating token" };
    }
    const { token } = validatedFields;

    const existingToken = await prisma.passwordResetToken.findUnique({
      where: {
        token: token,
      },
    });
    if (!existingToken) {
      return { error: "Invalid token" };
    }
    if (existingToken.expires < new Date()) {
      const token = await generateResetTokenPassword(existingToken.email);
      await sendResetPasswordMail(token.token, existingToken.email);
      return { error: "Token expired. Please generate a new one" };
    }

    const user = await prisma.user.findUnique({
      where: {
        email: existingToken.email,
      },
    });
    // await prisma.passwordResetToken.delete({
    //   where: {
    //     id: existingToken.id,
    //   },
    // });
    return { success: "Token confirmed", email: user?.email };
  } catch (error) {
    console.log(error);
    return { error: "Error confirming reset password token" };
  }
};
