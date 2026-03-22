import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getAdminUser } from "@/lib/supabase/admin-guard";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { error: authError } = await getAdminUser();
  if (authError) return authError;

  const { id } = await params;
  const body = await request.json();
  const { status, notes } = body;

  if (!["PENDING", "APPROVED", "REJECTED"].includes(status)) {
    return NextResponse.json(
      { error: "Status must be PENDING, APPROVED, or REJECTED." },
      { status: 400 }
    );
  }

  const supabase = createAdminClient();

  const { data: venue, error } = await supabase
    .from("venues")
    .update({
      status,
      admin_notes: notes || null,
      status_updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!venue) {
    return NextResponse.json({ error: "Venue not found." }, { status: 404 });
  }

  return NextResponse.json({ venue });
}
