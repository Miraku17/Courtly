"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  MapPin,
  ChevronDown,
  ArrowRight,
  ArrowUpDown,
  X,
  LayoutGrid,
  Map,
  Star,
  Shield,
  Zap,
  Calendar,
  SlidersHorizontal,
  Clock,
  Trophy,
  Activity,
  Target,
  Dribbble,
} from "lucide-react";
import { mockVenues, Venue } from "@/lib/mock-data";
import { Navbar } from "@/components/common/navbar";
import { Footer } from "@/components/common/footer";
import { PublicVenueCard } from "@/components/common/public-venue-card";
import { FadeIn } from "@/components/common/fade-in";
import { motion, AnimatePresence } from "framer-motion";

const sportFilters = [
  { label: "All", icon: Activity },
  { label: "Tennis", icon: Trophy },
  { label: "Padel", icon: Target },
  { label: "Pickleball", icon: Dribbble },
] as const;
type SportFilter = (typeof sportFilters)[number]["label"];

const sortOptions = [
  { label: "Relevance", value: "relevance" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Highest Rated", value: "rating" },
  { label: "Nearest First", value: "distance" },
] as const;
type SortOption = (typeof sortOptions)[number]["value"];

const amenityFilters = [
  "Indoor",
  "Outdoor",
  "Parking",
  "Lights",
  "Showers",
  "Cafe",
  "Pro Shop",
  "Coaching",
  "Equipment Rental",
] as const;

const popularCities = [
  { name: "San Francisco", count: 24, icon: "SF" },
  { name: "Palo Alto", count: 12, icon: "PA" },
  { name: "San Jose", count: 18, icon: "SJ" },
  { name: "Mountain View", count: 9, icon: "MV" },
  { name: "Redwood City", count: 7, icon: "RC" },
  { name: "Santa Cruz", count: 5, icon: "SC" },
];

const trustStats = [
  { label: "Courts Listed", value: "500+", icon: LayoutGrid },
  { label: "Monthly Bookings", value: "10K+", icon: Calendar },
  { label: "Average Rating", value: "4.8", icon: Star },
  { label: "Instant Booking", value: "100%", icon: Zap },
];

function filterAndSortVenues(
  venues: Venue[],
  query: string,
  sport: SportFilter,
  sort: SortOption,
  amenities: string[]
): Venue[] {
  const filtered = venues.filter((venue) => {
    const matchesQuery =
      venue.name.toLowerCase().includes(query.toLowerCase()) ||
      venue.city.toLowerCase().includes(query.toLowerCase()) ||
      venue.address.toLowerCase().includes(query.toLowerCase());
    const matchesSport = sport === "All" || venue.sports.includes(sport);
    const matchesAmenities =
      amenities.length === 0 ||
      amenities.every((a) => venue.amenities.includes(a));

    return matchesQuery && matchesSport && matchesAmenities;
  });

  return [...filtered].sort((a, b) => {
    switch (sort) {
      case "price-asc":
        return a.priceFrom - b.priceFrom;
      case "price-desc":
        return b.priceFrom - a.priceFrom;
      case "rating":
        return b.rating - a.rating;
      case "distance":
        return parseFloat(a.distance) - parseFloat(b.distance);
      default:
        return 0;
    }
  });
}

export default function PublicCourtsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSport, setActiveSport] = useState<SportFilter>("All");
  const [activeSort, setActiveSort] = useState<SortOption>("relevance");
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [activeAmenities, setActiveAmenities] = useState<string[]>([]);

  const filteredVenues = filterAndSortVenues(
    mockVenues,
    searchQuery,
    activeSport,
    activeSort,
    activeAmenities
  );

  const featuredVenue = mockVenues.find((v) => v.featured);

  const toggleAmenity = (amenity: string) => {
    setActiveAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="min-h-screen bg-bg-dark"
    >
      <Navbar />

      {/* ── Search Hero ── */}
      <section className="relative overflow-hidden border-b border-white/[0.06] bg-bg-dark px-4 pb-16 pt-20 sm:px-6 sm:pb-20 sm:pt-24 md:px-10 md:pb-24 md:pt-32">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero_2.png"
            alt=""
            fill
            priority
            className="pointer-events-none object-cover opacity-20 transition-transform duration-[20s] hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-bg-dark/40 via-bg-dark/80 to-bg-dark" />
          <div className="absolute inset-0 bg-dot-grid opacity-[0.15]" />
          
          {/* Floating glow effects */}
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.05, 0.08, 0.05],
              x: [0, 50, 0],
              y: [0, -30, 0]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-1/4 -top-1/4 h-[800px] w-[800px] rounded-full bg-primary/20 blur-[160px]" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.03, 0.06, 0.03],
              x: [0, -40, 0],
              y: [0, 60, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute -right-1/4 bottom-0 h-[600px] w-[600px] rounded-full bg-primary/10 blur-[140px]" 
          />
        </div>

        <div className="relative z-10 mx-auto max-w-[1440px]">
          <FadeIn delay={0.1}>
            <div className="mb-6 flex items-center gap-3">
              <div className="flex size-6 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                <span className="size-1.5 animate-pulse rounded-full bg-primary shadow-[0_0_8px_#D9F170]" />
              </div>
              <span className="text-[12px] font-bold uppercase tracking-[0.3em] text-primary/80">
                Premium Court Access
              </span>
            </div>
          </FadeIn>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between lg:gap-12">
            <div className="flex-1">
              <FadeIn delay={0.15}>
                <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                  Find Your Next{" "}
                  <span className="relative inline-block">
                    Match
                    <svg className="absolute -bottom-2 left-0 w-full h-3 text-primary/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                      <path d="M0 5 Q 25 0 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="4" />
                    </svg>
                  </span>{" "}
                  Today.
                </h1>
              </FadeIn>

              <FadeIn delay={0.2}>
                <p className="mb-10 max-w-[600px] text-base leading-relaxed text-text-muted/60 sm:text-lg">
                  Instantly book professional-grade tennis, padel, and pickleball courts. 
                  Experience the game on the best surfaces in your city.
                </p>
              </FadeIn>
            </div>

            <div className="w-full max-w-[580px] lg:mb-12">
              {/* Refined Search Bar */}
              <FadeIn delay={0.25}>
                <div className="group relative flex w-full flex-col gap-3 sm:flex-row">
                  <div className="relative flex-1">
                    <Search
                      className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted/30 transition-all group-focus-within:text-primary group-focus-within:scale-110"
                      size={20}
                    />
                    <input
                      type="text"
                      placeholder="Search by venue, city, or zip..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="h-16 w-full rounded-2xl border border-white/[0.08] bg-white/[0.04] pl-14 pr-12 text-base text-white placeholder:text-text-muted/20 backdrop-blur-md transition-all focus:border-primary/40 focus:bg-white/[0.07] focus:shadow-[0_0_40px_rgba(217,241,112,0.08)] focus:outline-none"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/5 p-1.5 text-text-muted/40 transition-colors hover:bg-white/10 hover:text-white"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                  <button className="flex h-16 items-center justify-center gap-3 rounded-2xl bg-primary px-10 text-base font-bold text-text-dark transition-all hover:scale-[1.02] hover:brightness-110 hover:shadow-[0_10px_40px_rgba(217,241,112,0.3)] active:scale-[0.98]">
                    <Search size={18} strokeWidth={2.5} />
                    Search
                  </button>
                </div>
              </FadeIn>

              {/* Location hint */}
              <FadeIn delay={0.3}>
                <div className="mt-4 flex flex-wrap items-center gap-4">
                  <button className="flex items-center gap-2 text-xs font-semibold text-text-muted/40 transition-all hover:text-primary">
                    <div className="flex size-6 items-center justify-center rounded-lg bg-white/5">
                      <MapPin size={12} />
                    </div>
                    Use my location
                  </button>
                  <span className="h-4 w-px bg-white/10" />
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted/20">Popular:</span>
                    {["San Francisco", "Palo Alto", "San Jose"].slice(0, 3).map(city => (
                      <button 
                        key={city}
                        onClick={() => setSearchQuery(city)}
                        className="text-xs font-medium text-text-muted/40 hover:text-white underline decoration-white/10 underline-offset-4"
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust Stats Bar ── */}
      <section className="relative z-10 -mt-8 mx-auto max-w-[1440px] px-4 sm:px-6 md:px-10">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl sm:grid-cols-4">
          {trustStats.map((stat, i) => (
            <FadeIn key={stat.label} delay={0.05 * i}>
              <div className="group flex flex-col items-center gap-2 py-8 transition-colors hover:bg-white/[0.02] sm:py-10">
                <div className="flex size-10 items-center justify-center rounded-2xl bg-primary/5 text-primary/60 transition-all group-hover:bg-primary/10 group-hover:text-primary group-hover:scale-110">
                  <stat.icon size={20} />
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-black text-white sm:text-3xl">
                    {stat.value}
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-text-muted/30 group-hover:text-text-muted/50 transition-colors">
                    {stat.label}
                  </span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── Featured Venue ── */}
      {featuredVenue && (
        <section className="relative mx-auto max-w-[1440px] px-4 pt-16 sm:px-6 md:px-10">
          <FadeIn>
            <div className="group relative overflow-hidden rounded-2xl border border-white/[0.08]">
              {/* Full-width background image */}
              <div className="relative">
                <div className="aspect-[16/7] sm:aspect-[21/9] lg:aspect-[3/1]">
                  <Image
                    src={featuredVenue.image}
                    alt={featuredVenue.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/60 to-bg-dark/20" />
                </div>

                {/* Badge top-left */}
                <div className="absolute left-5 top-5 z-20 flex items-center gap-2 rounded-lg bg-primary px-3 py-1.5">
                  <Trophy size={12} className="text-text-dark" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-text-dark">Featured</span>
                </div>

                {/* Content overlay at bottom */}
                <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-8 md:p-10">
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                    {/* Left: venue info */}
                    <div className="max-w-[640px]">
                      <h2 className="mb-2 text-2xl font-extrabold text-white sm:text-3xl lg:text-4xl">
                        {featuredVenue.name}
                      </h2>

                      <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-text-muted/50">
                        <div className="flex items-center gap-1.5">
                          <Star size={13} className="fill-primary text-primary" />
                          <span className="font-bold text-white">{featuredVenue.rating}</span>
                          <span className="text-text-muted/35">({featuredVenue.reviewCount})</span>
                        </div>
                        <span className="hidden sm:inline text-text-muted/15">|</span>
                        <span className="flex items-center gap-1.5 text-text-muted/40">
                          <MapPin size={12} />
                          {featuredVenue.address}
                        </span>
                        <span className="hidden sm:inline text-text-muted/15">|</span>
                        <span className="text-text-muted/40">{featuredVenue.courtsCount} courts</span>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {featuredVenue.sports.map((sport) => (
                          <span key={sport} className="rounded-md bg-primary/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
                            {sport}
                          </span>
                        ))}
                        {featuredVenue.amenities.slice(0, 4).map((a) => (
                          <span key={a} className="rounded-md border border-white/[0.08] bg-white/[0.05] px-2.5 py-1 text-[10px] font-medium text-text-muted/50 backdrop-blur-sm">
                            {a}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Right: price + CTA */}
                    <div className="flex items-center gap-5">
                      <div>
                        <span className="block text-[10px] font-bold uppercase tracking-widest text-text-muted/30">From</span>
                        <span className="text-2xl font-extrabold text-white sm:text-3xl">
                          ${featuredVenue.priceFrom}
                          <span className="text-sm font-medium text-text-muted/35">/hr</span>
                        </span>
                      </div>
                      <Link
                        href={`/player/find/${featuredVenue.id}`}
                        className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-text-dark transition-all hover:brightness-110"
                      >
                        Book Now
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </section>
      )}

      {/* ── Toolbar: Sport Chips + View Toggle + Sort ── */}
      <section className="relative overflow-hidden bg-[#0c220b] px-4 pt-20 pb-16 sm:px-6 sm:pb-20 md:px-10 md:pb-24">
        {/* Section background texture */}
        <div className="pointer-events-none absolute inset-0 bg-line-grid" />
        <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-primary/[0.02] blur-[120px]" />

        <div className="relative mx-auto max-w-[1440px]">
        <div className="mb-10 flex flex-col gap-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            {/* Sport filter pills */}
            <div className="flex flex-wrap gap-2.5">
              {sportFilters.map((sport) => (
                <button
                  key={sport.label}
                  onClick={() => setActiveSport(sport.label)}
                  className={`flex items-center gap-2.5 rounded-2xl px-6 py-3.5 text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                    activeSport === sport.label
                      ? "bg-primary text-text-dark shadow-[0_10px_25px_rgba(217,241,112,0.2)] scale-[1.05]"
                      : "border border-white/[0.08] bg-white/[0.03] text-text-muted/40 hover:border-white/[0.15] hover:text-white hover:bg-white/[0.05]"
                  }`}
                >
                  <sport.icon size={14} strokeWidth={activeSport === sport.label ? 3 : 2} />
                  {sport.label}
                </button>
              ))}
            </div>

            {/* Right side controls */}
            <div className="flex flex-wrap items-center gap-4">
              {/* Advanced Filters toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex h-12 items-center gap-2.5 rounded-xl border px-5 text-[11px] font-black uppercase tracking-widest transition-all ${
                  showFilters || activeAmenities.length > 0
                    ? "border-primary/40 bg-primary/10 text-primary shadow-[0_0_20px_rgba(217,241,112,0.05)]"
                    : "border-white/[0.1] bg-white/[0.03] text-text-muted/50 hover:border-white/[0.2] hover:text-white"
                }`}
              >
                <SlidersHorizontal size={14} />
                Filters
                {activeAmenities.length > 0 && (
                  <span className="flex size-5 items-center justify-center rounded-full bg-primary text-[9px] font-black text-text-dark">
                    {activeAmenities.length}
                  </span>
                )}
              </button>

              <div className="h-6 w-px bg-white/10 hidden sm:block" />

              {/* View toggle */}
              <div className="flex h-12 overflow-hidden rounded-xl border border-white/[0.1] bg-white/[0.03]">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`flex items-center gap-2 px-4 text-[10px] font-black uppercase tracking-widest transition-all ${
                    viewMode === "grid"
                      ? "bg-white/10 text-white"
                      : "text-text-muted/40 hover:text-white"
                  }`}
                >
                  <LayoutGrid size={14} />
                  Grid
                </button>
                <button
                  onClick={() => setViewMode("map")}
                  className={`flex items-center gap-2 border-l border-white/[0.1] px-4 text-[10px] font-black uppercase tracking-widest transition-all ${
                    viewMode === "map"
                      ? "bg-white/10 text-white"
                      : "text-text-muted/40 hover:text-white"
                  }`}
                >
                  <Map size={14} />
                  Map
                </button>
              </div>

              {/* Sort dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowSortMenu(!showSortMenu)}
                  className="flex h-12 items-center gap-3 rounded-xl border border-white/[0.1] bg-white/[0.03] px-5 text-[11px] font-black uppercase tracking-widest text-text-muted/50 transition-all hover:border-white/[0.2] hover:text-white"
                >
                  <ArrowUpDown size={14} />
                  <span className="hidden sm:inline">
                    {sortOptions.find((s) => s.value === activeSort)?.label}
                  </span>
                  <span className="sm:hidden">Sort</span>
                  <ChevronDown
                    size={12}
                    className={`transition-transform duration-300 ${showSortMenu ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {showSortMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ type: "spring", damping: 20, stiffness: 300 }}
                      className="absolute right-0 top-full z-40 mt-3 w-64 overflow-hidden rounded-[20px] border border-white/[0.1] bg-bg-dark/95 shadow-2xl backdrop-blur-2xl"
                    >
                      <div className="p-2">
                        {sortOptions.map((option) => (
                          <button
                            key={option.value}
                            onClick={() => {
                              setActiveSort(option.value);
                              setShowSortMenu(false);
                            }}
                            className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-xs font-bold transition-all ${
                              activeSort === option.value
                                ? "bg-primary text-text-dark"
                                : "text-text-muted/60 hover:bg-white/5 hover:text-white"
                            }`}
                          >
                            {option.label}
                            {activeSort === option.value && <Zap size={12} className="fill-text-dark" />}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Amenity Filters Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, y: -20, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -20, height: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <div className="rounded-[28px] border border-white/[0.08] bg-white/[0.02] p-6 sm:p-8">
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex size-8 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <SlidersHorizontal size={14} />
                      </div>
                      <h4 className="text-sm font-black uppercase tracking-widest text-white">
                        Advanced Filters
                      </h4>
                    </div>
                    {activeAmenities.length > 0 && (
                      <button
                        onClick={() => setActiveAmenities([])}
                        className="group flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-primary/60 transition-all hover:text-primary"
                      >
                        <X size={12} />
                        Clear all
                      </button>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {amenityFilters.map((amenity) => (
                      <button
                        key={amenity}
                        onClick={() => toggleAmenity(amenity)}
                        className={`rounded-xl px-5 py-3 text-xs font-bold tracking-tight transition-all duration-300 ${
                          activeAmenities.includes(amenity)
                            ? "bg-primary/20 text-primary border border-primary/30 shadow-[0_0_15px_rgba(217,241,112,0.1)]"
                            : "border border-white/[0.08] bg-white/[0.03] text-text-muted/40 hover:border-white/[0.2] hover:text-white"
                        }`}
                      >
                        {amenity}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Results Info */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-black text-white">Available Courts</h3>
            <span className="rounded-full bg-white/5 px-3 py-1 text-[11px] font-black text-primary border border-white/5">
              {filteredVenues.length} Results
            </span>
          </div>
        </div>

        {/* Venue Grid / Map */}
        <AnimatePresence mode="wait">
          {viewMode === "grid" ? (
            <motion.div
              key="grid-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {filteredVenues.length > 0 ? (
                <motion.div
                  layout
                  className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                >
                  <AnimatePresence mode="popLayout">
                    {filteredVenues.map((venue, i) => (
                      <PublicVenueCard key={venue.id} venue={venue} index={i} />
                    ))}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.01] py-24 text-center"
                >
                  <div className="mb-5 flex size-16 items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.03]">
                    <Search size={24} className="text-text-muted/20" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-white">
                    No matching courts found
                  </h3>
                  <p className="mx-auto max-w-[340px] text-sm text-text-muted/40">
                    Try adjusting your search or filters to find what you&apos;re looking for.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setActiveSport("All");
                      setActiveAmenities([]);
                    }}
                    className="mt-6 rounded-xl border border-white/10 px-5 py-2.5 text-sm font-bold text-white transition-all hover:border-primary/30 hover:text-primary"
                  >
                    Clear All Filters
                  </button>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="map-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.02] py-24 text-center"
            >
              <div className="mb-4 flex size-16 items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.03]">
                <Map size={24} className="text-primary/40" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-white">
                Map View Coming Soon
              </h3>
              <p className="max-w-[320px] text-sm text-text-muted/35">
                We&apos;re working on an interactive map to help you find courts nearby.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="relative overflow-hidden border-t border-white/[0.06] bg-bg-dark px-4 py-20 sm:px-6 sm:py-28 md:px-10 md:py-32">
        {/* Background Decorations */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute inset-0 bg-dot-grid opacity-[0.12]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(217,241,112,0.03),transparent_70%)]" />
          
          {/* Animated Mesh Gradients */}
          <motion.div 
            animate={{ 
              x: [0, 30, 0],
              y: [0, -20, 0],
              opacity: [0.03, 0.06, 0.03]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-[10%] top-[10%] h-[500px] w-[500px] rounded-full bg-primary/20 blur-[120px]" 
          />
          <motion.div 
            animate={{ 
              x: [0, -40, 0],
              y: [0, 30, 0],
              opacity: [0.02, 0.05, 0.02]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -right-[10%] bottom-[10%] h-[600px] w-[600px] rounded-full bg-primary/10 blur-[140px]" 
          />

          {/* Grid lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1440px]">
          <div className="mb-12 flex flex-col items-center text-center sm:mb-20">
            <FadeIn>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
                <Zap size={14} className="text-primary" />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
                  Seamless Booking
                </span>
              </div>
              <h2 className="mb-6 text-3xl font-black text-white sm:text-5xl lg:text-6xl tracking-tight">
                Search. Pick. <span className="text-primary">Play.</span>
              </h2>
              <p className="max-w-[540px] text-base leading-relaxed text-text-muted/40 sm:text-lg">
                Get on the court in under a minute. Our streamlined process 
                removes all the friction from your game day.
              </p>
            </FadeIn>
          </div>

          <div className="grid gap-6 sm:grid-cols-3 lg:gap-8">
            {[
              {
                num: "01",
                title: "Search & Discover",
                desc: "Browse premium courts by sport, location, and amenities. Compare prices and see real photos of every venue.",
                icon: Search,
                detail: "Filter by 12+ premium amenities",
                color: "from-blue-500/20",
              },
              {
                num: "02",
                title: "Pick Your Slot",
                desc: "Choose your exact date, time, and court number. Real-time availability synchronization across all clubs.",
                icon: Clock,
                detail: "Live availability updates",
                color: "from-primary/20",
              },
              {
                num: "03",
                title: "Book & Play",
                desc: "Confirm instantly with secure payment. Receive digital access codes and directions directly on your phone.",
                icon: Target,
                detail: "Instant digital confirmation",
                color: "from-orange-500/20",
              },
            ].map((step, i) => (
              <FadeIn key={step.num} delay={0.15 * i}>
                <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[32px] border border-white/[0.06] bg-white/[0.02] p-8 backdrop-blur-sm transition-all duration-500 hover:border-white/[0.15] hover:bg-white/[0.04] hover:-translate-y-2 sm:p-10">
                  {/* Hover Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${step.color} to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />
                  
                  {/* Large background number */}
                  <span className="pointer-events-none absolute -right-4 -top-6 select-none text-[120px] font-black leading-none text-white/[0.02] transition-colors duration-500 group-hover:text-primary/[0.03] sm:text-[140px]">
                    {step.num}
                  </span>

                  <div className="relative z-10">
                    {/* Icon row */}
                    <div className="mb-8 flex items-center justify-between">
                      <div className="flex size-14 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.04] text-primary transition-all duration-500 group-hover:scale-110 group-hover:bg-primary group-hover:text-text-dark group-hover:shadow-[0_0_30px_rgba(217,241,112,0.3)]">
                        <step.icon size={24} strokeWidth={2.5} />
                      </div>
                      <span className="text-[12px] font-black uppercase tracking-[0.2em] text-text-muted/20 group-hover:text-primary/40 transition-colors">
                        Step {step.num}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="mb-4 text-2xl font-black text-white tracking-tight group-hover:text-primary transition-colors">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="mb-8 text-base leading-relaxed text-text-muted/40 transition-colors group-hover:text-text-muted/60">
                      {step.desc}
                    </p>
                  </div>

                  {/* Bottom detail chip */}
                  <div className="relative z-10 flex items-center gap-3 border-t border-white/[0.05] pt-6 group-hover:border-white/[0.1] transition-colors">
                    <div className="flex size-5 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Zap size={10} />
                    </div>
                    <span className="text-xs font-bold text-text-muted/30 group-hover:text-text-muted/50 transition-colors">
                      {step.detail}
                    </span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sign-up CTA Banner ── */}
      <section className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 sm:py-20 md:px-10 md:py-24">
        <FadeIn>
          <div className="relative overflow-hidden rounded-2xl border border-primary/15">
            {/* Background layers */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/[0.08] via-primary/[0.03] to-transparent" />
            <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-[0.08]" />
            <div className="pointer-events-none absolute -right-16 -top-16 h-[250px] w-[250px] rounded-full bg-primary/[0.1] blur-[80px]" />
            <div className="pointer-events-none absolute -left-24 bottom-0 h-[200px] w-[200px] rounded-full bg-primary/[0.05] blur-[60px]" />

            <div className="relative z-10 grid items-center gap-8 p-8 sm:p-10 md:grid-cols-[1fr_auto] md:p-12 lg:p-14">
              {/* Left content */}
              <div>
                <h2 className="mb-3 text-2xl font-extrabold text-white sm:text-3xl">
                  Ready to play?
                </h2>
                <p className="mb-6 max-w-[480px] text-sm leading-relaxed text-text-muted/45 sm:text-base">
                  Create a free account to book courts instantly, save favorites,
                  and get personalized recommendations.
                </p>

                {/* Trust signals */}
                <div className="flex flex-wrap items-center gap-4 text-[12px] text-text-muted/30">
                  <span className="flex items-center gap-1.5">
                    <Zap size={12} className="text-primary/50" />
                    Instant booking
                  </span>
                  <span className="hidden sm:inline h-3 w-px bg-white/[0.06]" />
                  <span className="flex items-center gap-1.5">
                    <Shield size={12} className="text-primary/50" />
                    Free cancellation
                  </span>
                  <span className="hidden sm:inline h-3 w-px bg-white/[0.06]" />
                  <span className="flex items-center gap-1.5">
                    <Star size={12} className="text-primary/50" />
                    25K+ players
                  </span>
                </div>
              </div>

              {/* Right CTA */}
              <Link
                href="/signup"
                className="group flex items-center gap-3 self-start rounded-xl bg-primary px-7 py-4 font-bold text-text-dark transition-all hover:brightness-110 md:self-center"
              >
                Sign Up Free
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>

      <Footer />
    </motion.main>
  );
}
