import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getAuthUser } from "@/lib/supabase/auth-guard";

export async function GET() {
  const { user, error: authError } = await getAuthUser();
  if (authError) return authError;

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("profiles")
    .select()
    .eq("id", user.id)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Fetch email from auth (not stored in profiles table)
  const adminClient = createAdminClient();
  const { data: authData } = await adminClient.auth.admin.getUserById(user.id);

  return NextResponse.json({
    profile: { ...data, email: authData?.user?.email ?? null },
  });
}

export async function PATCH(request: NextRequest) {
  const { user, error: authError } = await getAuthUser();
  if (authError) return authError;

  const body = await request.json();
  const updateData: Record<string, string> = {};

  if (body.firstName) updateData.first_name = body.firstName;
  if (body.lastName) updateData.last_name = body.lastName;
  if (body.phone) updateData.phone = body.phone;

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("profiles")
    .update(updateData)
    .eq("id", user.id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    message: "Profile updated successfully.",
    profile: data,
  });
}
