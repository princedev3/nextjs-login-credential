"use server";

import prisma from "@/lib/prisma";
import { tokenSchema } from "@/utils/auth-schema";
import { z } from "zod";
import { existingUserByEmail } from "./existing-user-by-email";

export const verifyEmail = async (values: z.infer<typeof tokenSchema>) => {
  try {
    const verifyValues = tokenSchema.parse(values);
    if (!verifyValues) {
      return { error: "Invalid token" };
    }

    const { token } = verifyValues;
    const existingVerification = await prisma.verificationToken.findUnique({
      where: { token },
    });
    if (!existingVerification) {
      return { error: "Invalid token" };
    }
    if (existingVerification.expires < new Date()) {
      return { error: "Token expired" };
    }
    const existingUser = await existingUserByEmail(existingVerification.email);
    if (!existingUser) {
      return { error: "Invalid details" };
    }

    await prisma.user.update({
      where: { id: existingUser.id },
      data: { emailVerified: new Date() },
    });
    await prisma.verificationToken.delete({
      where: { token },
    });
    return { success: "Email verified successfully" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};
