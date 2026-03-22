"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock, Loader2, Zap, ChevronDown } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useAvailability } from "@/hooks/use-availability";
import { BookingConfirmationDialog } from "./booking-confirmation-dialog";
import { cn } from "@/lib/utils";

type DaySchedule = { enabled: boolean; open: string; close: string };

interface Court {
  id: string;
  name: string;
  sport_type: string;
  surface_type: string | null;
  is_indoor: boolean;
  is_active: boolean;
  price_per_hour: number;
}

interface Venue {
  id: string;
  name: string;
  address: string;
  city: string;
  image_url: string | null;
  qr_payment_url: string | null;
  operating_hours: Record<string, DaySchedule> | null;
  courts: Court[];
}

function formatTime(t: string) {
  const [h, m] = t.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${period}`;
}

// Get disabled days of the week from operating hours
function getDisabledDays(operatingHours: Record<string, DaySchedule> | null): number[] {
  if (!operatingHours) return [0, 1, 2, 3, 4, 5, 6];
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return dayNames
    .map((name, i) => (!operatingHours[name]?.enabled ? i : -1))
    .filter((i) => i !== -1);
}

export function BookingWidget({ venue }: { venue: Venue }) {
  const activeCourts = venue.courts?.filter((c) => c.is_active) ?? [];

  const [selectedCourtId, setSelectedCourtId] = useState<string | null>(
    activeCourts.length === 1 ? activeCourts[0].id : null
  );
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [courtDropdownOpen, setCourtDropdownOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const dateStr = selectedDate ? format(selectedDate, "yyyy-MM-dd") : null;
  const { data: availability, isLoading: slotsLoading } = useAvailability(selectedCourtId, dateStr);

  const selectedCourt = activeCourts.find((c) => c.id === selectedCourtId);
  const disabledDays = getDisabledDays(venue.operating_hours);

  const handleBookNow = () => {
    setConfirmOpen(true);
  };

  const canBook = selectedCourtId && selectedDate && selectedSlot;

  return (
    <>
      <div className="rounded-[40px] border border-white/10 bg-[#121c12] p-8 shadow-2xl shadow-black/50 ring-1 ring-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Zap size={120} className="text-primary" />
        </div>

        {/* Price Display */}
        <div className="mb-8 relative z-10">
          <span className="text-4xl font-black text-white">
            ₱{selectedCourt?.price_per_hour ?? (activeCourts.length > 0 ? Math.min(...activeCourts.map((c) => c.price_per_hour)) : 0)}
          </span>
          <span className="ml-2 text-sm font-bold text-text-muted/40 uppercase tracking-widest">/ hour</span>
        </div>

        <div className="space-y-4 relative z-10">
          {/* Court Selector */}
          {activeCourts.length > 1 && (
            <div className="relative">
              <button
                onClick={() => setCourtDropdownOpen(!courtDropdownOpen)}
                className="w-full flex items-center justify-between p-4 rounded-2xl border border-white/10 text-left transition-all hover:bg-white/5 bg-white/[0.02]"
              >
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-text-muted/40 block mb-1">Court</span>
                  <span className="text-sm font-bold">
                    {selectedCourt ? selectedCourt.name : "Select a court"}
                  </span>
                </div>
                <ChevronDown size={16} className={cn("text-text-muted/40 transition-transform", courtDropdownOpen && "rotate-180")} />
              </button>
              {courtDropdownOpen && (
                <div className="absolute top-full left-0 right-0 z-30 mt-2 rounded-2xl border border-white/10 bg-[#121c12] p-2 shadow-xl">
                  {activeCourts.map((court) => (
                    <button
                      key={court.id}
                      onClick={() => {
                        setSelectedCourtId(court.id);
                        setCourtDropdownOpen(false);
                        setSelectedSlot(null);
                      }}
                      className={cn(
                        "w-full flex items-center justify-between rounded-xl p-3 text-left text-sm transition-all",
                        selectedCourtId === court.id
                          ? "bg-primary/10 text-primary border border-primary/20"
                          : "hover:bg-white/5 text-white"
                      )}
                    >
                      <div>
                        <span className="font-bold block">{court.name}</span>
                        <span className="text-[10px] text-text-muted/40">{court.sport_type} · {court.is_indoor ? "Indoor" : "Outdoor"}</span>
                      </div>
                      <span className="font-black text-sm">₱{court.price_per_hour}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Date + Time Row */}
          <div className="grid grid-cols-2 rounded-2xl border border-white/10 overflow-hidden bg-white/[0.02]">
            {/* Date Picker */}
            <Popover>
              <PopoverTrigger asChild>
                <button className="flex flex-col items-start p-4 text-left transition-all hover:bg-white/5 border-r border-white/10">
                  <span className="text-[10px] font-black uppercase tracking-widest text-text-muted/40 mb-1 flex items-center gap-1.5">
                    <CalendarIcon size={10} /> Date
                  </span>
                  <span className="text-sm font-bold">
                    {selectedDate ? format(selectedDate, "MMM d") : "Select date"}
                  </span>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 border-white/10 bg-[#121c12]" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => {
                    setSelectedDate(date);
                    setSelectedSlot(null);
                  }}
                  disabled={[
                    { before: new Date() },
                    (date) => disabledDays.includes(date.getDay()),
                  ]}
                  className="rounded-2xl"
                />
              </PopoverContent>
            </Popover>

            {/* Time Display */}
            <div className="flex flex-col items-start p-4 text-left">
              <span className="text-[10px] font-black uppercase tracking-widest text-text-muted/40 mb-1 flex items-center gap-1.5">
                <Clock size={10} /> Time
              </span>
              <span className="text-sm font-bold">
                {selectedSlot ? formatTime(selectedSlot) : "Select below"}
              </span>
            </div>
          </div>

          {/* Time Slots Grid */}
          {selectedCourtId && selectedDate && (
            <div className="space-y-3">
              <span className="text-[10px] font-black uppercase tracking-widest text-text-muted/40">
                Available times
              </span>
              {slotsLoading ? (
                <div className="flex items-center justify-center py-6">
                  <Loader2 size={20} className="animate-spin text-primary" />
                </div>
              ) : availability?.slots && availability.slots.length > 0 ? (
                <div className="grid grid-cols-3 gap-2">
                  {availability.slots.map((slot) => (
                    <button
                      key={slot.start}
                      disabled={!slot.available}
                      onClick={() => setSelectedSlot(slot.start)}
                      className={cn(
                        "rounded-xl py-2.5 text-xs font-bold transition-all",
                        !slot.available && "opacity-20 cursor-not-allowed line-through text-text-muted/30 bg-white/[0.02]",
                        slot.available && selectedSlot === slot.start
                          ? "bg-primary text-text-dark shadow-lg shadow-primary/20"
                          : slot.available && "bg-white/[0.04] text-white border border-white/10 hover:border-primary/30 hover:bg-white/[0.06]"
                      )}
                    >
                      {formatTime(slot.start)}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-center text-xs text-text-muted/30 py-4">
                  No available slots for this date
                </p>
              )}
            </div>
          )}
        </div>

        {/* Book Button */}
        <button
          onClick={handleBookNow}
          disabled={!canBook}
          className={cn(
            "mt-8 w-full rounded-[24px] py-5 text-sm font-black uppercase tracking-[0.2em] shadow-xl transition-all",
            canBook
              ? "bg-primary text-text-dark shadow-primary/20 hover:scale-[1.02] hover:brightness-110 active:scale-[0.98]"
              : "bg-white/10 text-text-muted/30 cursor-not-allowed"
          )}
        >
          {canBook ? "Book Now" : "Select court, date & time"}
        </button>

        <p className="mt-6 text-center text-[11px] font-bold text-text-muted/20 uppercase tracking-[0.1em]">
          {venue.qr_payment_url ? "Pay via QR after booking" : "Secure instant confirmation"}
        </p>

        {/* Price Breakdown */}
        {selectedCourt && (
          <div className="mt-8 space-y-4 border-t border-white/10 pt-8 relative z-10 font-medium">
            <div className="flex justify-between text-sm text-text-muted/60">
              <span className="underline decoration-white/10">Court hire (1 hour)</span>
              <span>₱{selectedCourt.price_per_hour}</span>
            </div>
            <div className="flex justify-between text-sm text-text-muted/60">
              <span className="underline decoration-white/10">Service fee</span>
              <span>₱0</span>
            </div>
            <div className="flex justify-between pt-4 text-lg font-black text-white border-t border-white/5">
              <span>Total</span>
              <span>₱{selectedCourt.price_per_hour}</span>
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Dialog */}
      {selectedCourt && selectedDate && selectedSlot && (
        <BookingConfirmationDialog
          open={confirmOpen}
          onOpenChange={setConfirmOpen}
          court={selectedCourt}
          venue={venue}
          date={format(selectedDate, "yyyy-MM-dd")}
          dateDisplay={format(selectedDate, "EEEE, MMMM d, yyyy")}
          startTime={selectedSlot}
          endTime={(() => {
            const [h, m] = selectedSlot.split(":").map(Number);
            const endM = h * 60 + m + 60;
            return `${String(Math.floor(endM / 60)).padStart(2, "0")}:${String(endM % 60).padStart(2, "0")}`;
          })()}
        />
      )}
    </>
  );
}
