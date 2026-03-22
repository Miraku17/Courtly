import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Courtify — Discover & Book Sports Courts",
    short_name: "Courtify",
    description:
      "Discover, book, and manage sports courts near you. Courtify connects players with premium venues and helps venue owners grow their business.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#d9f170",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
