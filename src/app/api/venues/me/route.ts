import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getAuthUser } from "@/lib/supabase/auth-guard";

export async function GET() {
  const { user, error: authError } = await getAuthUser();
  if (authError) return authError;

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("venues")
    .select()
    .eq("owner_id", user.id)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return NextResponse.json({ venue: null });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ venue: data });
}

export async function PATCH(request: NextRequest) {
  const { user, error: authError } = await getAuthUser();
  if (authError) return authError;

  const body = await request.json();
  const updateData: Record<string, unknown> = {};

  if (body.name) updateData.name = body.name;
  if (body.type) updateData.type = body.type;
  if (body.address) updateData.address = body.address;
  if (body.city) updateData.city = body.city;
  if (body.phone !== undefined) updateData.phone = body.phone;
  if (body.email !== undefined) updateData.email = body.email;
  if (body.description !== undefined) updateData.description = body.description;
  if (body.imageUrl !== undefined) updateData.image_url = body.imageUrl;
  if (body.lat !== undefined) updateData.lat = body.lat;
  if (body.lng !== undefined) updateData.lng = body.lng;
  if (body.operatingHours !== undefined) updateData.operating_hours = body.operatingHours;
  if (body.tags !== undefined) updateData.tags = body.tags;
  if (body.venueRules !== undefined) updateData.venue_rules = body.venueRules;
  if (body.safetyHealth !== undefined) updateData.safety_health = body.safetyHealth;
  if (body.cancellationPolicy !== undefined) updateData.cancellation_policy = body.cancellationPolicy;

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("venues")
    .update(updateData)
    .eq("owner_id", user.id)
    .select()
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return NextResponse.json({ error: "Venue not found." }, { status: 404 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ venue: data });
}
