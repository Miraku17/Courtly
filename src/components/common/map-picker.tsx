"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap, ZoomControl } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Search, X, Loader2, Maximize2, Minimize2 } from "lucide-react";

// Custom marker icon using padel pixel art
const markerIcon = new L.Icon({
  iconUrl: "/padel_pixel.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

interface MapPickerProps {
  lat: number;
  lng: number;
  onLocationChange: (lat: number, lng: number) => void;
}

interface SearchResult {
  display_name: string;
  lat: string;
  lon: string;
}

function LocationMarker({
  position,
  onLocationChange,
}: {
  position: [number, number];
  onLocationChange: (lat: number, lng: number) => void;
}) {
  useMapEvents({
    click(e) {
      onLocationChange(e.latlng.lat, e.latlng.lng);
    },
  });

  return <Marker position={position} icon={markerIcon} />;
}

function FlyToLocation({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo([lat, lng], Math.max(map.getZoom(), 16), { duration: 1.2 });
  }, [lat, lng, map]);
  return null;
}

function MapSearch({
  onSelect,
}: {
  onSelect: (lat: number, lng: number) => void;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close results on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const searchPlaces = useCallback(async (q: string) => {
    if (q.length < 3) {
      setResults([]);
      return;
    }
    setIsSearching(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&limit=5&countrycodes=ph`
      );
      const data: SearchResult[] = await res.json();
      setResults(data);
      setShowResults(true);
    } catch {
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  const handleInputChange = (value: string) => {
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => searchPlaces(value), 400);
  };

  const handleSelect = (result: SearchResult) => {
    onSelect(parseFloat(result.lat), parseFloat(result.lon));
    setQuery(result.display_name.split(",").slice(0, 2).join(","));
    setShowResults(false);
  };

  return (
    <div ref={containerRef} className="absolute top-3 left-3 right-3 z-[1000]">
      <div className="relative">
        <Search
          size={16}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => results.length > 0 && setShowResults(true)}
          placeholder="Search for a place..."
          className="w-full rounded-xl border border-white/15 bg-[#102b0f]/95 backdrop-blur-xl pl-10 pr-10 py-3 text-[0.85rem] text-white placeholder:text-white/30 outline-none focus:border-primary/50 shadow-lg shadow-black/30"
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setResults([]);
              setShowResults(false);
            }}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
          >
            {isSearching ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <X size={16} />
            )}
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {showResults && results.length > 0 && (
        <div className="mt-1.5 rounded-xl border border-white/10 bg-[#102b0f]/95 backdrop-blur-xl shadow-2xl shadow-black/40 overflow-hidden">
          {results.map((result, i) => (
            <button
              key={`${result.lat}-${result.lon}-${i}`}
              onClick={() => handleSelect(result)}
              className="flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-primary/10 border-b border-white/[0.04] last:border-0"
            >
              <Search size={14} className="text-primary/50 mt-0.5 flex-shrink-0" />
              <span className="text-[0.8rem] text-white/70 leading-snug line-clamp-2">
                {result.display_name}
              </span>
            </button>
          ))}
        </div>
      )}

      {showResults && results.length === 0 && query.length >= 3 && !isSearching && (
        <div className="mt-1.5 rounded-xl border border-white/10 bg-[#102b0f]/95 backdrop-blur-xl px-4 py-3">
          <p className="text-[0.8rem] text-white/30">No results found</p>
        </div>
      )}
    </div>
  );
}

function InvalidateMapSize() {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => map.invalidateSize(), 300);
  });
  return null;
}

export function MapPicker({ lat, lng, onLocationChange }: MapPickerProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isFullscreen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsFullscreen(false);
    };
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isFullscreen]);

  if (!isMounted) {
    return (
      <div className="flex h-full w-full items-center justify-center rounded-xl bg-white/[0.03] border border-white/10">
        <p className="text-[0.85rem] text-white/30">Loading map...</p>
      </div>
    );
  }

  return (
    <div
      className={
        isFullscreen
          ? "fixed inset-0 z-[9999] bg-bg-dark"
          : "relative h-full w-full"
      }
    >
      <MapContainer
        center={[lat, lng]}
        zoom={15}
        className="h-full w-full rounded-xl"
        style={{ minHeight: "100%" }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        <ZoomControl position="bottomright" />
        <LocationMarker position={[lat, lng]} onLocationChange={onLocationChange} />
        <FlyToLocation lat={lat} lng={lng} />
        <MapSearch onSelect={onLocationChange} />
        <InvalidateMapSize />
      </MapContainer>

      {/* Fullscreen Toggle */}
      <button
        onClick={() => setIsFullscreen(!isFullscreen)}
        className="absolute bottom-3 left-3 z-[1000] flex items-center gap-2 rounded-xl border border-white/15 bg-[#102b0f]/95 backdrop-blur-xl px-3 py-2.5 text-white/70 hover:text-white transition-colors shadow-lg shadow-black/30"
      >
        {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
        <span className="text-[0.8rem] font-medium">
          {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
        </span>
      </button>
    </div>
  );
}
