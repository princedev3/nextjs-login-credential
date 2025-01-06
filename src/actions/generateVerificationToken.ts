"use server";
import prisma from "@/lib/prisma";
import { getVerificationTokenByEmail } from "./getVerificationTokenByEmail";

export const generateVerificationToken = async (email: string) => {
  const existingToken = await getVerificationTokenByEmail(email);
  if (existingToken) {
    await prisma.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }
  const expires = new Date(new Date().getTime() + 1000 * 60 * 10);
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  const createToken = await prisma.verificationToken.create({
    data: {
      token: result,
      email: email,
      expires,
    },
  });
  return createToken;
  //   } catch (error) {
  //     return { error: "Error generating verification token" };
  //   }
};
