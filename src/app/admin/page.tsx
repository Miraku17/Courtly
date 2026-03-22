"use client";

import { motion } from "framer-motion";
import {
  Building2,
  Clock,
  CheckCircle2,
  XCircle,
  ChevronRight,
  Eye,
} from "lucide-react";
import Link from "next/link";
import Counter from "@/components/Counter";
import { useQuery } from "@tanstack/react-query";
import { getAdminVenues } from "@/lib/api/admin";
import { getProfile } from "@/lib/api/profiles";

const fadeIn = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.5 },
});

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 5) return "Burning the midnight oil";
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export default function AdminDashboard() {
  const { data: profileData } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  const { data } = useQuery({
    queryKey: ["admin-venues"],
    queryFn: () => getAdminVenues(),
  });

  const firstName = profileData?.profile?.first_name || "Admin";
  const counts = data?.counts ?? { total: 0, pending: 0, approved: 0, rejected: 0 };
  const pendingVenues = (data?.venues ?? []).filter(
    (v: { status: string }) => v.status === "PENDING"
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div {...fadeIn(0)} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-[1.6rem] sm:text-[2rem] font-extrabold text-text-dark tracking-tight">
            {getGreeting()}, {firstName}
          </h1>
          <p className="text-text-muted-dark/60 text-[0.85rem] mt-0.5">
            Platform overview and venue approvals.
          </p>
        </div>
        <Link
          href="/admin/venues"
          className="flex items-center gap-2 rounded-xl bg-section-dark px-5 py-2.5 text-[0.8rem] font-bold uppercase tracking-wider text-white transition-all hover:bg-section-dark/90 active:scale-[0.97] shrink-0 shadow-lg shadow-section-dark/15"
        >
          <Eye size={16} strokeWidth={2.5} />
          Review Venues
        </Link>
      </motion.div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
        {/* Total Venues */}
        <motion.div
          {...fadeIn(0.1)}
          className="rounded-2xl p-6 border border-section-dark/8 bg-[#f5f5f5] group hover:border-section-dark/15 transition-all duration-300"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-xl bg-section-dark/5 text-section-dark group-hover:scale-110 transition-transform">
              <Building2 size={20} />
            </div>
          </div>
          <p className="text-text-muted-dark/60 text-[0.8rem] font-medium">Total Venues</p>
          <div className="mt-1">
            <Counter
              value={counts.total}
              fontSize={30}
              padding={0}
              places={counts.total >= 10 ? [10, 1] : [1]}
              gap={2}
              textColor="#1a1a1a"
              fontWeight="800"
              gradientHeight={0}
              containerStyle={{ display: "inline-flex" }}
              counterStyle={{ background: "transparent" }}
            />
          </div>
        </motion.div>

        {/* Pending */}
        <motion.div
          {...fadeIn(0.15)}
          className="rounded-2xl p-6 border border-amber-200/60 bg-amber-50/50 group hover:border-amber-300 transition-all duration-300"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-xl bg-amber-100 text-amber-600 group-hover:scale-110 transition-transform">
              <Clock size={20} />
            </div>
            {counts.pending > 0 && (
              <span className="flex size-5 items-center justify-center rounded-full bg-amber-500 text-[0.55rem] font-bold text-white">
                {counts.pending}
              </span>
            )}
          </div>
          <p className="text-amber-700/70 text-[0.8rem] font-medium">Pending</p>
          <div className="mt-1">
            <Counter
              value={counts.pending}
              fontSize={30}
              padding={0}
              places={counts.pending >= 10 ? [10, 1] : [1]}
              gap={2}
              textColor="#b45309"
              fontWeight="800"
              gradientHeight={0}
              containerStyle={{ display: "inline-flex" }}
              counterStyle={{ background: "transparent" }}
            />
          </div>
        </motion.div>

        {/* Approved */}
        <motion.div
          {...fadeIn(0.2)}
          className="rounded-2xl p-6 border border-emerald-200/60 bg-emerald-50/50 group hover:border-emerald-300 transition-all duration-300"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-xl bg-emerald-100 text-emerald-600 group-hover:scale-110 transition-transform">
              <CheckCircle2 size={20} />
            </div>
          </div>
          <p className="text-emerald-700/70 text-[0.8rem] font-medium">Approved</p>
          <div className="mt-1">
            <Counter
              value={counts.approved}
              fontSize={30}
              padding={0}
              places={counts.approved >= 10 ? [10, 1] : [1]}
              gap={2}
              textColor="#047857"
              fontWeight="800"
              gradientHeight={0}
              containerStyle={{ display: "inline-flex" }}
              counterStyle={{ background: "transparent" }}
            />
          </div>
        </motion.div>

        {/* Rejected */}
        <motion.div
          {...fadeIn(0.25)}
          className="rounded-2xl p-6 border border-red-200/60 bg-red-50/50 group hover:border-red-300 transition-all duration-300"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-xl bg-red-100 text-red-500 group-hover:scale-110 transition-transform">
              <XCircle size={20} />
            </div>
          </div>
          <p className="text-red-700/70 text-[0.8rem] font-medium">Rejected</p>
          <div className="mt-1">
            <Counter
              value={counts.rejected}
              fontSize={30}
              padding={0}
              places={counts.rejected >= 10 ? [10, 1] : [1]}
              gap={2}
              textColor="#dc2626"
              fontWeight="800"
              gradientHeight={0}
              containerStyle={{ display: "inline-flex" }}
              counterStyle={{ background: "transparent" }}
            />
          </div>
        </motion.div>
      </div>

      {/* Pending Venues List */}
      <motion.section
        {...fadeIn(0.3)}
        className="rounded-2xl border border-section-dark/10 bg-[#f5f5f5] overflow-hidden"
      >
        <div className="p-5 sm:p-6 border-b border-section-dark/8 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-[1.1rem] font-bold text-text-dark">
              Pending Approval
            </h2>
            <p className="text-[0.7rem] text-text-muted-dark/50">
              Venues waiting for your review
            </p>
          </div>
          <Link
            href="/admin/venues?status=PENDING"
            className="text-[0.8rem] font-bold text-section-dark hover:underline decoration-2 underline-offset-4"
          >
            View All
          </Link>
        </div>

        {pendingVenues.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <CheckCircle2
              size={40}
              className="text-emerald-300 mb-3"
            />
            <p className="text-[0.9rem] font-semibold text-text-dark/70">
              All caught up!
            </p>
            <p className="text-[0.75rem] text-text-muted-dark/50 mt-1">
              No venues pending approval right now.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-text-muted-dark/40 text-[0.6rem] uppercase tracking-[0.15em] bg-section-dark/3">
                  <th className="px-6 py-4 font-extrabold">Venue</th>
                  <th className="px-6 py-4 font-extrabold hidden sm:table-cell">Owner</th>
                  <th className="px-6 py-4 font-extrabold hidden md:table-cell">City</th>
                  <th className="px-6 py-4 font-extrabold hidden lg:table-cell">Submitted</th>
                  <th className="px-6 py-4 font-extrabold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-section-dark/6">
                {pendingVenues.slice(0, 5).map((venue: any) => (
                  <tr
                    key={venue.id}
                    className="hover:bg-section-dark/3 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="min-w-0">
                        <p className="text-[0.8rem] font-semibold text-text-dark truncate">
                          {venue.name}
                        </p>
                        <p className="text-[0.6rem] text-text-muted-dark/40">
                          {venue.type}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden sm:table-cell">
                      <p className="text-[0.8rem] text-text-dark/70">
                        {venue.profiles?.first_name} {venue.profiles?.last_name}
                      </p>
                      <p className="text-[0.6rem] text-text-muted-dark/40">
                        {venue.email}
                      </p>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <p className="text-[0.8rem] text-text-dark/70">
                        {venue.city}
                      </p>
                    </td>
                    <td className="px-6 py-4 hidden lg:table-cell">
                      <p className="text-[0.75rem] text-text-muted-dark/50">
                        {new Date(venue.created_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/admin/venues?status=PENDING`}
                        className="inline-flex items-center gap-1 text-[0.75rem] font-bold text-section-dark hover:underline"
                      >
                        Review
                        <ChevronRight size={14} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.section>
    </div>
  );
}
