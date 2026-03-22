"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Calendar, Clock, MapPin, Loader2, CheckCircle2, QrCode } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { createBooking } from "@/lib/api/bookings";
import { toast } from "sonner";

interface Court {
  id: string;
  name: string;
  sport_type: string;
  price_per_hour: number;
}

interface Venue {
  id: string;
  name: string;
  address: string;
  city: string;
  qr_payment_url: string | null;
}

interface BookingConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  court: Court;
  venue: Venue;
  date: string;
  dateDisplay: string;
  startTime: string;
  endTime: string;
}

function formatTime(t: string) {
  const [h, m] = t.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${period}`;
}

export function BookingConfirmationDialog({
  open,
  onOpenChange,
  court,
  venue,
  date,
  dateDisplay,
  startTime,
  endTime,
}: BookingConfirmationDialogProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [notes, setNotes] = useState("");
  const [success, setSuccess] = useState(false);

  const mutation = useMutation({
    mutationFn: () =>
      createBooking({
        courtId: court.id,
        bookingDate: date,
        startTime,
        notes: notes || undefined,
      }),
    onSuccess: () => {
      setSuccess(true);
      queryClient.invalidateQueries({ queryKey: ["availability"] });
      toast.success("Booking submitted! Awaiting venue confirmation.");
    },
    onError: (error: { response?: { data?: { error?: string } } }) => {
      const message =
        error?.response?.data?.error || "Failed to create booking. Please try again.";
      toast.error(message);
      if (message.includes("already booked")) {
        queryClient.invalidateQueries({ queryKey: ["availability"] });
        onOpenChange(false);
      }
    },
  });

  const handleConfirm = () => {
    mutation.mutate();
  };

  const handleClose = (isOpen: boolean) => {
    if (!isOpen && success) {
      router.push("/player/bookings");
      return;
    }
    if (!mutation.isPending) {
      onOpenChange(isOpen);
      setSuccess(false);
      setNotes("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="border-white/10 bg-[#121c12] text-white max-w-md sm:rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-black uppercase tracking-tight">
            {success ? "Booking Submitted!" : "Confirm Your Booking"}
          </DialogTitle>
        </DialogHeader>

        {success ? (
          <div className="space-y-6 py-4">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="flex size-16 items-center justify-center rounded-full bg-primary/10 border border-primary/20">
                <CheckCircle2 size={32} className="text-primary" />
              </div>
              <div>
                <p className="font-bold text-base mb-1">Your booking is pending!</p>
                <p className="text-sm text-text-muted/50">
                  The venue owner will review and confirm your booking. You&apos;ll see the status update on your bookings page.
                </p>
              </div>
            </div>
            <button
              onClick={() => router.push("/player/bookings")}
              className="w-full rounded-2xl bg-primary py-4 text-sm font-black uppercase tracking-widest text-text-dark transition-all hover:brightness-110"
            >
              View My Bookings
            </button>
          </div>
        ) : (
          <div className="space-y-6 py-2">
            {/* Booking Summary */}
            <div className="space-y-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
              <div className="flex items-center gap-3 text-sm">
                <MapPin size={14} className="text-primary shrink-0" />
                <div>
                  <span className="font-bold block">{venue.name}</span>
                  <span className="text-text-muted/40 text-xs">{venue.address}, {venue.city}</span>
                </div>
              </div>
              <div className="h-px bg-white/5" />
              <div className="flex items-center gap-3 text-sm">
                <Calendar size={14} className="text-primary shrink-0" />
                <span className="font-medium">{dateDisplay}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Clock size={14} className="text-primary shrink-0" />
                <span className="font-medium">{formatTime(startTime)} – {formatTime(endTime)}</span>
              </div>
              <div className="h-px bg-white/5" />
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-muted/50">{court.name} · {court.sport_type}</span>
                <span className="font-black text-lg text-white">₱{court.price_per_hour}</span>
              </div>
            </div>

            {/* QR Payment */}
            {venue.qr_payment_url && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-text-muted/40">
                  <QrCode size={12} />
                  <span>Scan to Pay</span>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white p-4 flex items-center justify-center">
                  <div className="relative w-full aspect-square max-w-[200px]">
                    <Image
                      src={venue.qr_payment_url}
                      alt="Payment QR Code"
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                </div>
                <p className="text-[11px] text-text-muted/40 text-center">
                  Pay the venue directly, then confirm your booking below. The venue owner will verify your payment.
                </p>
              </div>
            )}

            {/* Notes */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-text-muted/40">
                Notes (optional)
              </label>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any special requests or notes for the venue..."
                className="border-white/10 bg-white/[0.03] text-white placeholder:text-text-muted/20 rounded-xl resize-none"
                rows={2}
              />
            </div>

            {/* Confirm Button */}
            <button
              onClick={handleConfirm}
              disabled={mutation.isPending}
              className="w-full rounded-2xl bg-primary py-4 text-sm font-black uppercase tracking-widest text-text-dark transition-all hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {mutation.isPending ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Booking...
                </>
              ) : (
                "Confirm Booking"
              )}
            </button>

            <p className="text-[10px] text-text-muted/25 text-center">
              Your booking will be pending until the venue owner confirms.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
