import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/dashboard", "/onboarding", "/list-venue", "/player"];
const authRoutes = ["/signin", "/signup"];

function isTokenValid(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp > Date.now() / 1000;
  } catch {
    return false;
  }
}

export function proxy(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  const path = request.nextUrl.pathname;
  const isValid = token ? isTokenValid(token) : false;

  const isProtected = protectedRoutes.some((route) => path.startsWith(route));
  const isAuthRoute = authRoutes.some((route) => path.startsWith(route));

  if (!isValid && isProtected) {
    const response = NextResponse.redirect(new URL("/signin", request.url));
    if (token) response.cookies.delete("access_token");
    return response;
  }

  if (isValid && (isAuthRoute || path === "/")) {
    const payload = JSON.parse(atob(token!.split(".")[1]));
    const role = payload.user_metadata?.role;
    const destination = role === "PLAYER" ? "/player/bookings" : "/dashboard";
    return NextResponse.redirect(new URL(destination, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/:path*", "/onboarding/:path*", "/list-venue/:path*", "/player/:path*", "/signin", "/signup"],
};