import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email, password, firstName, lastName, role } = body;

  if (!email || !password || !firstName || !lastName || !role) {
    return NextResponse.json(
      { error: "All fields are required." },
      { status: 400 }
    );
  }

  if (password.length < 8) {
    return NextResponse.json(
      { error: "Password must be at least 8 characters." },
      { status: 400 }
    );
  }

  const supabase = createAdminClient();

  // 1. Create user via admin API (skips email confirmation)
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { first_name: firstName, last_name: lastName },
  });

  if (error) {
    if (error.message.includes("already registered")) {
      return NextResponse.json(
        { error: "Email is already in use." },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const userId = data.user.id;

  // 2. Update the auto-created profile with role and name
  const { error: profileError } = await supabase
    .from("profiles")
    .update({ role, first_name: firstName, last_name: lastName })
    .eq("id", userId);

  if (profileError) {
    return NextResponse.json({ error: profileError.message }, { status: 500 });
  }

  return NextResponse.json({
    message: "Account created successfully.",
    user: {
      id: userId,
      email: data.user.email,
      role,
      onboardingCompleted: false,
    },
  });
}
