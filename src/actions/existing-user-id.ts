"use server";

import prisma from "@/lib/prisma";

export const existingUserById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return user;
};
