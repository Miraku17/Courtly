"use client";

import { motion } from "framer-motion";
import {
  CalendarDays,
  TrendingUp,
  ChevronRight,
  ChevronLeft,
  MoreVertical,
  Building2,
  FileBarChart,
  Settings,
} from "lucide-react";
import Link from "next/link";
import Counter from "@/components/Counter";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/lib/api/profiles";
import { getMyVenue } from "@/lib/api/venues";
import { Clock, AlertTriangle } from "lucide-react";

const recentBookings = [
  { id: 1, player: "Alex Martinez", email: "alex.m@mail.com", venue: "Green Valley Tennis Club", date: "Mar 19, 2026", time: "14:00 - 15:30", amount: "₱3,500", status: "confirmed" },
  { id: 2, player: "Sarah Kim", email: "s.kim@mail.com", venue: "Green Valley Tennis Club", date: "Mar 19, 2026", time: "16:00 - 17:00", amount: "₱2,500", status: "confirmed" },
  { id: 3, player: "Mike Rivera", email: "m.rivera@mail.com", venue: "Downtown Padel Center", date: "Mar 20, 2026", time: "10:00 - 11:30", amount: "₱4,200", status: "pending" },
  { id: 4, player: "Team Blazers", email: "blazers@team.com", venue: "Riverside Basketball Arena", date: "Mar 21, 2026", time: "18:00 - 20:00", amount: "₱6,000", status: "confirmed" },
  { id: 5, player: "Emily Chen", email: "e.chen@mail.com", venue: "Downtown Padel Center", date: "Mar 22, 2026", time: "09:00 - 10:00", amount: "₱2,800", status: "pending" },
];

const chartBars = [40, 55, 70, 45, 90, 60, 75, 50, 65, 55, 80, 100, 70, 85];

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 5) return "Burning the midnight oil";
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

const fadeIn = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.5 },
});

