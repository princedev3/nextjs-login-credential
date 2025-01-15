import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { NextResponse } from "next/server";
import { publicRoutes, authRoutes, adminRoutes, privateRoutes } from "./route";
import prisma from "./lib/prisma";
const { auth: middleware } = NextAuth(authConfig);

export default middleware(async (req) => {
  try {
    const isLoggedIn = req.auth;

    const { nextUrl } = req;

    const email = isLoggedIn?.user?.email;

    // const user = await prisma.user.findUnique({
    //   where: { email: email as string },
    // });

    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    const isPrivateRoute = (path: string): boolean => {
      return privateRoutes.some((route) => {
        if (route.includes(":")) {
          const regex = new RegExp(`^${route.replace(/:[^/]+/g, "[^/]+")}$`);
          return regex.test(path);
        }
        return route === path;
      });
    };

    // const isAdminRoute = adminRoutes.includes(nextUrl.pathname);

    // if (isLoggedIn && isAdminRoute && user?.role !== "ADMIN") {
    //   return NextResponse.redirect(new URL("/invoices", req.nextUrl));
    // }
    if (!isLoggedIn && isPrivateRoute(nextUrl.pathname)) {
      return NextResponse.redirect(new URL("/login", req.nextUrl));
    }

    // if (!isLoggedIn && isAuthRoute(nextUrl.pathname)) {
    //   return NextResponse.redirect(new URL("/", req.nextUrl));
    // }

    if (isLoggedIn && isAuthRoute) {
      return NextResponse.redirect(new URL("/invoices", req.nextUrl));
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
    return NextResponse.redirect(new URL("/register", req.nextUrl));
  }
});
