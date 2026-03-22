"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  CalendarDays,
  Clock,
  Loader2,
  CheckCircle2,
  XCircle,
  User,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getVenueBookings, updateBookingStatus } from "@/lib/api/bookings";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import type { Booking } from "@/types/booking";

type TabKey = "pending" | "confirmed" | "all";

function formatTime(t: string) {
  const [h, m] = t.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${period}`;
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

const STATUS_BADGE: Record<string, { label: string; className: string }> = {
  PENDING: { label: "Pending", className: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" },
  CONFIRMED: { label: "Confirmed", className: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" },
  CANCELLED: { label: "Cancelled", className: "bg-red-500/10 text-red-400 border-red-500/20" },
  REJECTED: { label: "Rejected", className: "bg-red-500/10 text-red-400 border-red-500/20" },
  COMPLETED: { label: "Completed", className: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
};

export default function VenueOwnerBookingsPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("pending");
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["venue-bookings"],
    queryFn: () => getVenueBookings(),
  });

  const bookings: Booking[] = data?.bookings ?? [];

  const categorized = {
    pending: bookings.filter((b) => b.status === "PENDING"),
    confirmed: bookings.filter((b) => b.status === "CONFIRMED"),
    all: bookings,
  };

  const filtered = categorized[activeTab];

  const tabs: { key: TabKey; label: string; count?: number }[] = [
    { key: "pending", label: "Pending", count: categorized.pending.length },
    { key: "confirmed", label: "Confirmed", count: categorized.confirmed.length },
    { key: "all", label: "All" },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 size={24} className="animate-spin text-text-muted/40" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-extrabold text-white mb-1">Bookings</h1>
        <p className="text-text-muted/50 text-sm">
          Manage incoming reservations and track booking history.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-2xl border border-yellow-500/10 bg-yellow-500/5 p-5">
          <div className="text-xl font-bold text-yellow-500 leading-none mb-1">
            {categorized.pending.length}
          </div>
          <div className="text-[10px] font-bold text-yellow-500/60 uppercase tracking-widest">
            Needs Action
          </div>
        </div>
        <div className="rounded-2xl border border-emerald-500/10 bg-emerald-500/5 p-5">
          <div className="text-xl font-bold text-emerald-500 leading-none mb-1">
            {categorized.confirmed.length}
          </div>
          <div className="text-[10px] font-bold text-emerald-500/60 uppercase tracking-widest">
            Confirmed
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <div className="text-xl font-bold text-white leading-none mb-1">
            {bookings.length}
          </div>
          <div className="text-[10px] font-bold text-text-muted/40 uppercase tracking-widest">
            Total
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex p-1 bg-white/[0.03] border border-white/10 rounded-xl w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={cn(
              "relative px-4 py-2 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all duration-200",
              activeTab === tab.key
                ? "bg-white text-black"
                : "text-text-muted/40 hover:text-white"
            )}
          >
            {tab.label}
            {tab.count !== undefined && tab.count > 0 && (
              <span className={cn(
                "ml-1.5 text-[9px]",
                activeTab === tab.key ? "opacity-60" : "text-yellow-500"
              )}>
                ({tab.count})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Booking List */}
      <div className="space-y-3">
        {filtered.length > 0 ? (
          filtered.map((booking) => (
            <OwnerBookingCard key={booking.id} booking={booking} queryClient={queryClient} />
          ))
        ) : (
          <div className="py-20 rounded-2xl border border-dashed border-white/10 bg-white/[0.02] flex flex-col items-center justify-center text-center px-6">
            <CalendarDays size={24} className="text-text-muted/20 mb-3" />
            <h3 className="text-sm font-bold text-white mb-1">
              No {activeTab === "all" ? "" : activeTab} bookings
            </h3>
            <p className="text-text-muted/40 text-xs">
              {activeTab === "pending"
                ? "No bookings awaiting your confirmation."
                : "Bookings will appear here when players reserve your courts."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function OwnerBookingCard({
  booking,
  queryClient,
}: {
  booking: Booking;
  queryClient: ReturnType<typeof useQueryClient>;
}) {
  const badge = STATUS_BADGE[booking.status];

  const confirmMutation = useMutation({
    mutationFn: () => updateBookingStatus(booking.id, "CONFIRMED"),
    onSuccess: () => {
      toast.success("Booking confirmed!");
      queryClient.invalidateQueries({ queryKey: ["venue-bookings"] });
    },
    onError: (error: { response?: { data?: { error?: string } } }) => {
      toast.error(error?.response?.data?.error || "Failed to confirm booking.");
    },
  });

  const rejectMutation = useMutation({
    mutationFn: () => updateBookingStatus(booking.id, "REJECTED"),
    onSuccess: () => {
      toast.success("Booking rejected.");
      queryClient.invalidateQueries({ queryKey: ["venue-bookings"] });
    },
    onError: (error: { response?: { data?: { error?: string } } }) => {
      toast.error(error?.response?.data?.error || "Failed to reject booking.");
    },
  });

  const isActing = confirmMutation.isPending || rejectMutation.isPending;

  return (
    <div className="group rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-all hover:border-white/15 hover:bg-white/[0.04]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left: Player + Booking Info */}
        <div className="flex-1 min-w-0 space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-white/[0.06] border border-white/10 shrink-0">
              <User size={16} className="text-text-muted/40" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-sm font-bold text-white truncate">
                  {booking.player?.first_name} {booking.player?.last_name}
                </h3>
                <Badge variant="outline" className={cn("text-[8px] font-bold uppercase tracking-widest border", badge?.className)}>
                  {badge?.label}
                </Badge>
              </div>
              <p className="text-text-muted/40 text-xs truncate">
                {booking.player?.email}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-text-muted/50">
            <div className="flex items-center gap-1.5">
              <CalendarDays size={12} className="text-primary/60" />
              <span className="font-medium">{formatDate(booking.booking_date)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={12} className="text-primary/60" />
              <span className="font-medium">
                {formatTime(booking.start_time)} – {formatTime(booking.end_time)}
              </span>
            </div>
            <span className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.06] text-[10px] font-bold">
              {booking.court?.name}
            </span>
          </div>

          {booking.notes && (
            <div className="flex items-start gap-2 text-xs text-text-muted/40 bg-white/[0.02] rounded-lg p-2.5 border border-white/5">
              <AlertCircle size={12} className="shrink-0 mt-0.5" />
              <span>{booking.notes}</span>
            </div>
          )}
        </div>

        {/* Right: Price + Actions */}
        <div className="flex flex-col items-end gap-3 shrink-0">
          <span className="text-lg font-black text-white">₱{booking.total_price}</span>

          {booking.status === "PENDING" && (
            <div className="flex gap-2">
              <button
                onClick={() => rejectMutation.mutate()}
                disabled={isActing}
                className="flex items-center gap-1.5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest text-red-400 transition-all hover:bg-red-500 hover:text-white disabled:opacity-50"
              >
                {rejectMutation.isPending ? (
                  <Loader2 size={12} className="animate-spin" />
                ) : (
                  <XCircle size={12} />
                )}
                Reject
              </button>
              <button
                onClick={() => confirmMutation.mutate()}
                disabled={isActing}
                className="flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-[10px] font-black uppercase tracking-widest text-text-dark transition-all hover:brightness-110 disabled:opacity-50"
              >
                {confirmMutation.isPending ? (
                  <Loader2 size={12} className="animate-spin" />
                ) : (
                  <CheckCircle2 size={12} />
                )}
                Confirm
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
