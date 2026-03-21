"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, MapPin, Heart } from "lucide-react";
import { Venue } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

interface VenueCardProps {
  venue: Venue;
}

export function VenueCard({ venue }: VenueCardProps) {
  return (
    <div className="group bg-surface border border-border-light rounded-2xl overflow-hidden hover:border-primary/30 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full relative">
      <Link href={`/player/find/${venue.id}`} className="absolute inset-0 z-10" />
      
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={venue.image}
          alt={venue.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/40 via-transparent to-transparent" />
        
        <button className="absolute top-3 right-3 size-8 rounded-full bg-text-muted-dark/40 backdrop-blur-md border border-border-light flex items-center justify-center text-white hover:text-primary transition-colors z-20">
          <Heart size={16} className={cn(venue.isFavorite && "fill-primary text-primary")} />
        </button>

        <div className="absolute bottom-3 left-3 flex gap-1.5 z-20">
          {venue.sports.map((sport) => (
            <span key={sport} className="px-2 py-0.5 rounded bg-primary text-text-dark text-[8px] font-bold uppercase tracking-widest">
              {sport}
            </span>
          ))}
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-1.5">
          <h3 className="text-base font-bold text-text-dark group-hover:text-primary transition-colors leading-tight truncate">{venue.name}</h3>
          <div className="flex items-center gap-1 text-primary flex-shrink-0">
            <Star size={12} className="fill-primary" />
            <span className="text-xs font-bold">{venue.rating}</span>
          </div>
        </div>

        <div className="flex flex-col gap-1 mb-4">
          <div className="flex items-center gap-1.5 text-muted-light text-[10px] font-medium">
            <MapPin size={10} className="text-primary/60" />
            <span className="line-clamp-1">{venue.address}</span>
          </div>
          <div className="text-[9px] text-muted-light font-bold uppercase tracking-widest">{venue.distance}</div>
        </div>

        <div className="mt-auto flex items-center justify-between pt-3 border-t border-border-light">
          <div>
            <span className="text-muted-light text-[9px] block font-bold uppercase tracking-widest mb-0.5">Starting from</span>
            <span className="text-base font-bold text-text-dark">₱{venue.priceFrom}<span className="text-[10px] font-medium text-muted-light tracking-normal uppercase">/hr</span></span>
          </div>
          <div className="px-4 py-1.5 rounded-lg bg-bg-light border border-border-light text-text-dark text-[10px] font-bold uppercase tracking-wider group-hover:bg-primary group-hover:text-text-dark group-hover:border-primary transition-all duration-300 z-20">
            Book
          </div>
        </div>
      </div>
    </div>
  );
}
