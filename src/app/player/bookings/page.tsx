"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  CalendarDays,
  Trophy,
  Clock,
  MapPin,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getMyBookings } from "@/lib/api/bookings";
import { Badge } from "@/components/ui/badge";
import { CancelBookingDialog } from "@/components/common/cancel-booking-dialog";
import type { Booking } from "@/types/booking";

type TabKey = "upcoming" | "past" | "cancelled";

function formatDisplayDate(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  const month = d.toLocaleString("en-US", { month: "short" }).toUpperCase();
  const day = d.getDate();
  return { month, day: String(day) };
}

function formatTime(t: string) {
  const [h, m] = t.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${period}`;
}

function getTabForBooking(booking: Booking): TabKey {
  if (booking.status === "CANCELLED" || booking.status === "REJECTED") return "cancelled";
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const bookingDate = new Date(booking.booking_date + "T00:00:00");
  if (bookingDate < today || booking.status === "COMPLETED") return "past";
  return "upcoming";
}

const STATUS_BADGE: Record<string, { label: string; className: string }> = {
  PENDING: { label: "Pending", className: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" },
  CONFIRMED: { label: "Confirmed", className: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" },
  CANCELLED: { label: "Cancelled", className: "bg-red-500/10 text-red-500 border-red-500/20" },
  REJECTED: { label: "Rejected", className: "bg-red-500/10 text-red-400 border-red-500/20" },
  COMPLETED: { label: "Completed", className: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
};

export default function BookingsPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("upcoming");
  const [cancelBooking, setCancelBooking] = useState<{ id: string; venueName: string } | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["my-bookings"],
    queryFn: getMyBookings,
  });

  const bookings: Booking[] = data?.bookings ?? [];

  const categorized = {
    upcoming: bookings.filter((b) => getTabForBooking(b) === "upcoming"),
    past: bookings.filter((b) => getTabForBooking(b) === "past"),
    cancelled: bookings.filter((b) => getTabForBooking(b) === "cancelled"),
  };

  const filtered = categorized[activeTab];

  const stats = [
    { label: "Upcoming", value: categorized.upcoming.length, icon: CalendarDays },
    { label: "Games Played", value: categorized.past.length, icon: Trophy },
    {
      label: "Hours Played",
      value: `${categorized.past.length}h`,
      icon: Clock,
    },
  ];

  const tabs: { key: TabKey; label: string }[] = [
    { key: "upcoming", label: "Upcoming" },
    { key: "past", label: "Past" },
    { key: "cancelled", label: "Cancelled" },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 size={24} className="animate-spin text-section-dark/40" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-extrabold text-section-dark mb-1">My Bookings</h1>
        <p className="text-section-dark/50 text-sm">Manage your court reservations and game history.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-[#f5f5f5] shadow-sm border border-section-dark/10 rounded-2xl p-5"
          >
            <stat.icon size={16} className="text-section-dark/40 mb-3" />
            <div className="text-xl font-bold text-section-dark leading-none mb-1">{stat.value}</div>
            <div className="text-[10px] font-bold text-section-dark/40 uppercase tracking-widest">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex p-1 bg-[#f5f5f5] shadow-sm border border-section-dark/10 rounded-xl w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={cn(
              "px-4 py-2 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all duration-200",
              activeTab === tab.key
                ? "bg-section-dark text-white"
                : "text-section-dark/40 hover:text-section-dark"
            )}
          >
            {tab.label}
            {categorized[tab.key].length > 0 && (
              <span className="ml-1.5 text-[9px] opacity-60">({categorized[tab.key].length})</span>
            )}
          </button>
        ))}
      </div>

      {/* Booking List */}
      <div className="space-y-3">
        {filtered.length > 0 ? (
          filtered.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              onCancel={() =>
                setCancelBooking({
                  id: booking.id,
                  venueName: booking.venue?.name ?? "this venue",
                })
              }
            />
          ))
        ) : (
          <div className="py-20 rounded-2xl border border-dashed border-section-dark/10 bg-[#f5f5f5] shadow-sm flex flex-col items-center justify-center text-center px-6">
            <CalendarDays size={24} className="text-section-dark/30 mb-3" />
            <h3 className="text-sm font-bold text-section-dark mb-1">No {activeTab} bookings</h3>
            <p className="text-section-dark/40 text-xs">Book a court to see it here.</p>
          </div>
        )}
      </div>

      {/* Cancel Dialog */}
      {cancelBooking && (
        <CancelBookingDialog
          open={!!cancelBooking}
          onOpenChange={(open) => { if (!open) setCancelBooking(null); }}
          bookingId={cancelBooking.id}
          venueName={cancelBooking.venueName}
        />
      )}
    </div>
  );
}

function BookingCard({ booking, onCancel }: { booking: Booking; onCancel: () => void }) {
  const { month, day } = formatDisplayDate(booking.booking_date);
  const tab = getTabForBooking(booking);
  const badge = STATUS_BADGE[booking.status];

  return (
    <div
      className={cn(
        "group flex flex-col sm:flex-row bg-[#f5f5f5] shadow-sm border border-section-dark/10 rounded-2xl overflow-hidden transition-all duration-200 hover:border-section-dark/20 hover:shadow-md",
        tab === "cancelled" && "opacity-40"
      )}
    >
      {/* Date */}
      <div className="sm:w-20 bg-bg-light border-b sm:border-b-0 sm:border-r border-section-dark/10 p-4 flex sm:flex-col items-center sm:justify-center gap-2 sm:gap-0 text-center">
        <span className="text-[9px] font-bold uppercase tracking-widest text-section-dark/40">{month}</span>
        <span className="text-xl font-bold text-section-dark leading-none">{day}</span>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h3 className="text-sm font-bold text-section-dark group-hover:text-section-dark/80 transition-colors truncate">
              {booking.venue?.name ?? "Venue"}
            </h3>
            <span className="px-1.5 py-0.5 rounded bg-section-dark/5 border border-section-dark/10 text-[8px] font-bold uppercase tracking-widest text-section-dark/50">
              {booking.court?.sport_type ?? "Sport"}
            </span>
            <Badge variant="outline" className={cn("text-[8px] font-bold uppercase tracking-widest border", badge?.className)}>
              {badge?.label}
            </Badge>
          </div>
          <p className="text-section-dark/40 text-xs mb-2">{booking.court?.name ?? "Court"}</p>

          <div className="flex flex-wrap items-center gap-3 text-section-dark/40 text-[10px]">
            <div className="flex items-center gap-1.5">
              <Clock size={11} className="text-section-dark/30" />
              <span className="font-medium">
                {formatTime(booking.start_time)} - {formatTime(booking.end_time)}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin size={11} />
              <span className="truncate max-w-[180px]">
                {booking.venue?.address}, {booking.venue?.city}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-shrink-0 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-section-dark/10">
          {tab === "upcoming" && (booking.status === "PENDING" || booking.status === "CONFIRMED") && (
            <button
              onClick={onCancel}
              className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/10 text-red-500 text-[10px] font-bold uppercase tracking-wider hover:bg-red-500 hover:text-white transition-all"
            >
              Cancel
            </button>
          )}

          {tab === "cancelled" && booking.cancellation_reason && (
            <div className="flex items-center gap-1.5 text-red-400/50 text-[10px]">
              <AlertCircle size={12} />
              <span>{booking.cancellation_reason}</span>
            </div>
          )}

          {/* Price */}
          <div className="ml-auto text-right">
            <span className="text-sm font-black text-section-dark">₱{booking.total_price}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
