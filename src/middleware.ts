import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const middleware = (request: NextRequest) => {
  const path = request.nextUrl.pathname;
  const isPublicPath = [
    "/login",
    "/signup",
    "/verifyemail",
    "/forgotpassword",
    "/setnewpassword",
  ].includes(path);
  const token = request.cookies.get("token")?.value || "";

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
};

export const config = {
  matcher: [
    "/",
    "/signup",
    "/login",
    "/profile/:path*",
    "/forgotpassword",
    "/setnewpassword",
  ],
};
