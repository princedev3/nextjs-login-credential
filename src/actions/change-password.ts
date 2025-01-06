"use server";
import bcrypt from "bcryptjs";
import { existingUserByEmail } from "./existing-user-by-email";
import prisma from "@/lib/prisma";

export const changePassword = async (values: any) => {
  try {
    if (values.password !== values.confirmPassword) {
      return { error: "Passwords do not match" };
    }
    const existingUser = await existingUserByEmail(values.email);
    if (!existingUser) {
      return { error: "User not found" };
    }
    const hashedPassword = await bcrypt.hash(values.password, 10);
    const updatedUser = await prisma.user.update({
      where: { id: existingUser.id },
      data: { password: hashedPassword },
    });
    await prisma.passwordResetToken.deleteMany({
      where: { email: values.email },
    });
    return { success: "password changed successfully" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};
