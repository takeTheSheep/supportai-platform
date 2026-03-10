import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";

const protectedPrefixes = [
  "/dashboard",
  "/conversations",
  "/knowledge-base",
  "/widget",
  "/analytics",
  "/inbox",
  "/team",
  "/settings"
];

const authPages = ["/login", "/register"];

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isProtected = protectedPrefixes.some((prefix) =>
    pathname.startsWith(prefix)
  );

  if (isProtected && !req.auth) {
    const url = new URL("/login", req.url);
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  if (req.auth && authPages.some((path) => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/conversations/:path*",
    "/knowledge-base/:path*",
    "/widget/:path*",
    "/analytics/:path*",
    "/inbox/:path*",
    "/team/:path*",
    "/settings/:path*",
    "/login",
    "/register"
  ]
};

