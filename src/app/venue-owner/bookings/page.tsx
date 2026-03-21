"use client";

import { CalendarDays } from "lucide-react";

export default function BookingsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="flex size-16 items-center justify-center rounded-2xl bg-blue-500/10 mb-4">
        <CalendarDays size={28} className="text-blue-400" />
      </div>
      <h1 className="text-[1.5rem] font-bold text-white mb-2">Bookings</h1>
      <p className="text-text-muted/50 max-w-[400px]">
        View upcoming reservations, manage cancellations, and track booking history.
      </p>
    </div>
  );
}
