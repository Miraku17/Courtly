"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, MapPin, ArrowRight, Clock, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { venueSlug } from "@/lib/utils";

type DaySchedule = { enabled: boolean; open: string; close: string };

export type PublicVenue = {
  id: string;
  name: string;
  type: string;
  address: string;
  city: string;
  description: string | null;
  image_url: string | null;
  tags: string[];
  operating_hours: Record<string, DaySchedule> | null;
  courts: { id: string; price_per_hour: number }[];
  venue_photos: { id: string; url: string; position: number }[];
};

function getIsOpen(hours: Record<string, DaySchedule> | null): boolean {
  if (!hours) return false;
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const now = new Date();
  const day = days[now.getDay()];
  const schedule = hours[day];
  if (!schedule?.enabled) return false;
  const [openH, openM] = schedule.open.split(":").map(Number);
  const [closeH, closeM] = schedule.close.split(":").map(Number);
  const current = now.getHours() * 60 + now.getMinutes();
  return current >= openH * 60 + openM && current < closeH * 60 + closeM;
}

function getOpenHoursLabel(hours: Record<string, DaySchedule> | null): string {
  if (!hours) return "Hours vary";
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const day = days[new Date().getDay()];
  const schedule = hours[day];
  if (!schedule?.enabled) return "Closed today";
  const fmt = (t: string) => {
    const [h, m] = t.split(":").map(Number);
    const period = h >= 12 ? "PM" : "AM";
    const h12 = h % 12 === 0 ? 12 : h % 12;
    return `${h12}:${String(m).padStart(2, "0")} ${period}`;
  };
  return `${fmt(schedule.open)} – ${fmt(schedule.close)}`;
}

interface PublicVenueCardProps {
  venue: PublicVenue;
  index?: number;
}

export function PublicVenueCard({ venue, index = 0 }: PublicVenueCardProps) {
  const isOpen = getIsOpen(venue.operating_hours);
  const openHours = getOpenHoursLabel(venue.operating_hours);
  const priceFrom = venue.courts.length > 0
    ? Math.min(...venue.courts.map((c) => c.price_per_hour))
    : null;
  const coverPhoto = venue.venue_photos
    ?.sort((a, b) => a.position - b.position)[0]?.url;
  const image = coverPhoto || "/hero_1.webp";
  const isPlaceholder = !coverPhoto;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{
        duration: 0.35,
        delay: index * 0.04,
        ease: [0.25, 0.1, 0.25, 1],
        layout: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
      }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-[#121c12]/40 backdrop-blur-sm transition-all duration-300 hover:border-primary/25 hover:bg-white/[0.04] hover:shadow-[0_8px_40px_rgba(217,241,112,0.06)]"
    >
      <Link href={`/courts/${venueSlug(venue.name, venue.id)}`} className="absolute inset-0 z-10" />

      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-white/[0.04]">
        <Image
          src={image}
          alt={venue.name}
          fill
          unoptimized
          className={`transition-transform duration-700 group-hover:scale-105 ${
            isPlaceholder
              ? "object-cover opacity-20"
              : "object-cover"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Rating Overlay */}
        <div className="absolute right-3 top-3 z-20 flex items-center gap-1 rounded-lg bg-black/40 px-2 py-1 backdrop-blur-md border border-white/10">
          <Star size={12} className="fill-primary text-primary" />
          <span className="text-[11px] font-bold text-white">4.9</span>
        </div>

        {/* Status */}
        <div className="absolute left-3 top-3 z-20 flex items-center gap-1.5 rounded-full bg-black/40 px-2.5 py-1 backdrop-blur-md border border-white/10">
          <span
            className={`size-1.5 rounded-full ${isOpen ? "bg-emerald-400 animate-pulse" : "bg-red-400"}`}
          />
          <span className="text-[10px] font-black uppercase tracking-widest text-white/90">
            {isOpen ? "Open" : "Closed"}
          </span>
        </div>

        {/* Bottom Left Info */}
        <div className="absolute bottom-3 left-3 z-20 flex flex-col gap-1.5">
          <div className="flex gap-1.5">
            <span className="rounded-md bg-primary px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.1em] text-text-dark">
              {venue.type}
            </span>
            <span className="flex items-center gap-1 rounded-md bg-white/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-white backdrop-blur-md">
              <Zap size={9} className="fill-white" />
              Instant
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center justify-between gap-4">
          <h3 className="font-panchang text-sm font-bold uppercase tracking-tight text-white transition-colors group-hover:text-primary line-clamp-1">
            {venue.name}
          </h3>
        </div>

        <div className="mb-4 flex items-center gap-1.5 text-[11px] font-medium text-text-muted/40">
          <MapPin size={11} className="flex-shrink-0 text-primary/60" />
          <span className="line-clamp-1">{venue.address}, {venue.city}</span>
        </div>

        {/* Meta row */}
        <div className="mb-5 grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2 rounded-lg bg-white/[0.03] p-2 border border-white/[0.05]">
            <Users size={12} className="text-text-muted/30" />
            <span className="text-[10px] font-bold text-text-muted/50">
              {venue.courts.length} {venue.courts.length === 1 ? "Court" : "Courts"}
            </span>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-white/[0.03] p-2 border border-white/[0.05]">
            <Clock size={12} className="text-text-muted/30" />
            <span className="text-[10px] font-bold text-text-muted/50">
              {isOpen ? "Closes 10 PM" : "Opens 6 AM"}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between border-t border-white/[0.05] pt-4">
          <div>
            <span className="mb-0.5 block text-[9px] font-black uppercase tracking-[0.2em] text-text-muted/20">
              Hourly from
            </span>
            {priceFrom !== null ? (
              <span className="text-xl font-black text-white">
                ₱{priceFrom}
              </span>
            ) : (
              <span className="text-[13px] font-bold text-text-muted/30">—</span>
            )}
          </div>
          <div className="z-20 flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-[10px] font-black uppercase tracking-widest text-text-dark transition-all duration-300 group-hover:scale-105 active:scale-95 group-hover:shadow-[0_0_20px_rgba(217,241,112,0.3)]">
            Book
            <ArrowRight
              size={12}
              strokeWidth={3}
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
