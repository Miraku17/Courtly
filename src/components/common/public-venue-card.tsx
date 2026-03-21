"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, MapPin, ArrowRight, Clock, Users } from "lucide-react";
import { motion } from "framer-motion";

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
  const image = venue.image_url || "/logo_final.png";
  const isPlaceholder = !venue.image_url;

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
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] transition-all duration-300 hover:border-primary/25 hover:bg-white/[0.04] hover:shadow-[0_8px_40px_rgba(217,241,112,0.06)]"
    >
      <Link href="/signin" className="absolute inset-0 z-10" />

      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-white/[0.04]">
        <Image
          src={image}
          alt={venue.name}
          fill
          unoptimized
          className={`transition-transform duration-700 group-hover:scale-105 ${
            isPlaceholder
              ? "object-contain p-10 opacity-20"
              : "object-contain p-6"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/60 via-transparent to-transparent" />

        {/* Open/Closed status */}
        <div className="absolute left-3 top-3 z-20 flex items-center gap-1.5 rounded-full bg-bg-dark/60 px-2.5 py-1 backdrop-blur-md">
          <span
            className={`size-1.5 rounded-full ${isOpen ? "bg-emerald-400 animate-pulse" : "bg-red-400"}`}
          />
          <span className="text-[10px] font-semibold text-white/80">
            {isOpen ? "Open" : "Closed"}
          </span>
        </div>

        {/* Sport type badge */}
        <div className="absolute bottom-3 left-3 z-20 flex gap-1.5">
          <span className="rounded-md bg-primary/90 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-text-dark backdrop-blur-sm">
            {venue.type}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="mb-1 text-[15px] font-bold leading-snug text-white transition-colors group-hover:text-primary sm:text-base">
          {venue.name}
        </h3>

        <div className="mb-3 flex items-center gap-1.5 text-[11px] text-text-muted/45">
          <MapPin size={10} className="flex-shrink-0 text-primary/50" />
          <span className="line-clamp-1">{venue.address}, {venue.city}</span>
        </div>

        {/* Meta row */}
        <div className="mb-3 flex items-center gap-3 text-[10px] text-text-muted/35">
          <span className="flex items-center gap-1">
            <Users size={10} />
            {venue.courts.length} {venue.courts.length === 1 ? "court" : "courts"}
          </span>
          <span className="size-0.5 rounded-full bg-text-muted/20" />
          <span className="flex items-center gap-1">
            <Clock size={10} />
            {openHours}
          </span>
        </div>

        {/* Tags */}
        <div className="mb-4 flex flex-wrap gap-1.5">
          {venue.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-0.5 text-[9px] font-medium text-text-muted/40 capitalize"
            >
              {tag}
            </span>
          ))}
          {venue.tags.length > 3 && (
            <span className="rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-0.5 text-[9px] font-medium text-text-muted/30">
              +{venue.tags.length - 3}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between border-t border-white/[0.05] pt-3">
          <div>
            <span className="mb-0.5 block text-[9px] font-bold uppercase tracking-widest text-text-muted/25">
              From
            </span>
            {priceFrom !== null ? (
              <span className="text-lg font-extrabold text-white">
                ₱{priceFrom}
                <span className="text-[10px] font-medium text-text-muted/35">/hr</span>
              </span>
            ) : (
              <span className="text-[13px] font-bold text-text-muted/30">—</span>
            )}
          </div>
          <div className="z-20 flex items-center gap-1.5 rounded-xl border border-white/[0.08] bg-white/[0.04] px-3.5 py-2 text-[10px] font-bold uppercase tracking-wider text-white transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-text-dark">
            Book
            <ArrowRight
              size={11}
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
