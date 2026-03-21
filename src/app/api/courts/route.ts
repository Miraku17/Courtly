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

export async function POST(request: NextRequest) {
  const { user, error: authError } = await getAuthUser();
  if (authError) return authError;

  const supabase = await createClient();
  const venueId = await getOwnerVenueId(supabase, user.id);

  if (!venueId) {
    return NextResponse.json(
      { error: "You do not have a venue. Complete onboarding first." },
      { status: 404 }
    );
  }

  const body = await request.json();
  const { name, sportType, surfaceType, pricePerHour, isIndoor } = body;

  if (!name || !sportType || pricePerHour === undefined) {
    return NextResponse.json(
      { error: "Name, sportType, and pricePerHour are required." },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("courts")
    .insert({
      venue_id: venueId,
      name,
      sport_type: sportType,
      surface_type: surfaceType ?? null,
      price_per_hour: pricePerHour,
      is_indoor: isIndoor ?? false,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ court: data }, { status: 201 });
}

export async function GET() {
  const { user, error: authError } = await getAuthUser();
  if (authError) return authError;

  const supabase = await createClient();
  const venueId = await getOwnerVenueId(supabase, user.id);

  if (!venueId) {
    return NextResponse.json(
      { error: "You do not have a venue. Complete onboarding first." },
      { status: 404 }
    );
  }

  const { data, error } = await supabase
    .from("courts")
    .select()
    .eq("venue_id", venueId)
    .order("created_at", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ courts: data });
}
