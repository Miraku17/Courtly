"use client";

import { useState } from "react";
import { Search, Filter, CalendarDays, SlidersHorizontal, ChevronDown } from "lucide-react";
import { mockVenues } from "@/lib/mock-data";
import { VenueCard } from "@/components/dashboard/venue-card";
import { cn } from "@/lib/utils";

const sportTypes = ["All Sports", "Tennis", "Padel", "Pickleball"];
const distanceOptions = ["Any Distance", "Under 1 mile", "Under 5 miles", "Under 10 miles"];
const priceRanges = ["Any Price", "$10 - $30", "$30 - $60", "$60+"];

export default function FindCourtsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSport, setSelectedSport] = useState("All Sports");

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div>
        <h1 className="text-2xl font-extrabold text-white mb-1">Find Courts</h1>
        <p className="text-text-muted/40 text-sm">Discover and book the best venues near you.</p>
      </div>

      {/* Search & Filters */}
      <div className="space-y-3">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted/40 group-focus-within:text-primary transition-colors" size={18} />
          <input
            type="text"
            placeholder="Search venue, address or city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-text-muted/20 focus:outline-none focus:border-primary/30 transition-all text-sm"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <FilterDropdown label="Sport" value={selectedSport} />
          <FilterDropdown label="Distance" value="Any Distance" />
          <FilterDropdown label="Price" value="Any Price" />
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-text-muted/60 hover:text-white hover:bg-white/[0.05] transition-all font-bold text-[10px] uppercase tracking-wider">
            <CalendarDays size={14} />
            <span>Date</span>
            <ChevronDown size={12} />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-text-muted/60 hover:text-white hover:bg-white/[0.05] transition-all font-bold text-[10px] uppercase tracking-wider ml-auto">
            <SlidersHorizontal size={14} />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-10">
        {mockVenues.map((venue) => (
          <VenueCard key={venue.id} venue={venue} />
        ))}
        {mockVenues.map((venue) => (
          <VenueCard key={`${venue.id}-copy`} venue={{ ...venue, id: `${venue.id}-copy` }} />
        ))}
      </div>
    </div>
  );
}

function FilterDropdown({ label, value }: { label: string; value: string }) {
  return (
    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-text-muted/60 hover:text-white hover:bg-white/[0.05] transition-all font-bold text-[10px] uppercase tracking-wider whitespace-nowrap">
      <span className="text-text-muted/30">{label}:</span>
      <span>{value}</span>
      <ChevronDown size={12} />
    </button>
  );
}
