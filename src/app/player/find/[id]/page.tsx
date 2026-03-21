"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  MapPin,
  Heart,
  ChevronLeft,
  Wifi,
  Coffee,
  Car,
  Wind,
  Shield,
  CalendarDays,
  Clock,
  ArrowRight,
  Check,
} from "lucide-react";
import { mockVenues } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const amenities = [
  { icon: Wifi, label: "Free Wi-Fi" },
  { icon: Coffee, label: "Cafe & Lounge" },
  { icon: Car, label: "Free Parking" },
  { icon: Wind, label: "Air Conditioning" },
  { icon: Shield, label: "Locker Rooms" },
];

const timeSlots = [
  { time: "09:00", available: true },
  { time: "10:00", available: true },
  { time: "11:00", available: false },
  { time: "12:00", available: false },
  { time: "14:00", available: true },
  { time: "15:00", available: true },
  { time: "16:00", available: true },
  { time: "17:00", available: false },
];

export default function VenueDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const venue = mockVenues.find((v) => v.id === id.replace("-copy", "")) || mockVenues[0];
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isFav, setIsFav] = useState(venue.isFavorite || false);

  return (
    <div className="space-y-10 pb-32 lg:pb-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="flex items-center justify-between"
      >
        <Link
          href="/player/find"
          className="flex items-center gap-2 text-section-dark/50 hover:text-section-dark transition-colors group"
        >
          <div className="size-9 rounded-xl bg-[#f5f5f5] border border-section-dark/10 flex items-center justify-center group-hover:border-section-dark/20 transition-colors">
            <ChevronLeft size={18} />
          </div>
          <span className="font-bold text-sm hidden sm:inline">Back to Search</span>
        </Link>
        <button
          onClick={() => setIsFav(!isFav)}
          className={cn(
            "flex items-center gap-2 px-5 py-2 rounded-xl border text-sm font-bold transition-all",
            isFav
              ? "border-section-dark/20 bg-section-dark/10 text-section-dark"
              : "border-section-dark/10 text-section-dark/50 hover:border-section-dark/20 hover:text-section-dark"
          )}
        >
          <Heart size={16} className={cn(isFav && "fill-section-dark")} />
          <span className="hidden sm:inline">{isFav ? "Saved" : "Save"}</span>
        </button>
      </motion.div>

      {/* Hero Gallery */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.08 }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-3 h-[280px] sm:h-[360px] lg:h-[420px]"
      >
        <div className="lg:col-span-8 relative rounded-2xl lg:rounded-3xl overflow-hidden border border-section-dark/10">
          <Image src={venue.image} alt={venue.name} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>
        <div className="hidden lg:grid lg:col-span-4 grid-rows-2 gap-3">
          <div className="relative rounded-2xl overflow-hidden border border-section-dark/10">
            <Image src={venue.image} alt="Gallery 1" fill className="object-cover brightness-75" />
          </div>
          <div className="relative rounded-2xl overflow-hidden border border-section-dark/10 group cursor-pointer">
            <Image src={venue.image} alt="Gallery 2" fill className="object-cover brightness-50" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white font-bold text-lg bg-white/10 backdrop-blur-sm px-5 py-2 rounded-xl border border-white/10">
                +12 Photos
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 items-start">
        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="space-y-10"
        >
          {/* Venue Header */}
          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              {venue.sports.map((s) => (
                <span
                  key={s}
                  className="px-3 py-1 rounded-lg bg-section-dark/10 text-section-dark text-[11px] font-bold uppercase tracking-wider border border-section-dark/15"
                >
                  {s}
                </span>
              ))}
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-section-dark mb-4">{venue.name}</h1>
            <div className="flex flex-wrap items-center gap-5 text-section-dark/50 text-sm">
              <div className="flex items-center gap-1.5">
                <Star size={16} className="fill-section-dark text-section-dark" />
                <span className="text-section-dark font-bold">{venue.rating}</span>
                <span>({venue.reviewCount} reviews)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin size={16} className="text-section-dark/40" />
                <span>{venue.address}</span>
              </div>
            </div>
          </div>

          {/* About */}
          <div>
            <h3 className="text-lg font-bold text-section-dark mb-3">About</h3>
            <p className="text-section-dark/60 leading-relaxed">
              Experience world-class facilities at {venue.name}. Our venue features state-of-the-art courts,
              professional-grade lighting, and a vibrant community atmosphere. Whether you&apos;re a seasoned pro
              or just starting out, we provide the perfect environment for your game.
            </p>
          </div>

          {/* Amenities */}
          <div>
            <h3 className="text-lg font-bold text-section-dark mb-4">Amenities</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {amenities.map((amenity) => (
                <div
                  key={amenity.label}
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-[#f5f5f5] border border-section-dark/10 shadow-sm"
                >
                  <div className="size-9 rounded-lg bg-section-dark/10 flex items-center justify-center text-section-dark flex-shrink-0">
                    <amenity.icon size={16} />
                  </div>
                  <span className="text-sm text-section-dark/60 font-medium">{amenity.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Court Availability */}
          <div>
            <h3 className="text-lg font-bold text-section-dark mb-4">Court Availability</h3>
            <div className="space-y-4">
              {[1, 2].map((court) => (
                <div key={court} className="p-5 rounded-2xl bg-[#f5f5f5] border border-section-dark/10 shadow-sm space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-bold text-section-dark">
                      Court {court} <span className="text-section-dark/40 font-medium">({court === 1 ? "Indoor" : "Outdoor"})</span>
                    </h4>
                    <span className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 uppercase tracking-wider">
                      <Check size={12} />
                      Available Today
                    </span>
                  </div>
                  <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                    {timeSlots.map((slot) => (
                      <button
                        key={`${court}-${slot.time}`}
                        disabled={!slot.available}
                        onClick={() => setSelectedTime(slot.time)}
                        className={cn(
                          "py-2.5 rounded-xl text-xs font-bold transition-all",
                          !slot.available
                            ? "bg-section-dark/5 border border-section-dark/8 text-section-dark/20 cursor-not-allowed"
                            : selectedTime === slot.time
                              ? "bg-section-dark text-white border border-section-dark shadow-md shadow-section-dark/15"
                              : "bg-white border border-section-dark/10 text-section-dark/60 hover:border-section-dark/20 hover:text-section-dark shadow-sm"
                        )}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div className="space-y-6 pt-6 border-t border-section-dark/10">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-section-dark">Reviews</h3>
              <button className="text-section-dark font-bold text-sm hover:underline">Write a Review</button>
            </div>
            <div className="space-y-5">
              {[
                { name: "John D.", date: "Mar 12, 2026", text: "Amazing facility! The courts are well-maintained and the staff is very friendly. The lighting for night games is perfect." },
                { name: "Sarah K.", date: "Mar 8, 2026", text: "Great venue for padel. Love the indoor courts. A bit pricey but worth it for the quality. Will definitely come back." },
              ].map((review, i) => (
                <div key={i} className="p-5 rounded-2xl bg-[#f5f5f5] border border-section-dark/10 shadow-sm space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="size-9 rounded-full bg-section-dark/10 border border-section-dark/10 flex items-center justify-center text-xs font-bold text-section-dark">
                        {review.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="text-section-dark font-bold text-sm">{review.name}</div>
                        <div className="text-section-dark/30 text-[11px] font-medium">{review.date}</div>
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={12} className="fill-section-dark text-section-dark" />
                      ))}
                    </div>
                  </div>
                  <p className="text-section-dark/60 text-sm leading-relaxed">{review.text}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Booking Sidebar - Desktop */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: 0.25 }}
          className="hidden lg:block sticky top-8"
        >
          <div className="bg-[#f5f5f5] border border-section-dark/10 rounded-3xl p-7 space-y-6 shadow-sm">
            <div>
              <span className="text-section-dark/50 text-xs font-medium uppercase tracking-wider">Starting from</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl font-extrabold text-section-dark">₱{venue.priceFrom}</span>
                <span className="text-section-dark/50 text-sm">/hour</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-white/60 border border-section-dark/10 flex items-center justify-between cursor-pointer hover:border-section-dark/20 transition-colors">
                <div className="flex items-center gap-3">
                  <CalendarDays size={18} className="text-section-dark/40" />
                  <div>
                    <div className="text-[10px] text-section-dark/30 font-bold uppercase tracking-wider">Date</div>
                    <div className="text-sm font-bold text-section-dark">Mar 20, 2026</div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/60 border border-section-dark/10 flex items-center justify-between cursor-pointer hover:border-section-dark/20 transition-colors">
                <div className="flex items-center gap-3">
                  <Clock size={18} className="text-section-dark/40" />
                  <div>
                    <div className="text-[10px] text-section-dark/30 font-bold uppercase tracking-wider">Time Slot</div>
                    <div className="text-sm font-bold text-section-dark">{selectedTime || "Select Time"}</div>
                  </div>
                </div>
              </div>
            </div>

            <button className="w-full py-4 rounded-2xl bg-section-dark text-white font-extrabold text-base hover:bg-section-dark/90 transition-all flex items-center justify-center gap-2">
              Book Now
              <ArrowRight size={18} />
            </button>

            <p className="text-center text-section-dark/30 text-xs">
              Pay the venue owner directly via their QR code.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Mobile Sticky Booking Bar */}
      <div className="fixed bottom-[72px] md:bottom-0 left-0 right-0 lg:hidden z-40 bg-white/95 backdrop-blur-2xl border-t border-section-dark/10 px-4 py-3">
        <div className="flex items-center justify-between gap-4 max-w-7xl mx-auto">
          <div>
            <span className="text-section-dark/50 text-xs">From</span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-extrabold text-section-dark">₱{venue.priceFrom}</span>
              <span className="text-section-dark/50 text-xs">/hr</span>
            </div>
          </div>
          <button className="flex-1 max-w-[240px] py-3.5 rounded-2xl bg-section-dark text-white font-extrabold text-sm flex items-center justify-center gap-2">
            Book Now
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
