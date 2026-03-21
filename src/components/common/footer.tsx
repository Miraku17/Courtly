import Link from "next/link";
import Image from "next/image";
import { TennisBallScene } from "@/components/three/tennis-ball-scene";

const socials = [
  { name: "Facebook", href: "#" },
];

const quickLinks = [
  { name: "Home", href: "#" },
  { name: "About", href: "#" },
  { name: "Courts", href: "#" },
  { name: "Pricing", href: "#" },
];

const contacts = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    text: "Mandaue, Cebu",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    text: "(123) 456-7890",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    text: "Info@Courtify.Com",
  },
];

export const Footer = () => {
  return (
    <footer className="bg-bg-dark text-[#ecf0f1]">
      {/* Decorative top border lines */}
      <div className="relative h-3 w-full bg-[#eaf6df]">
        <div className="absolute inset-x-0 top-0 h-1 bg-bg-dark" />
        <div className="absolute inset-x-0 bottom-0 h-1 bg-bg-dark" />
      </div>

      {/* Main footer content */}
      <div className="mx-auto max-w-[1440px] px-5 pt-12 pb-8 md:px-10 lg:pt-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_1fr]">
          {/* Left column — Brand + Email + Socials */}
          <div>
            {/* Brand */}
            <Link
              href="/"
              className="mb-5 flex items-center gap-3 text-[1.6rem] text-[#ffffff]"

            >
              <Image src="/logo_final.png" alt="Courtify" width={64} height={64} className="size-16 rounded-full object-cover" />
              <span className="font-panchang font-extrabold">COURTIFY</span>
            </Link>

            <p className="mb-8 max-w-[400px] text-[0.95rem] leading-relaxed opacity-70">
              Coaching for every player, at every level, in every stage of the game.
            </p>

            {/* Email input */}
            <form className="relative mb-10 max-w-[420px]">
              <input
                type="email"
                placeholder="Enter your email here"
                required
                className="w-full rounded-full border-2 border-white/20 bg-transparent py-3.5 pr-14 pl-6 text-[0.95rem] text-[#ffffff] placeholder-white/50 outline-none transition-all duration-300 focus:border-primary"
              />
              <button
                type="submit"
                className="absolute top-1/2 right-2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-text-dark transition-all duration-300 hover:bg-primary-hover"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </form>

            {/* Social media */}
            <div>
              <h4 className="mb-4 text-[0.85rem] font-bold uppercase tracking-[0.1em] text-[#ffffff]">
                Social Media
              </h4>
              <div className="grid grid-cols-3 gap-x-8 gap-y-2 sm:max-w-[360px]">
                {socials.map((s) => (
                  <Link
                    key={s.name}
                    href={s.href}
                    className="inline-flex items-center gap-1.5 text-[0.9rem] text-[#ffffff] opacity-70 transition-all duration-300 hover:text-primary hover:opacity-100"
                  >
                    {s.name}
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Middle column — Quick Links + Contact */}
          <div>
            <h4 className="mb-4 text-[0.85rem] font-bold uppercase tracking-[0.1em] text-[#ffffff]">
              Quick Links
            </h4>
            <ul className="mb-10 list-none space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[0.95rem] text-[#ffffff] opacity-70 transition-all duration-300 hover:text-primary hover:opacity-100"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="mb-4 text-[0.85rem] font-bold uppercase tracking-[0.1em] text-[#ffffff]">
              Contact
            </h4>
            <ul className="list-none space-y-3">
              {contacts.map((c, i) => (
                <li key={i} className="flex items-center gap-3 text-[0.9rem] opacity-80">
                  <span className="text-primary">{c.icon}</span>
                  {c.text}
                </li>
              ))}
            </ul>
          </div>

          {/* Right column — 3D Tennis Ball */}
          <div className="hidden lg:block">
            <div className="relative h-[320px] w-full overflow-hidden rounded-2xl bg-[#2c452c]">
              <div className="absolute inset-0">
                <TennisBallScene />
              </div>
              <div className="pointer-events-none absolute inset-x-0 bottom-4 z-10 text-center">
                <p
                  className="text-[1.4rem] italic text-[#ffffff] opacity-90"

                >
                  Serving <span className="text-primary">You</span> Always
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tennis ball divider */}
      <div className="flex justify-center py-4">
        <div className="size-[50px]">
          <svg viewBox="0 0 100 100" fill="currentColor" className="text-primary">
            <circle cx="50" cy="50" r="50" />
            <path d="M 20 20 Q 50 50 20 80" stroke="#102b0f" strokeWidth="6" fill="none" />
            <path d="M 80 20 Q 50 50 80 80" stroke="#102b0f" strokeWidth="6" fill="none" />
          </svg>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-[#eaf6df]">
        <div className="mx-auto max-w-[1440px] px-5 py-4 text-center md:px-10">
          <p className="text-[0.9rem] text-text-dark">
            &copy; {new Date().getFullYear()} Courtify. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
