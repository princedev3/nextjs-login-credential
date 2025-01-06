"use server";

import prisma from "@/lib/prisma";

export const getVerificationTokenByEmail = async (email: string) => {
  const existingToken = await prisma.verificationToken.findFirst({
    where: {
      email: email,
    },
  });
  return existingToken;
};
