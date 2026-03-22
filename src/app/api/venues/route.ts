import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getAuthUser } from "@/lib/supabase/auth-guard";

export async function GET() {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("venues")
    .select("*, courts(id, price_per_hour), venue_photos(id, url, position)")
    .eq("status", "APPROVED")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ venues: data });
}

export async function POST(request: NextRequest) {
  const { user, error: authError } = await getAuthUser();
  if (authError) return authError;

  const body = await request.json();
  const { name, type, address, city, phone, email, description, imageUrl, lat, lng, operatingHours, tags, venueRules, safetyHealth, cancellationPolicy } =
    body;

  if (!name || !type || !address || !city) {
    return NextResponse.json(
      { error: "Name, type, address, and city are required." },
      { status: 400 }
    );
  }

  const supabase = await createClient();

  const { data: venue, error } = await supabase
    .from("venues")
    .insert({
      owner_id: user.id,
      name,
      type,
      address,
      city,
      phone: phone ?? null,
      email: email ?? null,
      description: description ?? null,
      image_url: imageUrl ?? null,
      lat: lat ?? null,
      lng: lng ?? null,
      operating_hours: operatingHours ?? {},
      tags: tags ?? [],
      venue_rules: venueRules ?? [],
      safety_health: safetyHealth ?? [],
      cancellation_policy: cancellationPolicy ?? null,
    })
    .select()
    .single();

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json(
        { error: "You already have a venue registered." },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Mark onboarding as completed
  await supabase
    .from("profiles")
    .update({ onboarding_completed: true })
    .eq("id", user.id);

  return NextResponse.json({ venue }, { status: 201 });
}
