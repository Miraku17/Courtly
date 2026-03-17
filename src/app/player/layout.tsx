"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
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
import { motion, AnimatePresence } from "framer-motion";
import api from "@/lib/api";
import { toast } from "sonner";

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
  const router = useRouter();
  const { user, clearUser } = useAuthStore();
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await api.post("/auth/signout");
    } catch {
      // Even if the API call fails, we still clear client-side state
      // The middleware will redirect on next protected route visit anyway
    }
    clearUser();
    toast.success("Signed out successfully");
    router.push("/signin");
  };

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
          <button
            onClick={() => setShowSignOutConfirm(true)}
            className="group flex w-full items-center gap-3 px-4 py-3 rounded-xl text-text-muted/60 hover:bg-red-500/[0.08] hover:text-red-400 transition-all duration-200 text-[0.9rem] font-medium"
          >
            <div className="flex size-8 items-center justify-center rounded-lg bg-red-500/[0.06] group-hover:bg-red-500/15 transition-colors">
              <LogOut size={15} className="group-hover:text-red-400 transition-colors" />
            </div>
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

      {/* Sign Out Confirmation Modal */}
      <AnimatePresence>
        {showSignOutConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-100 flex items-center justify-center bg-black/70 backdrop-blur-md p-4"
            onClick={() => !isSigningOut && setShowSignOutConfirm(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="relative w-full max-w-[360px] overflow-hidden rounded-2xl border border-white/[0.08] bg-bg-dark shadow-2xl shadow-black/40"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Red glow accent */}
              <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-40 bg-red-500/10 rounded-full blur-[80px] pointer-events-none" />

              <div className="relative p-6 pt-8 flex flex-col items-center text-center">
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.1 }}
                  className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-b from-red-500/20 to-red-500/5 border border-red-500/15 mb-5"
                >
                  <LogOut size={22} className="text-red-400" />
                </motion.div>

                <h3 className="text-[1.1rem] font-bold text-white mb-1.5">
                  Sign out of Courtly?
                </h3>
                <p className="text-[0.85rem] text-text-muted/50 leading-relaxed max-w-[260px]">
                  You&apos;ll need to sign in again to access your bookings and account.
                </p>
              </div>

              <div className="p-4 pt-2 flex gap-3">
                <button
                  onClick={() => setShowSignOutConfirm(false)}
                  disabled={isSigningOut}
                  className="flex-1 rounded-xl border border-white/[0.08] bg-white/[0.04] py-2.5 text-[0.85rem] font-semibold text-white transition-all hover:bg-white/[0.08] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSignOut}
                  disabled={isSigningOut}
                  className="flex-1 rounded-xl bg-red-500 py-2.5 text-[0.85rem] font-semibold text-white transition-all hover:bg-red-600 active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none shadow-lg shadow-red-500/20"
                >
                  {isSigningOut ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="size-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Signing out
                    </span>
                  ) : (
                    "Sign Out"
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
