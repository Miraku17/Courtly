"use client";

import { motion } from "framer-motion";
import {
  MapPin,
  CalendarDays,
  TrendingUp,
  DollarSign,
  Plus,
  Eye,
  ChevronRight,
  ChevronLeft,
  MoreVertical,
  Building2,
  FileBarChart,
} from "lucide-react";
import Link from "next/link";
import Counter from "@/components/Counter";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/lib/api/profiles";

const recentBookings = [
  { id: 1, player: "Alex Martinez", email: "alex.m@mail.com", venue: "Green Valley Tennis Club", date: "Mar 19, 2026", time: "14:00 - 15:30", amount: "$67.50", status: "confirmed" },
  { id: 2, player: "Sarah Kim", email: "s.kim@mail.com", venue: "Green Valley Tennis Club", date: "Mar 19, 2026", time: "16:00 - 17:00", amount: "$45.00", status: "confirmed" },
  { id: 3, player: "Mike Rivera", email: "m.rivera@mail.com", venue: "Downtown Padel Center", date: "Mar 20, 2026", time: "10:00 - 11:30", amount: "$82.50", status: "pending" },
  { id: 4, player: "Team Blazers", email: "blazers@team.com", venue: "Riverside Basketball Arena", date: "Mar 21, 2026", time: "18:00 - 20:00", amount: "$120.00", status: "confirmed" },
  { id: 5, player: "Emily Chen", email: "e.chen@mail.com", venue: "Downtown Padel Center", date: "Mar 22, 2026", time: "09:00 - 10:00", amount: "$55.00", status: "pending" },
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

  const firstName = data?.profile?.first_name || "Owner";

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        {...fadeIn(0)}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-[1.6rem] sm:text-[2rem] font-extrabold text-white tracking-tight">
            {getGreeting()}, {firstName}
          </h1>
          <p className="text-text-muted/40 text-[0.85rem] mt-0.5">
            Here&apos;s what&apos;s happening with your venues today.
          </p>
        </div>
        <Link
          href="/venue-owner/venues/new"
          className="flex items-center gap-2 rounded-xl bg-gradient-to-br from-primary to-primary/70 px-5 py-2.5 text-[0.8rem] font-bold uppercase tracking-wider text-text-dark transition-all hover:brightness-110 active:scale-[0.97] shrink-0 shadow-lg shadow-primary/15"
        >
          <Plus size={16} strokeWidth={3} />
          Add Venue
        </Link>
      </motion.div>

      {/* Bento Metrics Grid */}
      <div className="grid grid-cols-12 gap-4 lg:gap-5">
        {/* Hero Revenue Card */}
        <motion.div
          {...fadeIn(0.1)}
          className="col-span-12 lg:col-span-4 rounded-2xl p-7 border border-white/[0.06] bg-white/[0.03] relative overflow-hidden group"
        >
          <div className="relative z-10">
            <p className="text-text-muted/40 text-[0.65rem] uppercase tracking-[0.2em] font-bold mb-2">
              Monthly Revenue
            </p>
            <div className="flex items-end gap-1 mb-4">
              <span className="text-[1.2rem] font-bold text-white/50">$</span>
              <Counter
                value={4250}
                fontSize={48}
                padding={0}
                places={[1000, 100, 10, 1]}
                gap={2}
                textColor="#d9f170"
                fontWeight="900"
                gradientHeight={0}
                containerStyle={{ display: "inline-flex" }}
                counterStyle={{ background: "transparent" }}
              />
            </div>
            <div className="flex items-center gap-2 bg-primary/10 border border-primary/15 w-fit px-3 py-1.5 rounded-full">
              <TrendingUp size={13} className="text-primary" />
              <span className="text-[0.7rem] font-semibold text-primary">+12.4% from last month</span>
            </div>
          </div>
          {/* Background Flare */}
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-primary/5 blur-[60px] rounded-full group-hover:bg-primary/10 transition-colors duration-500 pointer-events-none" />
        </motion.div>

        {/* Total Venues */}
        <motion.div
          {...fadeIn(0.15)}
          className="col-span-6 lg:col-span-4 rounded-2xl p-6 border border-white/[0.04] bg-white/[0.02] group hover:border-primary/15 transition-all duration-300"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-xl bg-white/[0.04] text-primary group-hover:scale-110 transition-transform">
              <Building2 size={20} />
            </div>
            <span className="text-text-muted/25 text-[0.6rem] font-mono tracking-wider">ID: VEN-03</span>
          </div>
          <p className="text-text-muted/40 text-[0.8rem] font-medium">Total Venues</p>
          <div className="mt-1">
            <Counter
              value={3}
              fontSize={30}
              padding={0}
              places={[1]}
              gap={2}
              textColor="white"
              fontWeight="800"
              gradientHeight={0}
              containerStyle={{ display: "inline-flex" }}
              counterStyle={{ background: "transparent" }}
            />
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-[0.7rem]">
            <span className="font-bold text-primary">3 Active</span>
            <span className="text-text-muted/20">&bull;</span>
            <span className="text-text-muted/40">0 Maintenance</span>
          </div>
        </motion.div>

        {/* Active Bookings */}
        <motion.div
          {...fadeIn(0.2)}
          className="col-span-6 lg:col-span-4 rounded-2xl p-6 border border-white/[0.04] bg-white/[0.02] group hover:border-primary/15 transition-all duration-300"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-xl bg-white/[0.04] text-primary group-hover:scale-110 transition-transform">
              <CalendarDays size={20} />
            </div>
            <span className="text-primary/60 text-[0.6rem] font-bold uppercase tracking-wider">Live</span>
          </div>
          <p className="text-text-muted/40 text-[0.8rem] font-medium">Active Bookings</p>
          <div className="mt-1">
            <Counter
              value={24}
              fontSize={30}
              padding={0}
              places={[10, 1]}
              gap={2}
              textColor="white"
              fontWeight="800"
              gradientHeight={0}
              containerStyle={{ display: "inline-flex" }}
              counterStyle={{ background: "transparent" }}
            />
          </div>
          {/* Capacity Bar */}
          <div className="mt-4">
            <div className="w-full bg-white/[0.04] h-1.5 rounded-full overflow-hidden">
              <motion.div
                className="bg-primary h-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "75%" }}
                transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
              />
            </div>
            <p className="mt-2 text-[0.6rem] text-text-muted/30 uppercase font-bold tracking-wider">
              Capacity: 75% Utilized
            </p>
          </div>
        </motion.div>

        {/* Venue Reach Chart — 8 cols */}
        <motion.div
          {...fadeIn(0.25)}
          className="col-span-12 lg:col-span-8 rounded-2xl p-6 border border-white/[0.06] bg-white/[0.03]"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
            <div>
              <h3 className="text-[1rem] font-bold text-white">Venue Reach</h3>
              <p className="text-[0.7rem] text-text-muted/35">
                Profile views across all listings (Last 14 days)
              </p>
            </div>
            <div className="flex gap-1.5">
              <button className="px-3 py-1.5 text-[0.7rem] font-semibold rounded-lg bg-white/[0.06] text-white border border-white/[0.06]">
                Week
              </button>
              <button className="px-3 py-1.5 text-[0.7rem] font-semibold rounded-lg text-text-muted/40 hover:text-white transition-colors">
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
                    ? "bg-primary/50 shadow-[0_0_16px_rgba(217,241,112,0.15)]"
                    : "bg-primary/15 hover:bg-primary/30"
                }`}
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{ delay: 0.3 + i * 0.04, duration: 0.5, ease: "easeOut" }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-3 px-1">
            <span className="text-[0.55rem] text-text-muted/25 font-mono">Mar 6</span>
            <span className="text-[0.55rem] text-text-muted/25 font-mono">Mar 12</span>
            <span className="text-[0.55rem] text-text-muted/25 font-mono">Mar 19</span>
          </div>
        </motion.div>

        {/* Quick Actions — 4 cols */}
        <motion.div
          {...fadeIn(0.3)}
          className="col-span-12 lg:col-span-4 rounded-2xl p-6 border border-white/[0.04] bg-white/[0.02]"
        >
          <h3 className="text-[0.7rem] font-bold text-white uppercase tracking-[0.15em] mb-5">
            Quick Actions
          </h3>
          <div className="space-y-2.5">
            <Link
              href="/venue-owner/venues/new"
              className="w-full flex items-center justify-between p-4 bg-white/[0.03] hover:bg-white/[0.06] rounded-xl border border-white/[0.04] group transition-all"
            >
              <div className="flex items-center gap-3">
                <Plus size={18} className="text-primary" />
                <span className="text-[0.8rem] font-medium text-white">Add New Venue</span>
              </div>
              <ChevronRight size={14} className="text-text-muted/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            <Link
              href="/venue-owner/bookings"
              className="w-full flex items-center justify-between p-4 bg-white/[0.03] hover:bg-white/[0.06] rounded-xl border border-white/[0.04] group transition-all"
            >
              <div className="flex items-center gap-3">
                <CalendarDays size={18} className="text-primary" />
                <span className="text-[0.8rem] font-medium text-white">Manage Bookings</span>
              </div>
              <ChevronRight size={14} className="text-text-muted/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            <Link
              href="/venue-owner/analytics"
              className="w-full flex items-center justify-between p-4 bg-white/[0.03] hover:bg-white/[0.06] rounded-xl border border-white/[0.04] group transition-all"
            >
              <div className="flex items-center gap-3">
                <FileBarChart size={18} className="text-primary" />
                <span className="text-[0.8rem] font-medium text-white">Export Reports</span>
              </div>
              <ChevronRight size={14} className="text-text-muted/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Recent Bookings Table */}
      <motion.section
        {...fadeIn(0.35)}
        className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden"
      >
        {/* Table Header */}
        <div className="p-5 sm:p-6 border-b border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-[1.1rem] font-bold text-white">Recent Bookings</h2>
            <p className="text-[0.7rem] text-text-muted/35">Manage your latest reservation requests</p>
          </div>
          <Link
            href="/venue-owner/bookings"
            className="text-[0.8rem] font-bold text-primary hover:underline decoration-2 underline-offset-4"
          >
            View All
          </Link>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-text-muted/30 text-[0.6rem] uppercase tracking-[0.15em] bg-white/[0.02]">
                <th className="px-6 py-4 font-extrabold">Player</th>
                <th className="px-6 py-4 font-extrabold hidden md:table-cell">Venue</th>
                <th className="px-6 py-4 font-extrabold hidden sm:table-cell">Date &amp; Time</th>
                <th className="px-6 py-4 font-extrabold">Amount</th>
                <th className="px-6 py-4 font-extrabold">Status</th>
                <th className="px-6 py-4 font-extrabold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {recentBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-[0.65rem] font-bold text-primary shrink-0">
                        {booking.player.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div className="min-w-0">
                        <p className="text-[0.8rem] font-semibold text-white truncate">{booking.player}</p>
                        <p className="text-[0.6rem] text-text-muted/30 truncate">{booking.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <p className="text-[0.8rem] font-medium text-white/70">{booking.venue}</p>
                  </td>
                  <td className="px-6 py-4 hidden sm:table-cell">
                    <p className="text-[0.8rem] text-white/70">{booking.date}</p>
                    <p className="text-[0.6rem] text-text-muted/30 uppercase">{booking.time}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-[0.8rem] font-bold text-primary">{booking.amount}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[0.55rem] font-bold uppercase tracking-wider border ${
                        booking.status === "confirmed"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-white/[0.06] rounded-lg text-text-muted/30 hover:text-primary transition-colors">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="px-6 py-3.5 bg-white/[0.015] border-t border-white/[0.04] flex justify-between items-center">
          <span className="text-[0.7rem] text-text-muted/30">
            Showing {recentBookings.length} of 24 bookings
          </span>
          <div className="flex gap-1.5">
            <button className="p-1.5 rounded-lg border border-white/[0.06] text-text-muted/20 opacity-30" disabled>
              <ChevronLeft size={14} />
            </button>
            <button className="p-1.5 rounded-lg border border-white/[0.06] text-text-muted/40 hover:bg-white/[0.04] hover:text-white transition-colors">
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
