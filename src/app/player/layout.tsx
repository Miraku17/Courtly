"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  CalendarDays,
  Search,
  Heart,
  CreditCard,
  Settings,
  LogOut,
  HelpCircle,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth-store";
import { motion, AnimatePresence } from "framer-motion";
import { signOut } from "@/lib/api/auth";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/lib/api/profiles";

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

  const { data: profileData } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  const displayName = profileData?.profile?.first_name && profileData?.profile?.last_name
    ? `${profileData.profile.first_name} ${profileData.profile.last_name}`
    : user?.email?.split("@")[0] || "Player";

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await signOut();
    } catch {
      // Clear client-side state even if API fails
    }
    clearUser();
    toast.success("Signed out successfully");
    router.push("/signin");
  };

  return (
    <div className="flex min-h-screen bg-bg-light font-clash">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex w-64 flex-col fixed h-full z-50 bg-bg-dark">
        {/* Branding */}
        <div className="px-6 pt-7 pb-5 border-b border-white/8">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/logo_final.png" alt="Courtify" width={44} height={44} className="size-11 rounded-full object-cover" />
            <span className="font-panchang text-white font-bold text-[1.1rem] tracking-tight">COURTIFY</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 pt-4 space-y-0.5">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "relative flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 active:scale-[0.98] text-[0.85rem]",
                  isActive
                    ? "text-white bg-white/12 font-semibold"
                    : "text-white/50 hover:text-white/80 hover:bg-white/6 font-medium"
                )}
              >
                <item.icon className={cn("size-[17px]", isActive ? "text-white" : "")} strokeWidth={isActive ? 2.2 : 1.8} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="mt-auto px-3 pb-5 pt-3 border-t border-white/8 space-y-0.5">
          <Link
            href="#"
            className="flex items-center gap-3 px-4 py-2.5 text-white/35 hover:text-white/70 transition-all duration-200 text-[0.85rem] rounded-xl hover:bg-white/6"
          >
            <HelpCircle size={17} strokeWidth={1.8} />
            Support
          </Link>
          <button
            onClick={() => setShowSignOutConfirm(true)}
            className="flex w-full items-center gap-3 px-4 py-2.5 text-white/35 hover:text-red-400 transition-all duration-200 text-[0.85rem] rounded-xl hover:bg-red-500/10"
          >
            <LogOut size={17} strokeWidth={1.8} />
            Logout
          </button>
        </div>
      </aside>

      {/* Top Navbar - Desktop */}
      <header className="hidden md:flex fixed top-0 right-0 w-[calc(100%-16rem)] z-30 h-14 bg-bg-light/80 backdrop-blur-xl border-b border-section-dark/8 items-center justify-between px-8">
        <div className="flex-1" />

        {/* Right — Profile */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2.5">
            <div className="text-right">
              <p className="text-[0.75rem] font-bold text-text-dark leading-tight">{displayName}</p>
              <p className="text-[0.6rem] text-text-muted-dark/50">Player</p>
            </div>
            <div className="size-9 rounded-xl border border-section-dark/10 bg-white/60 flex items-center justify-center overflow-hidden">
              {profileData?.profile?.avatar_url ? (
                <img src={profileData.profile.avatar_url} alt="Avatar" className="size-full object-cover" />
              ) : (
                <User size={16} className="text-text-muted-dark/50" />
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 pb-24 md:pb-0 min-h-screen bg-bg-light md:pt-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {children}
        </div>
      </main>

      {/* Bottom Tab Bar - Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-section-dark">
        <div className="flex items-center justify-around px-2 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))]">
          {navItems.filter((item) => item.name !== "Settings").map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "relative flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all duration-200",
                  isActive ? "text-white" : "text-white/35"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="mobile-tab-player"
                    className="absolute -top-2 w-6 h-0.5 rounded-full bg-white"
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
            className="fixed inset-0 z-100 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4"
            onClick={() => !isSigningOut && setShowSignOutConfirm(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="relative w-full max-w-[360px] overflow-hidden rounded-2xl border border-section-dark/10 bg-white shadow-2xl shadow-black/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative p-6 pt-8 flex flex-col items-center text-center">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.1 }}
                  className="flex size-14 items-center justify-center rounded-2xl bg-red-50 border border-red-100 mb-5"
                >
                  <LogOut size={22} className="text-red-500" />
                </motion.div>
                <h3 className="text-[1.1rem] font-bold text-text-dark mb-1.5">Sign out?</h3>
                <p className="text-[0.85rem] text-text-muted-dark/60 leading-relaxed max-w-[260px]">
                  You&apos;ll need to sign in again to access your bookings and account.
                </p>
              </div>
              <div className="p-4 pt-2 flex gap-3">
                <button
                  onClick={() => setShowSignOutConfirm(false)}
                  disabled={isSigningOut}
                  className="flex-1 rounded-xl border border-section-dark/10 bg-section-dark/5 py-2.5 text-[0.85rem] font-semibold text-text-dark transition-all hover:bg-section-dark/10 active:scale-[0.98] disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSignOut}
                  disabled={isSigningOut}
                  className="flex-1 rounded-xl bg-red-500 py-2.5 text-[0.85rem] font-semibold text-white transition-all hover:bg-red-600 active:scale-[0.98] disabled:opacity-60"
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
