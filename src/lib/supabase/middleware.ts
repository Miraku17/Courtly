import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refreshes the auth token if expired
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;
  const protectedRoutes = ["/player", "/venue-owner", "/onboarding", "/dashboard", "/admin"];
  const authRoutes = ["/signin", "/signup"];
  const publicOnlyRoutes = ["/", "/courts", "/list-venue"];

  const isProtected = protectedRoutes.some((route) => path.startsWith(route));
  const isAuthRoute = authRoutes.some((route) => path.startsWith(route));
  const isPublicOnly = publicOnlyRoutes.includes(path);

  // Redirect unauthenticated users away from protected routes
  if (!user && isProtected) {
    const url = request.nextUrl.clone();
    url.pathname = "/signin";
    return NextResponse.redirect(url);
  }

  // Fetch profile once for all authenticated route checks
  if (user && (isAuthRoute || isPublicOnly || path.startsWith("/venue-owner") || path.startsWith("/admin"))) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role, onboarding_completed")
      .eq("id", user.id)
      .single();

    // Redirect authenticated users away from auth & public-only pages
    if (isAuthRoute || isPublicOnly) {
      let destination = "/player/bookings";
      if (profile?.role === "ADMIN") {
        destination = "/admin";
      } else if (profile?.role === "VENUE_OWNER") {
        destination = profile.onboarding_completed ? "/venue-owner" : "/onboarding/venue-owner";
      }
      const url = request.nextUrl.clone();
      url.pathname = destination;
      return NextResponse.redirect(url);
    }

    // Redirect venue owners who haven't completed onboarding away from dashboard
    if (path.startsWith("/venue-owner") && profile && !profile.onboarding_completed) {
      const url = request.nextUrl.clone();
      url.pathname = "/onboarding/venue-owner";
      return NextResponse.redirect(url);
    }

    // Redirect non-admin users away from admin routes
    if (path.startsWith("/admin") && profile?.role !== "ADMIN") {
      const url = request.nextUrl.clone();
      url.pathname = profile?.role === "VENUE_OWNER" ? "/venue-owner" : "/player/bookings";
      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse;
}