export default function VenueOwnerDashboard() {
  const { data } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  const { data: venueData } = useQuery({
    queryKey: ["my-venue"],
    queryFn: getMyVenue,
  });

  const firstName = data?.profile?.first_name || "Owner";
  const venueStatus = venueData?.venue?.status as string | undefined;
  const adminNotes = venueData?.venue?.admin_notes as string | undefined;

  return (
    <div className="space-y-6">
      {/* Venue Status Banner */}
      {venueStatus === "PENDING" && (
        <motion.div
          {...fadeIn(0)}
          className="flex items-start gap-3 rounded-2xl border border-amber-200/60 bg-amber-50/80 p-5"
        >
          <Clock size={20} className="text-amber-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-[0.85rem] font-bold text-amber-800">
              Your venue is under review
            </p>
            <p className="text-[0.78rem] text-amber-700/70 mt-0.5 leading-relaxed">
              It will be visible to players on the public listing once approved by our team. This usually takes 24-48 hours.
            </p>
          </div>
        </motion.div>
      )}

      {venueStatus === "REJECTED" && (
        <motion.div
          {...fadeIn(0)}
          className="flex items-start gap-3 rounded-2xl border border-red-200/60 bg-red-50/80 p-5"
        >
          <AlertTriangle size={20} className="text-red-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-[0.85rem] font-bold text-red-800">
              Your venue was not approved
            </p>
            <p className="text-[0.78rem] text-red-700/70 mt-0.5 leading-relaxed">
              {adminNotes
                ? `Reason: ${adminNotes}. Please update your venue details and it will be reviewed again.`
                : "Please update your venue details and it will be reviewed again."}
            </p>
            <Link
              href="/venue-owner/venue"
              className="inline-flex items-center gap-1 mt-2 text-[0.78rem] font-bold text-red-600 hover:underline"
            >
              Edit Venue Details
              <ChevronRight size={14} />
            </Link>
          </div>
        </motion.div>
      )}

      {/* Header */}
      <motion.div
        {...fadeIn(0)}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-[1.6rem] sm:text-[2rem] font-extrabold text-text-dark tracking-tight">
            {getGreeting()}, {firstName}
          </h1>
          <p className="text-text-muted-dark/60 text-[0.85rem] mt-0.5">
            Here&apos;s what&apos;s happening with your venues today.
          </p>
        </div>
        <Link
          href="/venue-owner/venue"
          className="flex items-center gap-2 rounded-xl bg-section-dark px-5 py-2.5 text-[0.8rem] font-bold uppercase tracking-wider text-white transition-all hover:bg-section-dark/90 active:scale-[0.97] shrink-0 shadow-lg shadow-section-dark/15"
        >
          <Settings size={16} strokeWidth={2.5} />
          Edit Venue
        </Link>
      </motion.div>

      {/* Bento Metrics Grid */}
      <div className="grid grid-cols-12 gap-4 lg:gap-5">
        {/* Hero Revenue Card */}
        <motion.div
          {...fadeIn(0.1)}
          className="col-span-12 lg:col-span-4 rounded-2xl p-7 border border-section-dark/10 bg-[#f5f5f5] relative overflow-hidden group"
        >
          <div className="relative z-10">
            <p className="text-text-muted-dark/50 text-[0.65rem] uppercase tracking-[0.2em] font-bold mb-2">
              Monthly Revenue
            </p>
            <div className="flex items-end gap-1 mb-4">
              <span className="text-[1.2rem] font-bold text-section-dark/40">₱</span>
              <Counter
                value={42500}
                fontSize={48}
                padding={0}
                places={[1000, 100, 10, 1]}
                gap={2}
                textColor="#1a3a1a"
                fontWeight="900"
                gradientHeight={0}
                containerStyle={{ display: "inline-flex" }}
                counterStyle={{ background: "transparent" }}
              />
            </div>
            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200/60 w-fit px-3 py-1.5 rounded-full">
              <TrendingUp size={13} className="text-emerald-600" />
              <span className="text-[0.7rem] font-semibold text-emerald-600">+12.4% from last month</span>
            </div>
          </div>
          {/* Background Flare */}
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-section-dark/5 blur-[60px] rounded-full group-hover:bg-section-dark/10 transition-colors duration-500 pointer-events-none" />
        </motion.div>

        {/* Total Venues */}
        <motion.div
          {...fadeIn(0.15)}
          className="col-span-6 lg:col-span-4 rounded-2xl p-6 border border-section-dark/8 bg-[#f5f5f5] group hover:border-section-dark/15 transition-all duration-300"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-xl bg-section-dark/5 text-section-dark group-hover:scale-110 transition-transform">
              <Building2 size={20} />
            </div>
            <span className="text-text-muted-dark/30 text-[0.6rem] font-mono tracking-wider">ID: VEN-03</span>
          </div>
          <p className="text-text-muted-dark/60 text-[0.8rem] font-medium">Total Venues</p>
          <div className="mt-1">
            <Counter
              value={3}
              fontSize={30}
              padding={0}
              places={[1]}
              gap={2}
              textColor="#1a1a1a"
              fontWeight="800"
              gradientHeight={0}
              containerStyle={{ display: "inline-flex" }}
              counterStyle={{ background: "transparent" }}
            />
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-[0.7rem]">
            <span className="font-bold text-emerald-600">3 Active</span>
            <span className="text-text-muted-dark/30">&bull;</span>
            <span className="text-text-muted-dark/50">0 Maintenance</span>
          </div>
        </motion.div>

        {/* Active Bookings */}
        <motion.div
          {...fadeIn(0.2)}
          className="col-span-6 lg:col-span-4 rounded-2xl p-6 border border-section-dark/8 bg-[#f5f5f5] group hover:border-section-dark/15 transition-all duration-300"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-xl bg-section-dark/5 text-section-dark group-hover:scale-110 transition-transform">
              <CalendarDays size={20} />
            </div>
            <span className="text-emerald-600/80 text-[0.6rem] font-bold uppercase tracking-wider">Live</span>
          </div>
          <p className="text-text-muted-dark/60 text-[0.8rem] font-medium">Active Bookings</p>
          <div className="mt-1">
            <Counter
              value={24}
              fontSize={30}
              padding={0}
              places={[10, 1]}
              gap={2}
              textColor="#1a1a1a"
              fontWeight="800"
              gradientHeight={0}
              containerStyle={{ display: "inline-flex" }}
              counterStyle={{ background: "transparent" }}
            />
          </div>
          {/* Capacity Bar */}
          <div className="mt-4">
            <div className="w-full bg-section-dark/8 h-1.5 rounded-full overflow-hidden">
              <motion.div
                className="bg-section-dark h-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "75%" }}
                transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
              />
            </div>
            <p className="mt-2 text-[0.6rem] text-text-muted-dark/40 uppercase font-bold tracking-wider">
              Capacity: 75% Utilized
            </p>
          </div>
        </motion.div>

        {/* Venue Reach Chart — 8 cols */}
        <motion.div
          {...fadeIn(0.25)}
          className="col-span-12 lg:col-span-8 rounded-2xl p-6 border border-section-dark/10 bg-[#f5f5f5]"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
            <div>
              <h3 className="text-[1rem] font-bold text-text-dark">Venue Reach</h3>
              <p className="text-[0.7rem] text-text-muted-dark/50">
                Profile views across all listings (Last 14 days)
              </p>
            </div>
            <div className="flex gap-1.5">
              <button className="px-3 py-1.5 text-[0.7rem] font-semibold rounded-lg bg-section-dark text-white">
                Week
              </button>
              <button className="px-3 py-1.5 text-[0.7rem] font-semibold rounded-lg text-text-muted-dark/50 hover:text-text-dark hover:bg-section-dark/5 transition-colors">
                Month
              </button>
            </div>
          </div>
          {/* Bar Chart */}
          <div className="h-44 w-full flex items-end gap-1.5 sm:gap-2">
            {chartBars.map((height, i) => (
              <motion.div
                key={i}
                className={`w-full rounded-t-sm transition-colors duration-200 ${
                  height === 100
                    ? "bg-section-dark/50 shadow-[0_0_16px_rgba(26,58,26,0.1)]"
                    : "bg-section-dark/15 hover:bg-section-dark/25"
                }`}
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{ delay: 0.3 + i * 0.04, duration: 0.5, ease: "easeOut" }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-3 px-1">
            <span className="text-[0.55rem] text-text-muted-dark/40 font-mono">Mar 6</span>
            <span className="text-[0.55rem] text-text-muted-dark/40 font-mono">Mar 12</span>
            <span className="text-[0.55rem] text-text-muted-dark/40 font-mono">Mar 19</span>
          </div>
        </motion.div>

        {/* Quick Actions — 4 cols */}
        <motion.div
          {...fadeIn(0.3)}
          className="col-span-12 lg:col-span-4 rounded-2xl p-6 border border-section-dark/8 bg-[#f5f5f5]"
        >
          <h3 className="text-[0.7rem] font-bold text-text-dark uppercase tracking-[0.15em] mb-5">
            Quick Actions
          </h3>
          <div className="space-y-2.5">
            <Link
              href="/venue-owner/venue"
              className="w-full flex items-center justify-between p-4 bg-[#f5f5f5]/60 hover:bg-white rounded-xl border border-section-dark/8 group transition-all"
            >
              <div className="flex items-center gap-3">
                <Settings size={18} className="text-section-dark" />
                <span className="text-[0.8rem] font-medium text-text-dark">Edit Venue Details</span>
              </div>
              <ChevronRight size={14} className="text-text-muted-dark/30 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            <Link
              href="/venue-owner/bookings"
              className="w-full flex items-center justify-between p-4 bg-[#f5f5f5]/60 hover:bg-white rounded-xl border border-section-dark/8 group transition-all"
            >
              <div className="flex items-center gap-3">
                <CalendarDays size={18} className="text-section-dark" />
                <span className="text-[0.8rem] font-medium text-text-dark">Manage Bookings</span>
              </div>
              <ChevronRight size={14} className="text-text-muted-dark/30 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            <Link
              href="/venue-owner/analytics"
              className="w-full flex items-center justify-between p-4 bg-[#f5f5f5]/60 hover:bg-white rounded-xl border border-section-dark/8 group transition-all"
            >
              <div className="flex items-center gap-3">
                <FileBarChart size={18} className="text-section-dark" />
                <span className="text-[0.8rem] font-medium text-text-dark">Export Reports</span>
              </div>
              <ChevronRight size={14} className="text-text-muted-dark/30 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Recent Bookings Table */}
      <motion.section
        {...fadeIn(0.35)}
        className="rounded-2xl border border-section-dark/10 bg-[#f5f5f5] overflow-hidden"
      >
        {/* Table Header */}
        <div className="p-5 sm:p-6 border-b border-section-dark/8 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-[1.1rem] font-bold text-text-dark">Recent Bookings</h2>
            <p className="text-[0.7rem] text-text-muted-dark/50">Manage your latest reservation requests</p>
          </div>
          <Link
            href="/venue-owner/bookings"
            className="text-[0.8rem] font-bold text-section-dark hover:underline decoration-2 underline-offset-4"
          >
            View All
          </Link>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-text-muted-dark/40 text-[0.6rem] uppercase tracking-[0.15em] bg-section-dark/3">
                <th className="px-6 py-4 font-extrabold">Player</th>
                <th className="px-6 py-4 font-extrabold hidden md:table-cell">Venue</th>
                <th className="px-6 py-4 font-extrabold hidden sm:table-cell">Date &amp; Time</th>
                <th className="px-6 py-4 font-extrabold">Amount</th>
                <th className="px-6 py-4 font-extrabold">Status</th>
                <th className="px-6 py-4 font-extrabold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-section-dark/6">
              {recentBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-section-dark/3 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded-full bg-section-dark/8 flex items-center justify-center text-[0.65rem] font-bold text-section-dark shrink-0">
                        {booking.player.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div className="min-w-0">
                        <p className="text-[0.8rem] font-semibold text-text-dark truncate">{booking.player}</p>
                        <p className="text-[0.6rem] text-text-muted-dark/40 truncate">{booking.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <p className="text-[0.8rem] font-medium text-text-dark/70">{booking.venue}</p>
                  </td>
                  <td className="px-6 py-4 hidden sm:table-cell">
                    <p className="text-[0.8rem] text-text-dark/70">{booking.date}</p>
                    <p className="text-[0.6rem] text-text-muted-dark/40 uppercase">{booking.time}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-[0.8rem] font-bold text-section-dark">{booking.amount}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[0.55rem] font-bold uppercase tracking-wider border ${
                        booking.status === "confirmed"
                          ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                          : "bg-amber-50 text-amber-600 border-amber-200"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-section-dark/5 rounded-lg text-text-muted-dark/30 hover:text-section-dark transition-colors">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="px-6 py-3.5 bg-section-dark/3 border-t border-section-dark/6 flex justify-between items-center">
          <span className="text-[0.7rem] text-text-muted-dark/40">
            Showing {recentBookings.length} of 24 bookings
          </span>
          <div className="flex gap-1.5">
            <button className="p-1.5 rounded-lg border border-section-dark/10 text-text-muted-dark/20 opacity-30" disabled>
              <ChevronLeft size={14} />
            </button>
            <button className="p-1.5 rounded-lg border border-section-dark/10 text-text-muted-dark/40 hover:bg-section-dark/5 hover:text-text-dark transition-colors">
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
