import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getAuthUser } from "@/lib/supabase/auth-guard";

// Valid status transitions
const VALID_TRANSITIONS: Record<string, { to: string[]; by: "player" | "owner" }[]> = {
  PENDING: [
    { to: ["CONFIRMED", "REJECTED"], by: "owner" },
    { to: ["CANCELLED"], by: "player" },
  ],
  CONFIRMED: [
    { to: ["CANCELLED"], by: "player" },
  ],
};

/**
 * PATCH /api/bookings/[id] — Update booking status
 *
 * Player can cancel: { status: "CANCELLED", cancellationReason?: string }
 * Owner can confirm/reject: { status: "CONFIRMED" | "REJECTED", cancellationReason?: string }
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { user, error: authError } = await getAuthUser();
  if (authError) return authError;

  const { id } = await params;

  // Validate UUID
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(id)) {
    return NextResponse.json(
      { error: "Invalid booking ID." },
      { status: 400 }
    );
  }

  const body = await request.json();
  const { status: newStatus, cancellationReason } = body;

  if (!newStatus) {
    return NextResponse.json(
      { error: "status is required." },
      { status: 400 }
    );
  }

  const supabase = await createClient();

  // Fetch the booking to check permissions and current status
  const { data: booking, error: fetchError } = await supabase
    .from("bookings")
    .select("id, player_id, venue_id, status")
    .eq("id", id)
    .single();

  if (fetchError || !booking) {
    return NextResponse.json(
      { error: "Booking not found." },
      { status: 404 }
    );
  }

  // Determine if user is the player or venue owner
  let userRole: "player" | "owner" | null = null;

  if (booking.player_id === user.id) {
    userRole = "player";
  } else {
    // Check if user owns the venue
    const { data: venue } = await supabase
      .from("venues")
      .select("id")
      .eq("id", booking.venue_id)
      .eq("owner_id", user.id)
      .single();

    if (venue) {
      userRole = "owner";
    }
  }

  if (!userRole) {
    return NextResponse.json(
      { error: "You do not have permission to update this booking." },
      { status: 403 }
    );
  }

  // Validate status transition
  const transitions = VALID_TRANSITIONS[booking.status];
  if (!transitions) {
    return NextResponse.json(
      { error: `Booking with status '${booking.status}' cannot be updated.` },
      { status: 400 }
    );
  }

  const allowed = transitions.some(
    (t) => t.by === userRole && t.to.includes(newStatus)
  );

  if (!allowed) {
    return NextResponse.json(
      {
        error: `Cannot transition from '${booking.status}' to '${newStatus}' as ${userRole}.`,
      },
      { status: 400 }
    );
  }

  // Perform the update
  const updateData: Record<string, unknown> = { status: newStatus };
  if (cancellationReason) {
    updateData.cancellation_reason = cancellationReason;
  }

  const { data: updated, error: updateError } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", id)
    .select()
    .single();

  if (updateError) {
    return NextResponse.json(
      { error: updateError.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ booking: updated });
}
