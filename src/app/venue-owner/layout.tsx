"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  CalendarDays,
  MapPin,
  Settings,
  LogOut,
  Plus,
  HelpCircle,
  DollarSign,
  Users,
  Bell,
  MessageSquare,
  Search,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth-store";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/lib/api/profiles";
import { motion, AnimatePresence } from "framer-motion";
import { signOut } from "@/lib/api/auth";
import { toast } from "sonner";

const navItems = [
  { name: "Dashboard", label: "Home", icon: LayoutDashboard, href: "/venue-owner" },
  { name: "Bookings", label: "Bookings", icon: CalendarDays, href: "/venue-owner/bookings" },
  { name: "Inventory", label: "Venues", icon: MapPin, href: "/venue-owner/venues" },
  { name: "Revenue", label: "Revenue", icon: DollarSign, href: "/venue-owner/analytics" },
  { name: "Staff", label: "Staff", icon: Users, href: "/venue-owner/staff" },
  { name: "Settings", label: "Settings", icon: Settings, href: "/venue-owner/settings" },
];

export default function VenueOwnerLayout({
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
    : user?.email?.split("@")[0] || "Owner";

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
    <div className="flex min-h-screen bg-bg-dark text-text-main font-mona">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex w-64 flex-col fixed h-full z-50 bg-[#0c1e0b]/60 backdrop-blur-xl border-r border-white/[0.04] shadow-[20px_0px_40px_rgba(0,0,0,0.4)]">
        {/* Branding */}
        <div className="px-7 pt-8 pb-6">
          <Link href="/" className="block">
            <h1 className="text-primary font-black tracking-tight text-xl">Courtly</h1>
            <p className="text-[0.55rem] uppercase tracking-[0.2em] text-text-muted/30 mt-0.5">
              Venue Management
            </p>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/venue-owner" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "relative flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 active:scale-[0.97] text-[0.88rem]",
                  isActive
                    ? "text-primary bg-primary/[0.08] shadow-[inset_0_0_12px_rgba(217,241,112,0.06)] font-semibold"
                    : "text-text-muted/50 hover:text-white/80 hover:bg-white/[0.03] font-medium"
                )}
              >
                <item.icon className={cn("size-[18px]", isActive ? "text-primary" : "")} strokeWidth={isActive ? 2.2 : 1.8} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="mt-auto px-4 pb-6 pt-4 border-t border-white/[0.04] space-y-2">
          {/* Add Venue CTA */}
          <Link
            href="/venue-owner/venues/new"
            className="flex items-center justify-center gap-2 w-full rounded-xl bg-gradient-to-br from-primary to-primary/60 py-3 mb-3 text-[0.82rem] font-bold text-text-dark transition-all active:scale-[0.97] hover:brightness-110 shadow-lg shadow-primary/10"
          >
            <Plus size={15} strokeWidth={3} />
            New Venue
          </Link>

          {/* Support */}
          <Link
            href="#"
            className="flex items-center gap-3 px-4 py-2.5 text-text-muted/40 hover:text-white/70 transition-all duration-300 text-[0.85rem]"
          >
            <HelpCircle size={18} strokeWidth={1.8} />
            Support
          </Link>

          {/* Logout */}
          <button
            onClick={() => setShowSignOutConfirm(true)}
            className="flex w-full items-center gap-3 px-4 py-2.5 text-text-muted/40 hover:text-white/70 transition-all duration-300 text-[0.85rem]"
          >
            <LogOut size={18} strokeWidth={1.8} />
            Logout
          </button>
        </div>
      </aside>

      {/* Top Navbar - Desktop */}
      <header className="hidden md:flex fixed top-0 right-0 w-[calc(100%-16rem)] z-30 h-16 bg-bg-dark/60 backdrop-blur-xl border-b border-white/[0.04] items-center justify-between px-8">
        {/* Left — Search */}
        <div className="flex items-center gap-6 flex-1">
          <span className="text-white/80 text-[0.85rem] font-bold tracking-wide">Management Console</span>
          <div className="relative max-w-md w-full">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted/30" />
            <input
              type="text"
              placeholder="Search venues, bookings, or reports..."
              className="w-full bg-white/[0.03] border border-white/[0.04] rounded-lg pl-10 pr-4 py-2 text-[0.8rem] text-white placeholder:text-text-muted/25 outline-none focus:border-primary/30 focus:ring-1 focus:ring-primary/20 transition-all"
            />
          </div>
        </div>

        {/* Right — Actions + Profile */}
        <div className="flex items-center gap-3">
          <button className="relative p-2.5 text-text-muted/40 hover:text-primary transition-colors duration-200">
            <Bell size={19} strokeWidth={1.8} />
            <span className="absolute top-2 right-2 size-2 bg-primary rounded-full" />
          </button>
          <button className="p-2.5 text-text-muted/40 hover:text-primary transition-colors duration-200">
            <MessageSquare size={19} strokeWidth={1.8} />
          </button>

          <div className="h-8 w-px bg-white/[0.06] mx-2" />

          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-[0.75rem] font-bold text-white leading-tight">{displayName}</p>
              <p className="text-[0.6rem] text-text-muted/35">Venue Owner</p>
            </div>
            <div className="size-10 rounded-full border border-primary/15 bg-primary/10 flex items-center justify-center overflow-hidden">
              {profileData?.profile?.avatar_url ? (
                <img src={profileData.profile.avatar_url} alt="Avatar" className="size-full object-cover" />
              ) : (
                <User size={18} className="text-primary/60" />
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 pb-24 md:pb-0 min-h-screen bg-bg-dashboard md:pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {children}
        </div>
      </main>

      {/* Bottom Tab Bar - Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-bg-dark/90 backdrop-blur-2xl border-t border-white/[0.06]">
        <div className="flex items-center justify-around px-2 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))]">
          {navItems.filter((_, i) => i !== 4).map((item) => {
            const isActive = pathname === item.href || (item.href !== "/venue-owner" && pathname.startsWith(item.href));
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
                    layoutId="mobile-tab-owner"
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
              <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-40 bg-red-500/10 rounded-full blur-[80px] pointer-events-none" />
              <div className="relative p-6 pt-8 flex flex-col items-center text-center">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.1 }}
                  className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-b from-red-500/20 to-red-500/5 border border-red-500/15 mb-5"
                >
                  <LogOut size={22} className="text-red-400" />
                </motion.div>
                <h3 className="text-[1.1rem] font-bold text-white mb-1.5">Sign out of Courtly?</h3>
                <p className="text-[0.85rem] text-text-muted/50 leading-relaxed max-w-[260px]">
                  You&apos;ll need to sign in again to manage your venues.
                </p>
              </div>
              <div className="p-4 pt-2 flex gap-3">
                <button
                  onClick={() => setShowSignOutConfirm(false)}
                  disabled={isSigningOut}
                  className="flex-1 rounded-xl border border-white/[0.08] bg-white/[0.04] py-2.5 text-[0.85rem] font-semibold text-white transition-all hover:bg-white/[0.08] active:scale-[0.98] disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSignOut}
                  disabled={isSigningOut}
                  className="flex-1 rounded-xl bg-red-500 py-2.5 text-[0.85rem] font-semibold text-white transition-all hover:bg-red-600 active:scale-[0.98] disabled:opacity-60 shadow-lg shadow-red-500/20"
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
