import NextAuth from "next-auth";
import { existingUserById } from "./actions/existing-user-id";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./lib/prisma";
import authConfig from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "credentials") return true;

      if (!user.id) return false;

      const existingUser = await existingUserById(user?.id);
      if (!existingUser?.emailVerified) return false;
      const expiration = Math.floor(Date.now() / 1000) + 12 * 60 * 60;
      user.customExpiration = expiration;
      return true;
    },
    async jwt({ token, user }) {
      if (!token.sub) return token;

      const existingUser = await existingUserById(token.sub);
      if (!existingUser) return token;
      if (user?.customExpiration) {
        token.expiration = user.customExpiration;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (session.user) {
        session.user.customExpiration = token?.expiration as number;
      }
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },

  ...authConfig,
});
