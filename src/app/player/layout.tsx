"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarDays,
  Search,
  Heart,
  CreditCard,
  Settings,
  LogOut,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth-store";
import { motion } from "framer-motion";

const navItems = [
  { name: "My Bookings", label: "Bookings", icon: CalendarDays, href: "/player/bookings" },
  { name: "Find Courts", label: "Find", icon: Search, href: "/player/find" },
  { name: "Favorites", label: "Favs", icon: Heart, href: "/player/favorites" },
  { name: "Payments", label: "Pay", icon: CreditCard, href: "/player/payments" },
  { name: "Settings", label: "Settings", icon: Settings, href: "/player/settings" },
];

export default function PlayerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user } = useAuthStore();

  return (
    <div className="flex min-h-screen bg-bg-dark text-text-main font-mona">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex w-64 flex-col border-r border-white/[0.06] bg-bg-dark/80 backdrop-blur-2xl fixed h-full z-50">
        <div className="p-7 pb-6">
          <Link href="/" className="flex items-center gap-2 text-[1.4rem] uppercase text-white">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              width="22"
              height="22"
              className="text-primary"
            >
              <path d="M12 2C9.5 2 8 4 8 6.5C8 9 10.5 11 12 11C13.5 11 16 9 16 6.5C16 4 14.5 2 12 2ZM12 22C14.5 22 16 20 16 17.5C16 15 13.5 13 12 13C10.5 13 8 15 8 17.5C8 20 9.5 22 12 22ZM2 12C2 14.5 4 16 6.5 16C9 16 11 13.5 11 12C11 10.5 9 8 6.5 8C4 8 2 9.5 2 12ZM22 12C22 9.5 20 8 17.5 8C15 8 13 10.5 13 12C13 13.5 15 16 17.5 16C20 16 22 14.5 22 12Z" />
            </svg>
            COURTLY
          </Link>
        </div>

        {/* User Profile */}
        <div className="mx-4 mb-6 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-primary/15 border border-primary/20 flex items-center justify-center">
              <User size={18} className="text-primary" />
            </div>
            <div className="min-w-0">
              <div className="text-sm font-bold text-white truncate">
                {user?.email?.split("@")[0] || "Player"}
              </div>
              <div className="text-[11px] text-text-muted/50 font-medium">Player Account</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group text-[0.9rem]",
                  isActive
                    ? "bg-primary text-text-dark font-bold"
                    : "text-text-muted/70 hover:bg-white/[0.04] hover:text-white font-medium"
                )}
              >
                <item.icon className={cn("size-[18px]", isActive ? "text-text-dark" : "group-hover:text-primary transition-colors")} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 mt-auto border-t border-white/[0.06]">
          <button className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-text-muted/60 hover:bg-red-500/[0.06] hover:text-red-400 transition-all duration-200 text-[0.9rem] font-medium">
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 pb-24 md:pb-0 min-h-screen bg-bg-dashboard">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {children}
        </div>
      </main>

      {/* Bottom Tab Bar - Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-bg-dark/90 backdrop-blur-2xl border-t border-white/[0.06]">
        <div className="flex items-center justify-around px-2 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))]">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "relative flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all duration-200",
                  isActive ? "text-primary" : "text-text-muted/50"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="mobile-tab"
                    className="absolute -top-2 w-6 h-0.5 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
