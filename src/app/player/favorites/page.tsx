"use client";

import { mockVenues } from "@/lib/mock-data";
import { VenueCard } from "@/components/dashboard/venue-card";
import { Heart, Search } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function FavoritesPage() {
  const favoriteVenues = mockVenues.filter((v) => v.isFavorite);

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-1">Favorites</h1>
        <p className="text-text-muted/60 text-sm sm:text-base">
          {favoriteVenues.length > 0
            ? `${favoriteVenues.length} saved venue${favoriteVenues.length > 1 ? "s" : ""} for quick access.`
            : "Your saved courts and venues for quick access."}
        </p>
      </motion.div>

      {favoriteVenues.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {favoriteVenues.map((venue, i) => (
            <motion.div
              key={venue.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.1 + i * 0.07 }}
            >
              <VenueCard venue={venue} />
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-center py-24 bg-white/[0.02] border border-dashed border-white/[0.08] rounded-2xl px-6"
        >
          <div className="inline-flex items-center justify-center size-20 rounded-2xl bg-white/[0.04] text-text-muted/30 mb-5">
            <Heart size={40} strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No favorites yet</h3>
          <p className="text-text-muted/50 text-sm max-w-xs mx-auto mb-8">
            Explore courts and save your go-to spots to find them easily next time.
          </p>
          <Link
            href="/player/find"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-primary text-text-dark font-bold text-sm hover:brightness-110 transition-all"
          >
            <Search size={16} />
            <span>Discover Venues</span>
          </Link>
        </motion.div>
      )}
    </div>
  );
}
