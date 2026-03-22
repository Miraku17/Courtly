"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, AlertTriangle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { cancelBooking } from "@/lib/api/bookings";
import { toast } from "sonner";

interface CancelBookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bookingId: string;
  venueName: string;
}

export function CancelBookingDialog({
  open,
  onOpenChange,
  bookingId,
  venueName,
}: CancelBookingDialogProps) {
  const queryClient = useQueryClient();
  const [reason, setReason] = useState("");

  const mutation = useMutation({
    mutationFn: () => cancelBooking(bookingId, reason || undefined),
    onSuccess: () => {
      toast.success("Booking cancelled successfully.");
      queryClient.invalidateQueries({ queryKey: ["my-bookings"] });
      queryClient.invalidateQueries({ queryKey: ["venue-bookings"] });
      onOpenChange(false);
      setReason("");
    },
    onError: (error: { response?: { data?: { error?: string } } }) => {
      const message = error?.response?.data?.error || "Failed to cancel booking.";
      toast.error(message);
    },
  });

  return (
    <Dialog open={open} onOpenChange={(isOpen) => { if (!mutation.isPending) { onOpenChange(isOpen); setReason(""); } }}>
      <DialogContent className="border-white/10 bg-[#121c12] text-white max-w-sm sm:rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-black">Cancel Booking</DialogTitle>
        </DialogHeader>

        <div className="space-y-5 py-2">
          <div className="flex items-start gap-3 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-4">
            <AlertTriangle size={18} className="text-yellow-500 shrink-0 mt-0.5" />
            <p className="text-sm text-text-muted/60">
              Are you sure you want to cancel your booking at <span className="font-bold text-white">{venueName}</span>?
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-text-muted/40">
              Reason (optional)
            </label>
            <Textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Why are you cancelling?"
              className="border-white/10 bg-white/[0.03] text-white placeholder:text-text-muted/20 rounded-xl resize-none"
              rows={2}
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => { onOpenChange(false); setReason(""); }}
              disabled={mutation.isPending}
              className="flex-1 rounded-xl border border-white/10 py-3 text-xs font-bold uppercase tracking-widest text-text-muted/50 transition-all hover:bg-white/5"
            >
              Keep Booking
            </button>
            <button
              onClick={() => mutation.mutate()}
              disabled={mutation.isPending}
              className="flex-1 rounded-xl bg-red-500 py-3 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-red-600 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {mutation.isPending ? (
                <><Loader2 size={14} className="animate-spin" /> Cancelling...</>
              ) : (
                "Cancel Booking"
              )}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
