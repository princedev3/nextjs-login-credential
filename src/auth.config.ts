import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { formLoginSchema } from "./utils/auth-schema";
import { existingUserByEmail } from "./actions/existing-user-by-email";
import bcrypt from "bcryptjs";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = formLoginSchema.safeParse(credentials);
        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          const user = await existingUserByEmail(email);
          if (!user || !user.password) return null;

          const isValidPassword = await bcrypt.compare(password, user.password);

          if (isValidPassword) return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
