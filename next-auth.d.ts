import { UserRole } from "@prisma/client";
import { type DefaultSession } from "next-auth";

export type ExtendedUser =
  | DefaultSession["user"] & {
      role: UserRole;
      expiration?: number;
    };
declare module "next-auth" {
  interface Session {
    user?: ExtendedUser;
  }
  interface User {
    customExpiration?: number;
  }
}
