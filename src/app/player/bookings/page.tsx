"use client";

import { useState } from "react";
import { mockBookings, Booking } from "@/lib/mock-data";
import {
  CalendarDays,
  Trophy,
  Clock,
  MapPin,
  Star,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function BookingsPage() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past" | "cancelled">("upcoming");

  const filteredBookings = mockBookings.filter((b) => b.status === activeTab);

  const stats = [
    { label: "Upcoming", value: mockBookings.filter((b) => b.status === "upcoming").length, icon: CalendarDays },
    { label: "Games Played", value: 42, icon: Trophy },
    { label: "Hours Played", value: "12.5h", icon: Clock },
  ];

  const tabs = [
    { key: "upcoming" as const, label: "Upcoming" },
    { key: "past" as const, label: "Past" },
    { key: "cancelled" as const, label: "Cancelled" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-extrabold text-white mb-1">My Bookings</h1>
        <p className="text-text-muted/40 text-sm">Manage your court reservations and game history.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white/[0.03] border border-white/10 rounded-2xl p-5"
          >
            <stat.icon size={16} className="text-text-muted/20 mb-3" />
            <div className="text-xl font-bold text-white leading-none mb-1">{stat.value}</div>
            <div className="text-[10px] font-bold text-text-muted/30 uppercase tracking-widest">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex p-1 bg-white/[0.03] border border-white/10 rounded-xl w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={cn(
              "px-4 py-2 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all duration-200",
              activeTab === tab.key
                ? "bg-primary text-text-dark"
                : "text-text-muted/40 hover:text-white"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Booking List */}
      <div className="space-y-3">
        {filteredBookings.length > 0 ? (
          filteredBookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))
        ) : (
          <div className="py-20 rounded-2xl border border-dashed border-white/10 bg-white/[0.02] flex flex-col items-center justify-center text-center px-6">
            <CalendarDays size={24} className="text-text-muted/20 mb-3" />
            <h3 className="text-sm font-bold text-white mb-1">No {activeTab} bookings</h3>
            <p className="text-text-muted/30 text-xs">Book a court to see it here.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function BookingCard({ booking }: { booking: Booking }) {
  const [month, day, year] = booking.date.replace(",", "").split(" ");

  return (
    <div
      className={cn(
        "group flex flex-col sm:flex-row bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden transition-all duration-200 hover:border-white/20",
        booking.status === "cancelled" && "opacity-40"
      )}
    >
      {/* Date */}
      <div className="sm:w-20 bg-white/[0.03] border-b sm:border-b-0 sm:border-r border-white/10 p-4 flex sm:flex-col items-center sm:justify-center gap-2 sm:gap-0 text-center">
        <span className="text-[9px] font-bold uppercase tracking-widest text-primary/50">{month}</span>
        <span className="text-xl font-bold text-white leading-none">{day}</span>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h3 className="text-sm font-bold text-white group-hover:text-primary transition-colors truncate">
              {booking.venueName}
            </h3>
            <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[8px] font-bold uppercase tracking-widest text-text-muted/50">
              {booking.sport}
            </span>
          </div>
          <p className="text-text-muted/40 text-xs mb-2">{booking.courtName}</p>

          <div className="flex flex-wrap items-center gap-3 text-text-muted/30 text-[10px]">
            <div className="flex items-center gap-1.5">
              <Clock size={11} className="text-primary/50" />
              <span className="font-medium">{booking.startTime} - {booking.endTime}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin size={11} />
              <span className="truncate max-w-[180px]">{booking.address}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-shrink-0 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-white/5">
          {booking.status === "upcoming" && (
            <>
              <button className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-wider text-white hover:bg-white/10 transition-all">
                Reschedule
              </button>
              <button className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/10 text-red-400 text-[10px] font-bold uppercase tracking-wider hover:bg-red-500 hover:text-white transition-all">
                Cancel
              </button>
            </>
          )}

          {booking.status === "past" &&
            (booking.reviewLeft ? (
              <div className="flex items-center gap-1.5">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={10}
                      className={cn(
                        i < (booking.rating || 0)
                          ? "fill-primary text-primary"
                          : "text-white/10"
                      )}
                    />
                  ))}
                </div>
                <span className="text-[9px] font-bold text-text-muted/30 uppercase tracking-widest ml-1">Reviewed</span>
              </div>
            ) : (
              <button className="px-4 py-2 rounded-lg bg-primary text-text-dark text-[10px] font-bold uppercase tracking-wider hover:brightness-110 transition-all">
                Leave a Review
              </button>
            ))}

          {booking.status === "cancelled" && booking.cancellationReason && (
            <div className="flex items-center gap-1.5 text-red-400/50 text-[10px]">
              <AlertCircle size={12} />
              <span>{booking.cancellationReason}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
