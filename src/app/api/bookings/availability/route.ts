import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * GET /api/bookings/availability?courtId=xxx&date=YYYY-MM-DD
 *
 * Public endpoint — returns 1-hour time slots for a court on a given date,
 * marking each as available or unavailable.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const courtId = searchParams.get("courtId");
  const date = searchParams.get("date");

  if (!courtId || !date) {
    return NextResponse.json(
      { error: "courtId and date are required." },
      { status: 400 }
    );
  }

  // Validate date format
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json(
      { error: "Invalid date format. Use YYYY-MM-DD." },
      { status: 400 }
    );
  }

  const supabase = createAdminClient();

  // Fetch court + venue operating hours
  const { data: court, error: courtError } = await supabase
    .from("courts")
    .select("id, venue_id, is_active, venues(operating_hours)")
    .eq("id", courtId)
    .single();

  if (courtError || !court) {
    return NextResponse.json({ error: "Court not found." }, { status: 404 });
  }

  if (!court.is_active) {
    return NextResponse.json(
      { error: "Court is not active." },
      { status: 400 }
    );
  }

  // Get operating hours for the requested day
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const requestedDate = new Date(date + "T00:00:00");
  const dayName = dayNames[requestedDate.getUTCDay()];

  const venue = court.venues as unknown as {
    operating_hours: Record<
      string,
      { enabled: boolean; open: string; close: string }
    > | null;
  };
  const operatingHours = venue?.operating_hours;

  if (!operatingHours || !operatingHours[dayName]?.enabled) {
    return NextResponse.json({ slots: [], courtId, date });
  }

  const schedule = operatingHours[dayName];
  const [openH, openM] = schedule.open.split(":").map(Number);
  const [closeH, closeM] = schedule.close.split(":").map(Number);
  const openMinutes = openH * 60 + openM;
  const closeMinutes = closeH * 60 + closeM;

  // Generate 1-hour slots
  const allSlots: { start: string; end: string }[] = [];
  for (let m = openMinutes; m + 60 <= closeMinutes; m += 60) {
    const startH = Math.floor(m / 60);
    const startM = m % 60;
    const endH = Math.floor((m + 60) / 60);
    const endM = (m + 60) % 60;
    allSlots.push({
      start: `${String(startH).padStart(2, "0")}:${String(startM).padStart(2, "0")}`,
      end: `${String(endH).padStart(2, "0")}:${String(endM).padStart(2, "0")}`,
    });
  }

  // Fetch existing bookings for this court + date (excluding cancelled/rejected)
  const { data: existingBookings } = await supabase
    .from("bookings")
    .select("start_time")
    .eq("court_id", courtId)
    .eq("booking_date", date)
    .not("status", "in", '("CANCELLED","REJECTED")');

  const bookedTimes = new Set(
    (existingBookings ?? []).map((b: { start_time: string }) =>
      b.start_time.substring(0, 5)
    )
  );

  // If date is today, exclude past slots
  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const slots = allSlots.map((slot) => {
    const [slotH, slotM] = slot.start.split(":").map(Number);
    const slotMinutes = slotH * 60 + slotM;
    const isPast = date === today && slotMinutes <= currentMinutes;

    return {
      start: slot.start,
      end: slot.end,
      available: !bookedTimes.has(slot.start) && !isPast,
    };
  });

  return NextResponse.json({ slots, courtId, date });
}
