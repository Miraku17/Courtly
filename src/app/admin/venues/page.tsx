"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  Search,
  MapPin,
  Loader2,
  Clock,
  CheckCircle2,
  XCircle,
  Phone,
  Mail,
  DollarSign,
  Tag,
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAdminVenues, updateVenueStatus } from "@/lib/api/admin";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

type VenueStatusFilter = "ALL" | "PENDING" | "APPROVED" | "REJECTED";
type VenueStatus = "PENDING" | "APPROVED" | "REJECTED";

const statusTabs: { label: string; value: VenueStatusFilter }[] = [
  { label: "All", value: "ALL" },
  { label: "Pending", value: "PENDING" },
  { label: "Approved", value: "APPROVED" },
  { label: "Rejected", value: "REJECTED" },
];

const statusConfig: Record<VenueStatus, { label: string; icon: typeof Clock; triggerClass: string; itemClass: string }> = {
  PENDING: {
    label: "Pending",
    icon: Clock,
    triggerClass: "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 focus:ring-amber-300",
    itemClass: "text-amber-700 focus:bg-amber-50 focus:text-amber-800",
  },
  APPROVED: {
    label: "Approved",
    icon: CheckCircle2,
    triggerClass: "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 focus:ring-emerald-300",
    itemClass: "text-emerald-700 focus:bg-emerald-50 focus:text-emerald-800",
  },
  REJECTED: {
    label: "Rejected",
    icon: XCircle,
    triggerClass: "bg-red-50 text-red-700 border-red-200 hover:bg-red-100 focus:ring-red-300",
    itemClass: "text-red-700 focus:bg-red-50 focus:text-red-800",
  },
};

const fadeIn = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.5 },
});

function StatusSelect({
  venueId,
  currentStatus,
  isPending,
  onStatusChange,
}: {
  venueId: string;
  currentStatus: VenueStatus;
  isPending: boolean;
  onStatusChange: (venueId: string, status: VenueStatus) => void;
}) {
  const config = statusConfig[currentStatus];

  return (
    <Select
      value={currentStatus}
      disabled={isPending}
      onValueChange={(value) => onStatusChange(venueId, value as VenueStatus)}
    >
      <SelectTrigger
        className={`w-[138px] h-8 rounded-lg border px-2.5 text-[0.7rem] font-bold uppercase tracking-wider cursor-pointer transition-all shadow-none [&_svg:not([class*='text-'])]:text-current ${config.triggerClass} ${isPending ? "opacity-50 cursor-wait" : ""}`}
      >
        {isPending && (
          <Loader2 size={13} className="animate-spin shrink-0" />
        )}
        <SelectValue />
      </SelectTrigger>
      <SelectContent
        position="popper"
        sideOffset={4}
        className="rounded-lg border border-section-dark/10 bg-white shadow-md min-w-[var(--radix-select-trigger-width)]"
      >
        {(Object.entries(statusConfig) as [VenueStatus, typeof config][]).map(
          ([value, cfg]) => {
            const ItemIcon = cfg.icon;
            return (
              <SelectItem
                key={value}
                value={value}
                className={`text-[0.72rem] font-semibold rounded-md cursor-pointer py-1.5 ${cfg.itemClass}`}
              >
                <span className="flex items-center gap-1.5">
                  <ItemIcon size={12} className="shrink-0" />
                  {cfg.label}
                </span>
              </SelectItem>
            );
          }
        )}
      </SelectContent>
    </Select>
  );
}

