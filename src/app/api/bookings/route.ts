import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getAuthUser } from "@/lib/supabase/auth-guard";

/**
 * POST /api/bookings — Create a new booking (no auth required — guest booking)
 */
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { courtId, bookingDate, startTime, guestName, guestPhone, guestEmail, notes } = body;

  if (!courtId || !bookingDate || !startTime || !guestName || !guestPhone) {
    return NextResponse.json(
      { error: "courtId, bookingDate, startTime, guestName, and guestPhone are required." },
      { status: 400 }
    );
  }

  // Validate date is not in the past
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const requested = new Date(bookingDate + "T00:00:00");
  if (requested < today) {
    return NextResponse.json(
      { error: "Cannot book a date in the past." },
      { status: 400 }
    );
  }

  const supabase = createAdminClient();

  // Fetch court with venue info
  const { data: court, error: courtError } = await supabase
    .from("courts")
    .select("id, venue_id, price_per_hour, is_active, venues(operating_hours, qr_payment_url, name, address, city, image_url)")
    .eq("id", courtId)
    .single();

  if (courtError || !court) {
    return NextResponse.json({ error: "Court not found." }, { status: 404 });
  }

  if (!court.is_active) {
    return NextResponse.json(
      { error: "Court is not available." },
      { status: 400 }
    );
  }

  // Validate time is within operating hours
  const dayNames = [
    "Sunday", "Monday", "Tuesday", "Wednesday",
    "Thursday", "Friday", "Saturday",
  ];
  const dayName = dayNames[requested.getUTCDay()];
  const venue = court.venues as unknown as {
    operating_hours: Record<string, { enabled: boolean; open: string; close: string }> | null;
    qr_payment_url: string | null;
    name: string;
    address: string;
    city: string;
    image_url: string | null;
  };
  const schedule = venue?.operating_hours?.[dayName];

  if (!schedule?.enabled) {
    return NextResponse.json(
      { error: "Venue is closed on this day." },
      { status: 400 }
    );
  }

  const [startH, startM] = startTime.split(":").map(Number);
  const [openH, openM] = schedule.open.split(":").map(Number);
  const [closeH, closeM] = schedule.close.split(":").map(Number);
  const startMinutes = startH * 60 + startM;
  const openMinutes = openH * 60 + openM;
  const closeMinutes = closeH * 60 + closeM;

  if (startMinutes < openMinutes || startMinutes + 60 > closeMinutes) {
    return NextResponse.json(
      { error: "Time slot is outside operating hours." },
      { status: 400 }
    );
  }

  // Compute end time (1 hour later)
  const endH = Math.floor((startMinutes + 60) / 60);
  const endM = (startMinutes + 60) % 60;
  const endTime = `${String(endH).padStart(2, "0")}:${String(endM).padStart(2, "0")}`;

  const totalPrice = court.price_per_hour;

  // Insert booking using admin client (no auth required for guests)
  const { data: booking, error: insertError } = await supabase
    .from("bookings")
    .insert({
      court_id: courtId,
      venue_id: court.venue_id,
      guest_name: guestName,
      guest_phone: guestPhone,
      guest_email: guestEmail ?? null,
      booking_date: bookingDate,
      start_time: startTime,
      end_time: endTime,
      total_price: totalPrice,
      status: "PENDING",
      notes: notes ?? null,
    })
    .select()
    .single();

  if (insertError) {
    // Unique violation = slot already taken
    if (insertError.code === "23505") {
      return NextResponse.json(
        { error: "This time slot is already booked." },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: insertError.message },
      { status: 500 }
    );
  }

  // Return booking with venue info for QR display
  return NextResponse.json(
    {
      booking: {
        ...booking,
        venue: {
          id: court.venue_id,
          name: venue.name,
          address: venue.address,
          city: venue.city,
          image_url: venue.image_url,
          qr_payment_url: venue.qr_payment_url,
        },
      },
    },
    { status: 201 }
  );
}

/**
 * GET /api/bookings?role=owner&status=PENDING,CONFIRMED
 * Auth required — venue owners fetch their bookings
 */
export async function GET(request: NextRequest) {
  const { user, error: authError } = await getAuthUser();
  if (authError) return authError;

  const { searchParams } = new URL(request.url);
  const statusFilter = searchParams.get("status");

  const supabase = await createClient();

  // Get venue owner's venue
  const { data: venue } = await supabase
    .from("venues")
    .select("id")
    .eq("owner_id", user.id)
    .single();

  if (!venue) {
    return NextResponse.json({ bookings: [] });
  }

  let query = supabase
    .from("bookings")
    .select("*, courts(id, name, sport_type, surface_type, is_indoor, price_per_hour)")
    .eq("venue_id", venue.id)
    .order("booking_date", { ascending: false })
    .order("start_time", { ascending: false });

  if (statusFilter) {
    const statuses = statusFilter.split(",");
    query = query.in("status", statuses);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Reshape: rename 'courts' join to 'court' for clarity
  const bookings = (data ?? []).map((b) => {
    const { courts, ...rest } = b as Record<string, unknown>;
    return { ...rest, court: courts };
  });

  return NextResponse.json({ bookings });
}
