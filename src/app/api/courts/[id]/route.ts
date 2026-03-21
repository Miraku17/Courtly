import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getAuthUser } from "@/lib/supabase/auth-guard";

async function getOwnerVenueId(supabase: Awaited<ReturnType<typeof createClient>>, ownerId: string) {
  const { data, error } = await supabase
    .from("venues")
    .select("id")
    .eq("owner_id", ownerId)
    .single();

  if (error || !data) return null;
  return data.id as string;
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { user, error: authError } = await getAuthUser();
  if (authError) return authError;

  const { id: courtId } = await params;
  const supabase = await createClient();
  const venueId = await getOwnerVenueId(supabase, user.id);

  if (!venueId) {
    return NextResponse.json(
      { error: "You do not have a venue." },
      { status: 404 }
    );
  }

  const body = await request.json();
  const updateData: Record<string, unknown> = {};

  if (body.name !== undefined) updateData.name = body.name;
  if (body.sportType !== undefined) updateData.sport_type = body.sportType;
  if (body.surfaceType !== undefined) updateData.surface_type = body.surfaceType;
  if (body.pricePerHour !== undefined) updateData.price_per_hour = body.pricePerHour;
  if (body.isIndoor !== undefined) updateData.is_indoor = body.isIndoor;
  if (body.isActive !== undefined) updateData.is_active = body.isActive;

  const { data, error } = await supabase
    .from("courts")
    .update(updateData)
    .eq("id", courtId)
    .eq("venue_id", venueId)
    .select()
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return NextResponse.json(
        { error: "Court not found or does not belong to your venue." },
        { status: 404 }
      );
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ court: data });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { user, error: authError } = await getAuthUser();
  if (authError) return authError;

  const { id: courtId } = await params;
  const supabase = await createClient();
  const venueId = await getOwnerVenueId(supabase, user.id);

  if (!venueId) {
    return NextResponse.json(
      { error: "You do not have a venue." },
      { status: 404 }
    );
  }

  const { error } = await supabase
    .from("courts")
    .delete()
    .eq("id", courtId)
    .eq("venue_id", venueId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Court deleted successfully." });
}
