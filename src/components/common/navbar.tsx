"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

const navLinks = [
  { name: "About", href: "/about" },
  { name: "Find Courts", href: "/courts" },
  { name: "List Your Venue", href: "/list-venue" },
  { name: "Sign In", href: "/signin" },
];

const dashboardLinks = [
  { name: "My Bookings", href: "/dashboard/bookings" },
  { name: "My Venues", href: "/dashboard/venues" },
  { name: "Settings", href: "/dashboard/settings" },
  { name: "Sign Out", href: "/signout" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <nav className="relative z-50 bg-bg-dark px-4 py-5 sm:px-6 md:px-10 md:py-[30px]">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between">
        {/* Desktop nav links */}
        <div className="hidden flex-1 gap-10 lg:flex">
          <Link
            href="/about"
            className="flex flex-col text-[0.85rem] font-semibold uppercase leading-[1.3] tracking-[0.05em] text-[#ffffff] transition-all duration-300 hover:text-primary"
          >
            <span>About</span>
            <span>Us</span>
          </Link>
          <Link
            href="/courts"
            className="flex flex-col text-[0.85rem] font-semibold uppercase leading-[1.3] tracking-[0.05em] text-[#ffffff] transition-all duration-300 hover:text-primary"
          >
            <span>Find</span>
            <span>Courts</span>
          </Link>
          <Link
            href="/list-venue"
            className="flex flex-col text-[0.85rem] font-semibold uppercase leading-[1.3] tracking-[0.05em] text-[#ffffff] transition-all duration-300 hover:text-primary"
          >
            <span>List Your</span>
            <span>Venue</span>
          </Link>
        </div>

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-[1.4rem] uppercase text-[#ffffff] sm:gap-3 sm:text-[1.8rem] lg:flex-1 lg:justify-center"

        >
          <Image src="/logo_final.png" alt="Courtify" width={56} height={56} className="size-12 rounded-full object-cover sm:size-14" />
          <span className="font-panchang font-extrabold">COURTIFY</span>
        </Link>

        {/* Right side */}
        <div className="flex items-center justify-end gap-4 sm:gap-[30px] lg:flex-1">
          <Link
            href="/signin"
            className="hidden text-[0.85rem] font-semibold uppercase tracking-[0.05em] text-[#ffffff] underline underline-offset-4 transition-all duration-300 hover:text-primary lg:block"
          >
            SIGN IN
          </Link>

          {/* Menu Button — mobile only */}
          <div ref={dropdownRef} className="relative lg:hidden">
            <button
              onClick={() => setOpen(!open)}
              className="flex size-11 items-center justify-center rounded-full bg-primary transition-all duration-300 hover:scale-105 hover:bg-primary-hover sm:size-12"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#1a1a1a"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transition-transform duration-300 sm:size-6 ${open ? "rotate-90" : ""}`}
              >
                {open ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>

          </div>
        </div>
      </div>

      {/* Mobile fullscreen menu */}
      {open && (
        <div className="fixed inset-0 top-[68px] z-40 flex flex-col bg-bg-dark px-6 pt-8 pb-10 sm:top-[76px] md:top-[90px] lg:hidden">
          <div className="flex flex-col gap-1">
            <p className="mb-2 px-4 text-[0.75rem] font-bold uppercase tracking-[0.15em] text-text-muted/50">
              Navigation
            </p>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3.5 text-[1.05rem] font-semibold text-[#ffffff] transition-all duration-200 active:bg-white/[0.08] hover:bg-white/[0.06] hover:text-primary"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="my-4 h-px bg-white/10" />

          <div className="flex flex-col gap-1">
            <p className="mb-2 px-4 text-[0.75rem] font-bold uppercase tracking-[0.15em] text-text-muted/50">
              Dashboard
            </p>
            {dashboardLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3.5 text-[1.05rem] font-semibold text-[#ffffff] transition-all duration-200 active:bg-white/[0.08] hover:bg-white/[0.06] hover:text-primary"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
