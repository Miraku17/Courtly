export type BookingStatus =
  | "PENDING"
  | "CONFIRMED"
  | "REJECTED"
  | "CANCELLED"
  | "COMPLETED";

export interface Booking {
  id: string;
  court_id: string;
  venue_id: string;
  player_id: string | null;
  guest_name: string;
  guest_phone: string;
  guest_email: string | null;
  booking_date: string; // "YYYY-MM-DD"
  start_time: string; // "HH:MM"
  end_time: string; // "HH:MM"
  total_price: number;
  status: BookingStatus;
  notes: string | null;
  cancellation_reason: string | null;
  created_at: string;
  updated_at: string;
  // Joined fields (populated by API)
  court?: {
    id: string;
    name: string;
    sport_type: string;
    surface_type: string | null;
    is_indoor: boolean;
    price_per_hour: number;
  };
  venue?: {
    id: string;
    name: string;
    address: string;
    city: string;
    image_url: string | null;
    qr_payment_url: string | null;
  };
  player?: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
  };
}

export interface TimeSlot {
  start: string; // "HH:MM" 24h
  end: string; // "HH:MM" 24h
  available: boolean;
}

export interface AvailabilityResponse {
  slots: TimeSlot[];
  courtId: string;
  date: string;
}

export interface CreateBookingPayload {
  courtId: string;
  bookingDate: string; // "YYYY-MM-DD"
  startTime: string; // "HH:MM"
  guestName?: string;
  guestPhone?: string;
  guestEmail?: string;
  notes?: string;
}