export default function AdminVenuesPage() {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<VenueStatusFilter>("ALL");
  const [search, setSearch] = useState("");
  const [updatingVenueId, setUpdatingVenueId] = useState<string | null>(null);
  const [selectedVenue, setSelectedVenue] = useState<any | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["admin-venues", activeTab === "ALL" ? undefined : activeTab],
    queryFn: () =>
      getAdminVenues(activeTab === "ALL" ? undefined : activeTab),
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: VenueStatus }) =>
      updateVenueStatus(id, { status }),
    onSuccess: (_, variables) => {
      const labels: Record<VenueStatus, string> = {
        PENDING: "Venue set to pending",
        APPROVED: "Venue approved!",
        REJECTED: "Venue rejected",
      };
      toast.success(labels[variables.status]);
      setUpdatingVenueId(null);
      queryClient.invalidateQueries({ queryKey: ["admin-venues"] });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.error || "Failed to update venue status";
      toast.error(message);
      setUpdatingVenueId(null);
    },
  });

  const handleStatusChange = (venueId: string, newStatus: VenueStatus) => {
    setUpdatingVenueId(venueId);
    statusMutation.mutate({ id: venueId, status: newStatus });
  };

  const venues = (data?.venues ?? []).filter((v: any) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      v.name?.toLowerCase().includes(q) ||
      v.city?.toLowerCase().includes(q) ||
      v.email?.toLowerCase().includes(q) ||
      v.profiles?.first_name?.toLowerCase().includes(q) ||
      v.profiles?.last_name?.toLowerCase().includes(q)
    );
  });

  const counts = data?.counts ?? { total: 0, pending: 0, approved: 0, rejected: 0 };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div {...fadeIn(0)}>
        <h1 className="text-[1.6rem] sm:text-[2rem] font-extrabold text-text-dark tracking-tight">
          Venue Management
        </h1>
        <p className="text-text-muted-dark/60 text-[0.85rem] mt-0.5">
          Review and manage venue submissions.
        </p>
      </motion.div>

      {/* Tabs + Search */}
      <motion.div
        {...fadeIn(0.1)}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div className="flex gap-1.5 p-1 bg-section-dark/5 rounded-xl">
          {statusTabs.map((tab) => {
            const isActive = activeTab === tab.value;
            const count =
              tab.value === "ALL"
                ? counts.total
                : counts[tab.value.toLowerCase() as keyof typeof counts];
            return (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`px-4 py-2 text-[0.75rem] font-bold rounded-lg transition-all ${
                  isActive
                    ? "bg-section-dark text-white shadow-sm"
                    : "text-text-muted-dark/50 hover:text-text-dark hover:bg-section-dark/5"
                }`}
              >
                {tab.label}
                {typeof count === "number" && (
                  <span
                    className={`ml-1.5 ${
                      isActive ? "text-white/70" : "text-text-muted-dark/30"
                    }`}
                  >
                    ({count})
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="relative">
          <Search
            size={15}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted-dark/30"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search venues or owners..."
            className="w-full sm:w-72 bg-surface border border-border-light rounded-xl pl-10 pr-4 py-2.5 text-[0.82rem] text-text-dark outline-none focus:border-section-dark/30 transition-all placeholder:text-text-muted-dark/30"
          />
        </div>
      </motion.div>

      {/* Venues Table */}
      <motion.section
        {...fadeIn(0.15)}
        className="rounded-2xl border border-section-dark/10 bg-white shadow-sm shadow-section-dark/5 overflow-hidden"
      >
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={28} className="text-section-dark animate-spin" />
          </div>
        ) : venues.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Building2 size={40} className="text-text-muted-dark/20 mb-3" />
            <p className="text-[0.9rem] font-semibold text-text-dark/70">
              No venues found
            </p>
            <p className="text-[0.75rem] text-text-muted-dark/50 mt-1">
              {search
                ? "Try a different search term."
                : "No venues match this filter."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-text-muted-dark/40 text-[0.6rem] uppercase tracking-[0.15em] bg-section-dark/3">
                  <th className="px-6 py-4 font-extrabold">Venue</th>
                  <th className="px-6 py-4 font-extrabold hidden sm:table-cell">
                    Owner
                  </th>
                  <th className="px-6 py-4 font-extrabold hidden md:table-cell">
                    Location
                  </th>
                  <th className="px-6 py-4 font-extrabold hidden lg:table-cell">
                    Courts
                  </th>
                  <th className="px-6 py-4 font-extrabold">Status</th>
                  <th className="px-6 py-4 font-extrabold hidden lg:table-cell">
                    Submitted
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-section-dark/6">
                {venues.map((venue: any) => (
                  <tr
                    key={venue.id}
                    onClick={() => setSelectedVenue(venue)}
                    className="hover:bg-section-dark/3 transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="size-9 rounded-xl bg-section-dark/8 flex items-center justify-center shrink-0 overflow-hidden">
                          {venue.image_url ? (
                            <img
                              src={venue.image_url}
                              alt={venue.name}
                              className="size-full object-cover"
                            />
                          ) : (
                            <Building2
                              size={15}
                              className="text-section-dark/40"
                            />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="text-[0.8rem] font-semibold text-text-dark truncate">
                            {venue.name}
                          </p>
                          <p className="text-[0.6rem] text-text-muted-dark/40">
                            {venue.type}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden sm:table-cell">
                      <p className="text-[0.8rem] text-text-dark/70">
                        {venue.profiles?.first_name}{" "}
                        {venue.profiles?.last_name}
                      </p>
                      <p className="text-[0.6rem] text-text-muted-dark/40">
                        {venue.email}
                      </p>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <div className="flex items-center gap-1.5">
                        <MapPin
                          size={12}
                          className="text-text-muted-dark/30 shrink-0"
                        />
                        <p className="text-[0.8rem] text-text-dark/70 truncate max-w-[160px]">
                          {venue.city}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden lg:table-cell">
                      <p className="text-[0.8rem] text-text-dark/70">
                        {venue.courts?.length ?? 0}
                      </p>
                    </td>
                    <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                      <StatusSelect
                        venueId={venue.id}
                        currentStatus={venue.status}
                        isPending={updatingVenueId === venue.id && statusMutation.isPending}
                        onStatusChange={handleStatusChange}
                      />
                    </td>
                    <td className="px-6 py-4 hidden lg:table-cell">
                      <p className="text-[0.75rem] text-text-muted-dark/50">
                        {new Date(venue.created_at).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.section>

      {/* Venue Detail Dialog */}
      <Dialog
        open={!!selectedVenue}
        onOpenChange={(open) => !open && setSelectedVenue(null)}
      >
        <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-y-auto bg-white">
          {selectedVenue && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <div className="size-12 rounded-xl bg-section-dark/8 flex items-center justify-center shrink-0 overflow-hidden">
                    {selectedVenue.image_url ? (
                      <img
                        src={selectedVenue.image_url}
                        alt={selectedVenue.name}
                        className="size-full object-cover"
                      />
                    ) : (
                      <Building2 size={20} className="text-section-dark/40" />
                    )}
                  </div>
                  <div>
                    <DialogTitle className="text-[1.1rem] font-bold text-text-dark">
                      {selectedVenue.name}
                    </DialogTitle>
                    <DialogDescription className="text-[0.75rem] text-text-muted-dark/50">
                      {selectedVenue.type} &middot; Submitted{" "}
                      {new Date(selectedVenue.created_at).toLocaleDateString(
                        "en-US",
                        { month: "long", day: "numeric", year: "numeric" }
                      )}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              {/* Venue Photos */}
              {selectedVenue.venue_photos?.length > 0 && (
                <div className="mt-2">
                  <p className="text-[0.65rem] font-bold uppercase tracking-wider text-text-muted-dark/40 mb-2">
                    Photos
                  </p>
                  <div className="grid grid-cols-4 gap-2">
                    {selectedVenue.venue_photos
                      .sort((a: any, b: any) => a.position - b.position)
                      .map((photo: any) => (
                        <div
                          key={photo.id}
                          className="aspect-video rounded-lg overflow-hidden bg-section-dark/5"
                        >
                          <img
                            src={photo.url}
                            alt="Venue photo"
                            className="size-full object-cover"
                          />
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div className="space-y-3">
                  <p className="text-[0.65rem] font-bold uppercase tracking-wider text-text-muted-dark/40">
                    Owner
                  </p>
                  <div>
                    <p className="text-[0.82rem] font-semibold text-text-dark">
                      {selectedVenue.profiles?.first_name}{" "}
                      {selectedVenue.profiles?.last_name}
                    </p>
                    {selectedVenue.email && (
                      <div className="flex items-center gap-1.5 mt-1">
                        <Mail size={11} className="text-text-muted-dark/30" />
                        <p className="text-[0.72rem] text-text-muted-dark/60">
                          {selectedVenue.email}
                        </p>
                      </div>
                    )}
                    {selectedVenue.phone && (
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <Phone size={11} className="text-text-muted-dark/30" />
                        <p className="text-[0.72rem] text-text-muted-dark/60">
                          {selectedVenue.phone}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-[0.65rem] font-bold uppercase tracking-wider text-text-muted-dark/40">
                    Location
                  </p>
                  <div>
                    <div className="flex items-start gap-1.5">
                      <MapPin
                        size={12}
                        className="text-text-muted-dark/30 mt-0.5 shrink-0"
                      />
                      <div>
                        <p className="text-[0.82rem] text-text-dark">
                          {selectedVenue.address}
                        </p>
                        <p className="text-[0.72rem] text-text-muted-dark/60">
                          {selectedVenue.city}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              {selectedVenue.description && (
                <div className="mt-2">
                  <p className="text-[0.65rem] font-bold uppercase tracking-wider text-text-muted-dark/40 mb-1.5">
                    Description
                  </p>
                  <p className="text-[0.8rem] text-text-dark/70 leading-relaxed">
                    {selectedVenue.description}
                  </p>
                </div>
              )}

              {/* Tags */}
              {selectedVenue.tags?.length > 0 && (
                <div className="mt-1">
                  <p className="text-[0.65rem] font-bold uppercase tracking-wider text-text-muted-dark/40 mb-1.5">
                    Tags
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedVenue.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-section-dark/5 text-[0.68rem] font-medium text-text-dark/70"
                      >
                        <Tag size={10} className="text-text-muted-dark/30" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Operating Hours */}
              {selectedVenue.operating_hours && (
                <div className="mt-2">
                  <p className="text-[0.65rem] font-bold uppercase tracking-wider text-text-muted-dark/40 mb-1.5">
                    Operating Hours
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1">
                    {Object.entries(selectedVenue.operating_hours).map(
                      ([day, schedule]: [string, any]) => (
                        <div
                          key={day}
                          className="flex items-center justify-between text-[0.72rem]"
                        >
                          <span className="font-medium text-text-dark/70">
                            {day.slice(0, 3)}
                          </span>
                          <span className="text-text-muted-dark/50">
                            {schedule.enabled
                              ? `${schedule.open} – ${schedule.close}`
                              : "Closed"}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* Courts */}
              <div className="mt-2">
                <p className="text-[0.65rem] font-bold uppercase tracking-wider text-text-muted-dark/40 mb-2">
                  Courts ({selectedVenue.courts?.length ?? 0})
                </p>
                {selectedVenue.courts?.length > 0 ? (
                  <div className="space-y-2">
                    {selectedVenue.courts.map((court: any) => (
                      <div
                        key={court.id}
                        className="flex items-center justify-between rounded-xl border border-section-dark/8 bg-section-dark/3 px-4 py-3"
                      >
                        <div className="min-w-0">
                          <p className="text-[0.8rem] font-semibold text-text-dark">
                            {court.name}
                          </p>
                          <div className="flex items-center gap-3 mt-0.5">
                            <span className="text-[0.65rem] text-text-muted-dark/50">
                              {court.sport_type}
                            </span>
                            {court.surface_type && (
                              <span className="text-[0.65rem] text-text-muted-dark/50">
                                {court.surface_type}
                              </span>
                            )}
                            <span className="text-[0.65rem] text-text-muted-dark/50">
                              {court.is_indoor ? "Indoor" : "Outdoor"}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <div className="flex items-center gap-1">
                            <DollarSign
                              size={12}
                              className="text-text-muted-dark/40"
                            />
                            <span className="text-[0.8rem] font-bold text-text-dark">
                              {court.price_per_hour}
                            </span>
                            <span className="text-[0.6rem] text-text-muted-dark/40">
                              /hr
                            </span>
                          </div>
                          <span
                            className={`text-[0.6rem] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                              court.is_active
                                ? "bg-emerald-50 text-emerald-600"
                                : "bg-red-50 text-red-500"
                            }`}
                          >
                            {court.is_active ? "Active" : "Inactive"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-[0.75rem] text-text-muted-dark/40 text-center py-6">
                    No courts added yet.
                  </p>
                )}
              </div>

              {/* Admin Notes */}
              {selectedVenue.admin_notes && (
                <div className="mt-2 rounded-xl border border-amber-200/60 bg-amber-50/50 p-4">
                  <p className="text-[0.65rem] font-bold uppercase tracking-wider text-amber-600/60 mb-1">
                    Admin Notes
                  </p>
                  <p className="text-[0.78rem] text-amber-800/70">
                    {selectedVenue.admin_notes}
                  </p>
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
