import { NextResponse } from "next/server";
import { createClient } from "./server";
import { getAuthUser } from "./auth-guard";

/**
 * Validates that the authenticated user has the ADMIN role.
 * Use at the top of any admin-only API route handler.
 */
export async function getAdminUser(): Promise<
  | { user: { id: string; email: string }; error?: never }
  | { user?: never; error: NextResponse }
> {
  const { user, error: authError } = await getAuthUser();
  if (authError) return { error: authError };

  const supabase = await createClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "ADMIN") {
    return {
      error: NextResponse.json({ error: "Forbidden" }, { status: 403 }),
    };
  }

  return { user };
}
