"use client";

import Image from "next/image";
import { FadeIn } from "@/components/common/fade-in";
import { motion } from "framer-motion";
import { ReactNode } from "react";

const InstantBookingIcon = () => (
  <svg viewBox="0 0 120 120" fill="none" className="size-full">
    {/* Lightning bolt in a circle — speed & instant action */}
    <circle cx="60" cy="60" r="56" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
    <circle cx="60" cy="60" r="46" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
    {/* Clock face */}
    <circle cx="60" cy="60" r="36" fill="rgba(255,255,255,0.08)" />
    <line x1="60" y1="60" x2="60" y2="34" stroke="rgba(255,255,255,0.5)" strokeWidth="3" strokeLinecap="round" />
    <line x1="60" y1="60" x2="78" y2="54" stroke="rgba(255,255,255,0.3)" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="60" cy="60" r="3" fill="white" />
    {/* Lightning bolt overlay */}
    <path d="M65 28L50 62H60L55 92L80 52H66L75 28Z" fill="#d9f170" fillOpacity="0.9" />
    {/* Tick marks */}
    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => {
      const rad = (angle * Math.PI) / 180;
      const x1 = 60 + 36 * Math.cos(rad);
      const y1 = 60 + 36 * Math.sin(rad);
      const x2 = 60 + 32 * Math.cos(rad);
      const y2 = 60 + 32 * Math.sin(rad);
      return <line key={angle} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round" />;
    })}
  </svg>
);

const RealTimeIcon = () => (
  <svg viewBox="0 0 120 120" fill="none" className="size-full">
    {/* Pulsing signal / live indicator */}
    <circle cx="60" cy="60" r="56" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
    {/* Calendar grid */}
    <rect x="28" y="32" width="64" height="56" rx="8" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
    <line x1="28" y1="48" x2="92" y2="48" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
    {/* Calendar header tabs */}
    <rect x="42" y="26" width="4" height="12" rx="2" fill="rgba(255,255,255,0.4)" />
    <rect x="74" y="26" width="4" height="12" rx="2" fill="rgba(255,255,255,0.4)" />
    {/* Grid cells */}
    {[0, 1, 2, 3].map((row) =>
      [0, 1, 2, 3].map((col) => (
        <rect
          key={`${row}-${col}`}
          x={35 + col * 15}
          y={54 + row * 10}
          width="10"
          height="6"
          rx="1.5"
          fill={
            (row === 1 && col === 1) || (row === 2 && col === 2)
              ? "#d9f170"
              : "rgba(255,255,255,0.12)"
          }
        />
      ))
    )}
    {/* Live pulse dot */}
    <circle cx="88" cy="36" r="8" fill="#d9f170" fillOpacity="0.2" />
    <circle cx="88" cy="36" r="5" fill="#d9f170" fillOpacity="0.4" />
    <circle cx="88" cy="36" r="3" fill="#d9f170" />
  </svg>
);

const DiscoverCourtsIcon = () => (
  <svg viewBox="0 0 120 120" fill="none" className="size-full">
    {/* Map pin with court inside */}
    <circle cx="60" cy="60" r="56" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
    {/* Pin shape */}
    <path
      d="M60 100C60 100 88 68 88 48C88 32.536 75.464 20 60 20C44.536 20 32 32.536 32 48C32 68 60 100 60 100Z"
      fill="rgba(255,255,255,0.08)"
      stroke="rgba(255,255,255,0.25)"
      strokeWidth="1.5"
    />
    {/* Court inside the pin */}
    <rect x="46" y="36" width="28" height="20" rx="2" fill="rgba(217,241,112,0.15)" stroke="#d9f170" strokeWidth="1.5" />
    <line x1="60" y1="36" x2="60" y2="56" stroke="#d9f170" strokeWidth="1" strokeOpacity="0.6" />
    <line x1="46" y1="46" x2="74" y2="46" stroke="#d9f170" strokeWidth="1" strokeOpacity="0.6" />
    {/* Center circle of court */}
    <circle cx="60" cy="46" r="4" stroke="#d9f170" strokeWidth="1" fill="none" strokeOpacity="0.8" />
    {/* GPS rings */}
    <circle cx="60" cy="46" r="28" stroke="#d9f170" strokeWidth="0.8" strokeDasharray="4 4" strokeOpacity="0.25" />
    <circle cx="60" cy="46" r="36" stroke="#d9f170" strokeWidth="0.6" strokeDasharray="3 5" strokeOpacity="0.15" />
  </svg>
);

const featureIcons: ReactNode[] = [
  <InstantBookingIcon key="instant" />,
  <RealTimeIcon key="realtime" />,
  <DiscoverCourtsIcon key="discover" />,
];

