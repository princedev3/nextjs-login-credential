"use server";

import prisma from "@/lib/prisma";

export const generateResetTokenPassword = async (email: string) => {
  const existingResetToken = await prisma.passwordResetToken.findFirst({
    where: { email },
  });
  if (existingResetToken) {
    if (existingResetToken.expires < new Date()) {
      await prisma.passwordResetToken.delete({
        where: { id: existingResetToken.id },
      });
    }
  }
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  const expires = new Date(new Date().getTime() + 1000 * 60 * 60);
  const resetToken = await prisma.passwordResetToken.create({
    data: { email, token: result, expires },
  });
  return resetToken;
};
