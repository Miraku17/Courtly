import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Generates a URL-safe slug: "Cebu Hub Kol" + uuid → "cebu-hub-kol-a1b2c3d4..." */
export function venueSlug(name: string, id: string): string {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  const compactId = id.replace(/-/g, "");
  return `${slug}-${compactId}`;
}

/** Extracts UUID from a venue slug by taking the last 32 hex chars and reinserting dashes */
export function extractIdFromSlug(slug: string): string | null {
  const hex = slug.replace(/-/g, "");
  const match = hex.match(/([0-9a-f]{32})$/i);
  if (!match) return null;
  const h = match[1];
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
}