export const WhyChoose = () => {
  const features = [
    {
      id: "01",
      title: "Instant Booking",
      description:
        "Reserve sports courts in seconds with a fast and simple booking process designed for speed.",
      color: "#74a069",
    },
    {
      id: "02",
      title: "Real-Time Availability",
      description:
        "View live schedules and only book time slots that are available in real-time.",
      color: "#48723f",
    },
    {
      id: "03",
      title: "Discover Courts Nearby",
      description:
        "Easily find premium sports venues close to your location with GPS integration.",
      color: "#2c452c",
    },
  ];

  return (
    <section
      id="why-choose"
      className="relative overflow-hidden bg-bg-light pt-[100px] pr-0 pb-[60px] pl-10 md:pt-[120px] md:pl-[60px] lg:pt-[140px] lg:pb-[100px] lg:pl-20"
    >
      {/* Vertical Bar */}
      <div className="absolute top-0 left-[10px] z-[1] h-full w-[10px] bg-bg-dark opacity-80 md:left-5 md:w-5 lg:left-[25px] lg:w-[25px]" />
      {/* Horizontal Bar */}
      <div className="absolute top-[10px] left-0 z-[1] h-[10px] w-full bg-bg-dark opacity-80 md:top-5 md:h-5 lg:top-[25px] lg:h-[25px]" />

      {/* Animated Pixel Tennis Ball — top right */}
      <motion.div
        className="absolute top-[15px] right-[25px] z-[2]"
        animate={{ y: [0, -15, 0], rotate: [0, 360] }}
        transition={{
          y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 8, repeat: Infinity, ease: "linear" },
        }}
      >
        <Image
          src="/tennis_pixel.png"
          alt=""
          width={90}
          height={90}
          style={{ imageRendering: "pixelated" }}
          className="drop-shadow-[0_0_10px_rgba(217,241,112,0.4)]"
        />
      </motion.div>

      {/* Animated Pixel Tennis Ball — bottom left */}
      <motion.div
        className="absolute bottom-[40px] left-[50px] z-[2] hidden md:block"
        animate={{ y: [0, -10, 0], rotate: [0, -360] }}
        transition={{
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 12, repeat: Infinity, ease: "linear" },
        }}
      >
        <Image
          src="/tennis_pixel.png"
          alt=""
          width={70}
          height={70}
          style={{ imageRendering: "pixelated" }}
          className="opacity-50 drop-shadow-[0_0_8px_rgba(217,241,112,0.3)]"
        />
      </motion.div>

      <div className="mx-auto max-w-[1440px]">
        <FadeIn className="mb-20 pr-5 text-center md:pr-20">
          <h2 className="text-[2.5rem] uppercase text-text-dark md:text-[3.5rem] lg:text-[4.5rem] lg:leading-none">
            Why Choose Courtly
          </h2>
        </FadeIn>

        <div className="mx-auto flex max-w-[1000px] flex-col pr-5 md:pr-20">
          {features.map((feature, index) => (
            <FadeIn key={index} delay={index * 0.15}>
            <div
              className="group mb-5 flex cursor-pointer flex-col items-center gap-5 rounded-[20px] bg-bg-dark/[0.06] p-[30px] text-center transition-all duration-300 hover:bg-bg-dark/[0.1] md:flex-row md:justify-between md:gap-[50px] md:p-10 md:px-[50px] md:text-left"
            >
              <div className="flex flex-1 flex-col items-center gap-4 md:flex-row md:gap-[50px]">
                <div className="min-w-[60px] text-[2.5rem] text-text-dark">
                  {feature.id}
                </div>

                <div className="hidden size-[180px] shrink-0 lg:block">
                  <div
                    className="relative flex size-full items-center justify-center overflow-hidden rounded-3xl p-5 shadow-[0_10px_30px_rgba(0,0,0,0.3)] transition-transform duration-300 group-hover:scale-105"
                    style={{ backgroundColor: feature.color }}
                  >
                    {featureIcons[index]}
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="mb-[15px] text-[1.8rem] uppercase text-text-dark">
                    {feature.title}
                  </h3>
                  <p className="max-w-[450px] text-[1.1rem] leading-[1.4] text-text-muted-dark">
                    {feature.description}
                  </p>
                </div>
              </div>

              <div className="md:ml-[30px]">
                <div
                  className={`flex size-[60px] items-center justify-center rounded-full text-text-dark transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 ${
                    index === 0 ? "bg-primary" : "bg-white"
                  }`}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </div>
              </div>
            </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
