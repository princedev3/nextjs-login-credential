"use server";

import prisma from "@/lib/prisma";

export const existingUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return user;
};
