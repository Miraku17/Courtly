"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";

const menuLinks = [
  { name: "My Bookings", href: "/dashboard/bookings" },
  { name: "My Venues", href: "/dashboard/venues" },
  { name: "Settings", href: "/dashboard/settings" },
  { name: "Sign Out", href: "/signout" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="relative z-50 bg-bg-dark px-10 py-[30px]">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between">
        <div className="hidden flex-1 gap-10 lg:flex">
          <Link
            href="#coach"
            className="flex flex-col text-[0.85rem] font-semibold uppercase leading-[1.3] tracking-[0.05em] text-[#ffffff] transition-all duration-300 hover:text-primary"
          >
            <span>Find</span>
            <span>Courts</span>
          </Link>
          <Link
            href="#partner"
            className="flex flex-col text-[0.85rem] font-semibold uppercase leading-[1.3] tracking-[0.05em] text-[#ffffff] transition-all duration-300 hover:text-primary"
          >
            <span>List Your</span>
            <span>Venue</span>
          </Link>
        </div>

        <Link
          href="/"
          className="flex flex-1 items-center gap-3 text-[1.8rem] uppercase text-[#ffffff] lg:justify-center"
          style={{ fontFamily: "var(--font-heading), sans-serif" }}
        >
          <span className="flex items-center">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              width="24"
              height="24"
              className="text-primary"
            >
              <path d="M12 2C9.5 2 8 4 8 6.5C8 9 10.5 11 12 11C13.5 11 16 9 16 6.5C16 4 14.5 2 12 2ZM12 22C14.5 22 16 20 16 17.5C16 15 13.5 13 12 13C10.5 13 8 15 8 17.5C8 20 9.5 22 12 22ZM2 12C2 14.5 4 16 6.5 16C9 16 11 13.5 11 12C11 10.5 9 8 6.5 8C4 8 2 9.5 2 12ZM22 12C22 9.5 20 8 17.5 8C15 8 13 10.5 13 12C13 13.5 15 16 17.5 16C20 16 22 14.5 22 12Z" />
            </svg>
          </span>
          COURTLY
        </Link>

        <div className="flex flex-1 items-center justify-end gap-[30px]">
          <Link
            href="#talk"
            className="hidden text-[0.85rem] font-semibold uppercase tracking-[0.05em] text-[#ffffff] underline underline-offset-4 transition-all duration-300 hover:text-primary lg:block"
          >
            LET&apos;S TALK
          </Link>

          {/* Menu Button + Dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex size-12 items-center justify-center rounded-full bg-primary transition-all duration-300 hover:scale-105 hover:bg-primary-hover"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#1a1a1a"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transition-transform duration-300 ${open ? "rotate-90" : ""}`}
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

            {open && (
              <div className="absolute right-0 top-full mt-3 min-w-[200px] overflow-hidden rounded-xl border border-white/10 bg-bg-dark shadow-[0_16px_40px_rgba(0,0,0,0.4)]">
                {menuLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center px-5 py-3 text-[0.9rem] text-[#ffffff] transition-all duration-200 hover:bg-white/[0.08] hover:text-primary"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
