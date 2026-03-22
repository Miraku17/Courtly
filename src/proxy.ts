import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export function proxy(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: [
    "/",
    "/signin",
    "/signup",
    "/courts",
    "/courts/:path*",
    "/list-venue",
    "/dashboard/:path*",
    "/onboarding/:path*",
    "/player/:path*",
    "/venue-owner/:path*",
    "/admin/:path*",
  ],
};
