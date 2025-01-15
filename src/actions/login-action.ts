"use server";
import bcrypt from "bcryptjs";
import { formLoginSchema } from "@/utils/auth-schema";
import { z } from "zod";
import { existingUserByEmail } from "./existing-user-by-email";
import { generateVerificationToken } from "./generateVerificationToken";
import { sendMail } from "./mail";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export const loginAction = async (values: z.infer<typeof formLoginSchema>) => {
  try {
    const validatedValues = formLoginSchema.parse(values);
    if (!validatedValues) {
      return { error: "Invalid credentials" };
    }
    const { email, password } = validatedValues;
    const existingUser = await existingUserByEmail(email);
    if (existingUser) {
      if (!existingUser.emailVerified) {
        const token = await generateVerificationToken(email);
        await sendMail(email, token.token);
        return { error: "Email not verified. Please check your email." };
      }
    }
    const comparePassword = bcrypt.compareSync(
      password,
      existingUser?.password as string
    );

    if (!comparePassword) {
      return { error: "Invalid credentials" };
    }

    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return { success: "Logged in Successfully!" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "something went wrong" };
      }
    }
    return { error: "Invalid credentials" };
  }
};
