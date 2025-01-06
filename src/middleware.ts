import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { NextResponse } from "next/server";
import { publicRoutes, authRoutes } from "./route";
const { auth: middleware } = NextAuth(authConfig);

export default middleware(async (req) => {
  try {
    const isLoggedIn = req.auth;

    const { nextUrl } = req;
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    if (isLoggedIn && isAuthRoute) {
      return NextResponse.redirect(new URL("/", req.nextUrl));
    }
    if (isLoggedIn && Date.parse(isLoggedIn.expires) < Date.now()) {
      if (nextUrl.pathname !== "/login") {
        return NextResponse.redirect(new URL("/login", req.nextUrl));
      }
    }
    if (isPublicRoute) {
      return NextResponse.next();
    }
  } catch (error) {
    return NextResponse.redirect(new URL("/auth/register", req.nextUrl));
  }
});
