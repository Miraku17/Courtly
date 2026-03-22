import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: rawId } = await params;

  // Validate UUID format to prevent injection
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(rawId)) {
    return NextResponse.json({ error: "Invalid venue ID." }, { status: 400 });
  }

  const id = rawId;

  const supabase = createAdminClient();

  const { data: venue, error } = await supabase
    .from("venues")
    .select(
      "*, profiles(first_name, last_name), courts(id, name, sport_type, surface_type, price_per_hour, is_indoor, is_active), venue_photos(id, url, position)"
    )
    .eq("id", id)
    .eq("status", "APPROVED")
    .single();

  if (error || !venue) {
    return NextResponse.json({ error: "Venue not found." }, { status: 404 });
  }

  return NextResponse.json({ venue });
}
