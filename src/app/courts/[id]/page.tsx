"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Building2,
  Tag,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Star,
  CheckCircle2,
  Users,
  Info,
  Wifi,
  Car,
  Coffee,
  ShieldCheck,
  X,
  Zap,
  Share,
  Heart,
  Target,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getPublicVenue } from "@/lib/api/venues";
import { extractIdFromSlug } from "@/lib/utils";
import { Navbar } from "@/components/common/navbar";
import { Footer } from "@/components/common/footer";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BookingWidget } from "@/components/common/booking-widget";
import dynamic from "next/dynamic";

const MapPicker = dynamic(
  () => import("@/components/common/map-picker").then((mod) => mod.MapPicker),
  { ssr: false }
);

type DaySchedule = { enabled: boolean; open: string; close: string };

function formatTime(t: string) {
  const [h, m] = t.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${period}`;
}

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

const AMENITY_ICONS: Record<string, any> = {
  "Parking": Car,
  "WiFi": Wifi,
  "Cafe": Coffee,
  "Showers": Users,
  "Locker Rooms": ShieldCheck,
  "Pro Shop": Zap,
  "Indoor": Building2,
  "Outdoor": MapPin,
};

// Shared bento card styles
const bentoCard = "rounded-[24px] border border-white/[0.06] bg-white/[0.02] relative overflow-hidden";

export default function VenueDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: slug } = use(params);
  const venueId = extractIdFromSlug(slug);
  // const [isFavorite, setIsFavorite] = useState(false); // Coming soon
  const [isScrolled, setIsScrolled] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["public-venue", venueId],
    queryFn: () => getPublicVenue(venueId!),
    enabled: !!venueId,
  });

  const venue = data?.venue;
  // TODO: Reviews coming soon
  // const rating = 4.9;
  // const reviewCount = 124;

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-bg-dark">
        <Loader2 size={32} className="animate-spin text-primary" />
      </div>
    );
  }

  if (isError || !venue) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-bg-dark py-40 text-center px-4">
        <Building2 size={48} className="text-text-muted/20 mb-4" />
        <h2 className="text-xl font-bold text-white mb-2">Venue not found</h2>
        <p className="text-sm text-text-muted/40 mb-6 max-w-sm">This venue may have been removed or is not yet approved.</p>
        <Link href="/courts" className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-text-dark transition-all hover:brightness-110">
          <ArrowLeft size={16} /> Back to Courts
        </Link>
      </div>
    );
  }

  const photos = venue.venue_photos?.sort((a: any, b: any) => a.position - b.position) || [];
  const displayPhotos = photos.length > 0 ? photos.slice(0, 5) : [];
  const allPhotos: { id: string; url: string }[] = photos.length > 0 ? photos : venue.image_url ? [{ id: "cover", url: venue.image_url }] : [];
  const minPrice = venue.courts?.length > 0 ? Math.min(...venue.courts.map((c: any) => c.price_per_hour)) : 0;
  const activeCourts = venue.courts?.filter((c: any) => c.is_active) || [];

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-bg-dark text-white selection:bg-primary selection:text-text-dark"
      style={{
        backgroundImage: "linear-gradient(180deg, #102b0f 0%, #0a180a 100%)",
      }}
    >
      <Navbar />

      {/* Header Info */}
      <section className="mx-auto max-w-7xl px-4 pt-4 pb-3 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-primary/60 mb-1">
              <Link href="/courts" className="hover:text-primary transition-colors flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest">
                <ArrowLeft size={14} /> Back to Search
              </Link>
            </div>
            <h1 className="text-2xl font-black tracking-tight sm:text-3xl md:text-4xl lg:font-panchang uppercase">
              {venue.name}
            </h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium">
              {/* Reviews coming soon
              <div className="flex items-center gap-1">
                <Star size={16} className="fill-primary text-primary" />
                <span>{rating}</span>
                <span className="text-text-muted/40">·</span>
                <button className="underline hover:text-primary transition-colors">{reviewCount} reviews</button>
              </div>
              <span className="text-text-muted/20 hidden sm:inline">·</span>
              */}
              <div className="flex items-center gap-1 text-text-muted/60">
                <MapPin size={16} className="text-primary/60" />
                <span>{venue.city}, Philippines</span>
              </div>
            </div>
          </div>
          {/* Favorite & Share coming soon
          <div className="flex items-center gap-3 shrink-0">
            <button className="flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-xs font-bold transition-all hover:bg-white/5">
              <Share size={14} /> Share
            </button>
            <button onClick={() => setIsFavorite(!isFavorite)} className="flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-xs font-bold transition-all hover:bg-white/5">
              <Heart size={14} className={isFavorite ? "fill-rose-500 text-rose-500" : ""} /> Save
            </button>
          </div>
          */}
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl">
          {displayPhotos.length >= 5 ? (
            <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-2 aspect-[4/3] md:aspect-[21/9]">
              <div onClick={() => { setLightboxIndex(0); setLightboxOpen(true); }} className="md:col-span-2 md:row-span-2 relative group overflow-hidden cursor-pointer">
                <Image src={displayPhotos[0].url} alt={venue.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" priority unoptimized />
              </div>
              {displayPhotos.slice(1, 5).map((photo: any, i: number) => (
                <div key={photo.id} onClick={() => { setLightboxIndex(i + 1); setLightboxOpen(true); }} className="hidden md:block relative group overflow-hidden cursor-pointer">
                  <Image src={photo.url} alt={`${venue.name} ${i + 2}`} fill className="object-cover transition-transform duration-700 group-hover:scale-105" unoptimized />
                </div>
              ))}
            </div>
          ) : (
            <div className="aspect-[21/9] bg-white/[0.03] border border-white/[0.08] flex items-center justify-center relative group overflow-hidden">
              <Image src={venue.image_url || "/hero_1.webp"} alt={venue.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-60" unoptimized />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="relative z-10 flex flex-col items-center">
                <div className="size-20 rounded-2xl bg-primary/20 backdrop-blur-md flex items-center justify-center border border-primary/20 mb-4">
                  <Building2 size={40} className="text-primary" />
                </div>
                <p className="font-panchang text-xs font-bold tracking-widest text-white/50 uppercase">Court Gallery</p>
              </div>
            </div>
          )}
          {allPhotos.length > 0 && (
            <button onClick={() => { setLightboxIndex(0); setLightboxOpen(true); }} className="absolute bottom-6 right-6 z-10 flex items-center gap-2 rounded-xl bg-bg-dark/80 px-5 py-2.5 text-xs font-black uppercase tracking-widest backdrop-blur-md border border-white/10 transition-hover hover:bg-bg-dark">
              Show all photos
            </button>
          )}
        </div>
      </section>

      {/* ── Bento Grid ── */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          {/* ─ Stats Card ─ */}
          <div className={`${bentoCard} md:col-span-3 p-6 sm:p-8 flex flex-col justify-center`}>
            <div className="absolute -bottom-6 -right-6 size-32 rounded-full bg-primary/[0.04] blur-xl" />
            <div className="flex items-center gap-4 relative z-10">
              <div className="flex flex-col items-center flex-1 py-2">
                <span className="text-2xl font-black text-primary">{activeCourts.length}</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted/30 mt-1">Courts</span>
              </div>
              <div className="w-px h-10 bg-white/5" />
              <div className="flex flex-col items-center flex-1 py-2">
                <span className="text-2xl font-black text-primary">₱{minPrice}</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted/30 mt-1">From</span>
              </div>
              <div className="w-px h-10 bg-white/5" />
              <div className="flex flex-col items-center flex-1 py-2">
                {getIsOpen(venue.operating_hours) ? (
                  <>
                    <span className="text-2xl font-black text-emerald-400">Open</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400/50 mt-1">Now</span>
                  </>
                ) : (
                  <>
                    <span className="text-2xl font-black text-text-muted/40">Closed</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted/20 mt-1">Now</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* ─ Description Card (2 col) ─ */}
          <div className={`${bentoCard} lg:col-span-2 p-6 sm:p-8`}>
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-4">About this venue</h3>
            <p className="text-text-muted/60 leading-relaxed whitespace-pre-wrap text-[15px]">
              {venue.description || "No description provided for this venue."}
            </p>
          </div>

          {/* ─ Amenities Card (1 col) ─ */}
          <div className={`${bentoCard} p-6 sm:p-8`}>
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-5">Amenities</h3>
            <div className="space-y-3">
              {venue.tags && venue.tags.length > 0 ? (
                venue.tags.map((tag: string) => {
                  const Icon = AMENITY_ICONS[tag] || Tag;
                  return (
                    <div key={tag} className="flex items-center gap-3 group">
                      <div className="size-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center shrink-0 group-hover:bg-primary/10 group-hover:border-primary/20 transition-colors">
                        <Icon size={16} className="text-white/40 group-hover:text-primary transition-colors" />
                      </div>
                      <span className="text-sm font-medium text-text-muted/60">{tag}</span>
                    </div>
                  );
                })
              ) : (
                <p className="text-sm text-text-muted/30 italic">No amenities listed.</p>
              )}
            </div>
          </div>

          {/* ─ Courts Card (full width) ─ */}
          <div className={`${bentoCard} md:col-span-2 lg:col-span-3 p-6 sm:p-8`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Available Courts</h3>
              <span className="text-[10px] font-black uppercase tracking-widest text-text-muted/20 px-2.5 py-1 rounded-md border border-white/5 bg-white/[0.02]">
                {activeCourts.length} {activeCourts.length === 1 ? "Court" : "Courts"}
              </span>
            </div>
            <div className="space-y-3">
              {activeCourts.map((court: any) => (
                <motion.div
                  key={court.id}
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="group relative flex flex-col sm:flex-row sm:items-center gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-4 sm:p-5 transition-all hover:border-primary/20 hover:bg-white/[0.04]"
                >
                  {/* Icon + Info */}
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="size-12 rounded-xl bg-white/[0.04] border border-white/[0.06] overflow-hidden shrink-0 group-hover:border-primary/25 transition-colors">
                      <Image src={venue.image_url || "/logo_final.png"} alt={court.name} width={48} height={48} className="object-cover size-full" unoptimized />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-[15px] font-bold text-white truncate">{court.name}</h4>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
                        <span className="text-[11px] font-semibold text-text-muted/40 bg-white/[0.04] px-2 py-0.5 rounded-md">
                          {court.sport_type}
                        </span>
                        <span className="text-[11px] text-text-muted/30 font-medium">
                          {court.surface_type}
                        </span>
                        <span className="text-white/10">·</span>
                        <span className="text-[11px] text-text-muted/30 font-medium">
                          {court.is_indoor ? "Indoor" : "Outdoor"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Price + Action */}
                  <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6 shrink-0 pl-16 sm:pl-0">
                    <div className="text-right">
                      <span className="text-lg font-black text-white">₱{court.price_per_hour}</span>
                      <span className="text-[10px] font-bold text-text-muted/25 ml-0.5">/ hr</span>
                    </div>
                    <button className="rounded-xl bg-primary/10 px-5 py-2.5 text-[10px] font-black uppercase tracking-widest text-primary border border-primary/20 transition-all hover:bg-primary hover:text-text-dark hover:border-primary hover:shadow-[0_0_24px_rgba(217,241,112,0.15)] active:scale-95">
                      Book
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ─ Map Card (2 col) ─ */}
          <div className={`${bentoCard} md:col-span-2 overflow-hidden`}>
            <div className="p-6 sm:p-8 pb-0">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-1">Location</h3>
              <p className="text-sm text-text-muted/40 font-medium">{venue.address}, {venue.city}</p>
            </div>
            <div className="group relative z-0 h-[320px] w-full mt-4">
              <MapPicker lat={venue.lat || 10.3157} lng={venue.lng || 123.8854} onLocationChange={() => {}} />
              <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between gap-4 rounded-xl bg-bg-dark/80 p-4 backdrop-blur-xl border border-white/10 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/30 shrink-0">
                    <MapPin size={20} className="text-primary" />
                  </div>
                  <h4 className="font-bold text-white text-sm">{venue.city}, Philippines</h4>
                </div>
                <button className="rounded-xl bg-white/5 px-5 py-2.5 text-[10px] font-black uppercase tracking-widest text-white border border-white/10 hover:bg-white/10 transition-colors shrink-0">
                  Directions
                </button>
              </div>
            </div>
          </div>

          {/* ─ Things to Know Card (1 col) — only renders if DB has data ─ */}
          {((venue.venue_rules?.length > 0) || (venue.safety_health?.length > 0) || venue.cancellation_policy) && (
          <div className={`${bentoCard} p-6 sm:p-8 space-y-6`}>
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Things to know</h3>

            {venue.venue_rules?.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-bold text-sm flex items-center gap-2"><Clock size={14} className="text-primary" /> Venue Rules</h4>
                <ul className="space-y-2">
                  {venue.venue_rules.map((rule: string, i: number) => (
                    <li key={i} className="text-sm text-text-muted/60 leading-relaxed flex gap-2.5">
                      <span className="size-1.5 rounded-full bg-primary/40 mt-1.5 shrink-0" /> {rule}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {venue.venue_rules?.length > 0 && (venue.safety_health?.length > 0 || venue.cancellation_policy) && (
              <div className="h-px bg-white/5" />
            )}

            {venue.safety_health?.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-bold text-sm flex items-center gap-2"><ShieldCheck size={14} className="text-primary" /> Safety & Health</h4>
                <ul className="space-y-2">
                  {venue.safety_health.map((item: string, i: number) => (
                    <li key={i} className="text-sm text-text-muted/60 leading-relaxed flex gap-2.5">
                      <span className="size-1.5 rounded-full bg-primary/40 mt-1.5 shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {venue.safety_health?.length > 0 && venue.cancellation_policy && (
              <div className="h-px bg-white/5" />
            )}

            {venue.cancellation_policy && (
            <div className="space-y-3">
              <h4 className="font-bold text-sm flex items-center gap-2"><Info size={14} className="text-primary" /> Cancellation</h4>
              <p className="text-sm text-text-muted/60 leading-relaxed italic">
                {venue.cancellation_policy}
              </p>
            </div>
            )}
          </div>
          )}

        </div>
      </section>

      {/* Booking Widget — commented out for now */}
      {/*
      <section className="mx-auto max-w-md px-4 py-8 sm:px-6 lg:fixed lg:right-8 lg:top-28 lg:z-40 lg:max-w-sm lg:p-0 xl:right-[calc((100vw-1280px)/2)]">
        <BookingWidget venue={{
          id: venue.id,
          name: venue.name,
          address: venue.address,
          city: venue.city,
          image_url: venue.image_url,
          qr_payment_url: venue.qr_payment_url,
          operating_hours: venue.operating_hours,
          courts: venue.courts,
        }} slug={slug} />
      </section>
      */}

      {/* Floating Header */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div initial={{ y: -100 }} animate={{ y: 0 }} exit={{ y: -100 }} className="fixed top-0 left-0 right-0 z-50 h-16 bg-bg-dark/80 backdrop-blur-xl border-b border-white/10 px-4 sm:px-6 lg:px-8 hidden lg:block">
            <div className="mx-auto max-w-7xl h-full flex items-center justify-between">
              <div className="flex items-center gap-5">
                <Link href="/courts" className="text-text-muted/60 hover:text-white transition-colors">
                  <ArrowLeft size={18} />
                </Link>
                <div>
                  <h4 className="font-bold text-sm uppercase tracking-tight">{venue.name}</h4>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-text-muted/40 uppercase tracking-widest">
                    {/* Reviews coming soon
                    <Star size={10} className="fill-primary text-primary" /> <span>{rating} ({reviewCount})</span>
                    <span className="text-white/10">·</span>
                    */}
                    <span>{venue.city}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-black text-white">From ₱{minPrice}<span className="text-text-muted/30 font-bold ml-1">/ hr</span></span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm" onClick={() => setLightboxOpen(false)}>
            <button onClick={() => setLightboxOpen(false)} className="absolute top-8 right-8 z-10 flex size-12 items-center justify-center rounded-full bg-white/5 text-white transition-colors hover:bg-white/10">
              <X size={24} />
            </button>
            <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10 text-xs font-black uppercase tracking-[0.3em] text-white/40">
              {lightboxIndex + 1} / {allPhotos.length}
            </div>
            {allPhotos.length > 1 && (
              <>
                <button onClick={(e) => { e.stopPropagation(); setLightboxIndex((i) => (i - 1 + allPhotos.length) % allPhotos.length); }} className="absolute left-8 z-10 flex size-16 items-center justify-center rounded-full bg-white/5 text-white transition-colors hover:bg-white/10">
                  <ChevronLeft size={32} />
                </button>
                <button onClick={(e) => { e.stopPropagation(); setLightboxIndex((i) => (i + 1) % allPhotos.length); }} className="absolute right-8 z-10 flex size-16 items-center justify-center rounded-full bg-white/5 text-white transition-colors hover:bg-white/10">
                  <ChevronRight size={32} />
                </button>
              </>
            )}
            <motion.div key={lightboxIndex} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", damping: 25 }} className="relative h-[80vh] w-[90vw] max-w-6xl" onClick={(e) => e.stopPropagation()}>
              <Image src={allPhotos[lightboxIndex].url} alt="Venue Photo" fill className="object-contain" unoptimized priority />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </motion.main>
  );
}
