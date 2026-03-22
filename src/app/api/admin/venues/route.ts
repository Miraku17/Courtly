import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getAdminUser } from "@/lib/supabase/admin-guard";

export async function GET(request: NextRequest) {
  const { error: authError } = await getAdminUser();
  if (authError) return authError;

  const supabase = createAdminClient();
  const statusFilter = request.nextUrl.searchParams.get("status");

  // Fetch counts for all statuses
  const [totalRes, pendingRes, approvedRes, rejectedRes] = await Promise.all([
    supabase.from("venues").select("*", { count: "exact", head: true }),
    supabase.from("venues").select("*", { count: "exact", head: true }).eq("status", "PENDING"),
    supabase.from("venues").select("*", { count: "exact", head: true }).eq("status", "APPROVED"),
    supabase.from("venues").select("*", { count: "exact", head: true }).eq("status", "REJECTED"),
  ]);

  // Fetch venues with owner info and courts
  // Note: email is on auth.users, not profiles — fetch name from profiles, email from venue
  let query = supabase
    .from("venues")
    .select("*, profiles(first_name, last_name), courts(id, name, sport_type, surface_type, price_per_hour, is_indoor, is_active), venue_photos(id, url, position)")
    .order("created_at", { ascending: false });

  if (statusFilter && ["PENDING", "APPROVED", "REJECTED"].includes(statusFilter)) {
    query = query.eq("status", statusFilter);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    venues: data,
    counts: {
      total: totalRes.count ?? 0,
      pending: pendingRes.count ?? 0,
      approved: approvedRes.count ?? 0,
      rejected: rejectedRes.count ?? 0,
    },
  });
}
