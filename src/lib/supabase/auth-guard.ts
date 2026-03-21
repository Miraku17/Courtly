import { NextResponse } from "next/server";
import { createClient } from "./server";

/**
 * Validates the authenticated user from Supabase session cookies.
 * Use at the top of any protected API route handler.
 *
 * Returns { user } on success, or { error: NextResponse } on failure.
 */
export async function getAuthUser(): Promise<
  | { user: { id: string; email: string }; error?: never }
  | { user?: never; error: NextResponse }
> {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return {
      error: NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      ),
    };
  }

  return { user: { id: user.id, email: user.email! } };
}
