"use server";
import bcrypt from "bcryptjs";

import { formRegisterSchema } from "@/utils/auth-schema";
import { z } from "zod";
import { existingUserByEmail } from "./existing-user-by-email";
import { generateVerificationToken } from "./generateVerificationToken";
import prisma from "@/lib/prisma";
import { sendMail } from "./mail";

export const registerAction = async (
  values: z.infer<typeof formRegisterSchema>
) => {
  try {
    const validatedFields = formRegisterSchema.parse(values);
    if (!validatedFields) {
      return { error: "Invalid input" };
    }
    const { email, password, name } = validatedFields;
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);

    const existingUser = await existingUserByEmail(email);
    if (existingUser) {
      return { error: "User already exists" };
    }
    const verifcationToken = await generateVerificationToken(email);
    const user = await prisma.user.create({
      data: {
        email,
        password: hash,
        name,
      },
    });
    await sendMail(user.email as string, verifcationToken?.token as string);
    return { success: "User registered successfully" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};
