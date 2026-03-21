"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMyCourts, createCourt, updateCourt, deleteCourt } from "@/lib/api/courts";
import { getMyVenue } from "@/lib/api/venues";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Trash2,
  Loader2,
  Check,
  Save,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Court = {
  id?: string;
  name: string;
  sportType: string;
  surfaceType: string;
  pricePerHour: string;
  isIndoor: boolean;
  isActive: boolean;
  isNew?: boolean;
  isEditing?: boolean;
};

const SURFACE_TYPES = ["Hard Court", "Clay", "Grass", "Artificial Turf", "Wood", "Concrete"];

const fadeIn = (delay: number) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.4 },
});

export default function CourtsPage() {
  const queryClient = useQueryClient();
  const [courts, setCourts] = useState<Court[]>([]);
  const [courtsToDelete, setCourtsToDelete] = useState<string[]>([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);

  const { data: venueData } = useQuery({
    queryKey: ["my-venue"],
    queryFn: getMyVenue,
  });

  const { data: courtsData, isLoading } = useQuery({
    queryKey: ["my-courts"],
    queryFn: getMyCourts,
  });

  const venueType = venueData?.venue?.type || "Tennis";

  useEffect(() => {
    if (courtsData?.courts) {
      setCourts(
        courtsData.courts.map((c: {
          id: string;
          name: string;
          sport_type: string;
          surface_type: string;
          price_per_hour: number;
          is_indoor: boolean;
          is_active: boolean;
        }) => ({
          id: c.id,
          name: c.name,
          sportType: c.sport_type || venueType,
          surfaceType: c.surface_type || "Hard Court",
          pricePerHour: String(c.price_per_hour),
          isIndoor: c.is_indoor ?? false,
          isActive: c.is_active ?? true,
        }))
      );
    }
  }, [courtsData, venueType]);

  const addCourt = () => {
    if (courts.length >= 15) return;
    setCourts((prev) => [
      ...prev,
      {
        name: `Court ${prev.length + 1}`,
        sportType: venueType,
        surfaceType: "Hard Court",
        pricePerHour: "",
        isIndoor: false,
        isActive: true,
        isNew: true,
        isEditing: true,
      },
    ]);
  };

  const removeCourt = (index: number) => {
    const court = courts[index];
    if (court.id) {
      setCourtsToDelete((prev) => [...prev, court.id!]);
    }
    setCourts((prev) => prev.filter((_, i) => i !== index));
    setShowDeleteConfirm(null);
  };

  const updateCourtField = (index: number, data: Partial<Court>) => {
    setCourts((prev) => prev.map((c, i) => (i === index ? { ...c, ...data } : c)));
  };

  const saveMutation = useMutation({
    mutationFn: async () => {
      for (const id of courtsToDelete) {
        await deleteCourt(id);
      }
      for (const court of courts) {
        if (court.isNew) {
          await createCourt({
            name: court.name,
            sportType: court.sportType,
            surfaceType: court.surfaceType,
            pricePerHour: parseFloat(court.pricePerHour) || 0,
            isIndoor: court.isIndoor,
          });
        } else if (court.id) {
          await updateCourt(court.id, {
            name: court.name,
            sportType: court.sportType,
            surfaceType: court.surfaceType,
            pricePerHour: parseFloat(court.pricePerHour) || 0,
            isIndoor: court.isIndoor,
            isActive: court.isActive,
          });
        }
      }
    },
    onSuccess: () => {
      toast.success("Courts updated successfully!");
      setCourtsToDelete([]);
      queryClient.invalidateQueries({ queryKey: ["my-courts"] });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.error || error?.response?.data?.message || "Failed to update courts";
      toast.error(message);
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 size={32} className="text-section-dark animate-spin" />
          <p className="text-section-dark/50 text-sm">Loading courts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div {...fadeIn(0)} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-[1.6rem] sm:text-[2rem] font-extrabold text-section-dark tracking-tight">
            Courts
          </h1>
          <p className="text-section-dark/50 text-[0.85rem] mt-0.5">
            Manage your courts, pricing, and availability.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {courts.length < 15 && (
            <button
              onClick={addCourt}
              className="flex items-center gap-2 rounded-xl border border-section-dark/10 bg-white/60 px-5 py-2.5 text-[0.8rem] font-bold uppercase tracking-wider text-section-dark/70 transition-all hover:bg-white hover:border-section-dark/15 active:scale-[0.97]"
            >
              <Plus size={16} strokeWidth={2.5} />
              Add Court
            </button>
          )}
          <button
            onClick={() => saveMutation.mutate()}
            disabled={saveMutation.isPending}
            className="flex items-center gap-2 rounded-xl bg-section-dark px-6 py-2.5 text-[0.8rem] font-bold uppercase tracking-wider text-white transition-all hover:bg-section-dark/90 active:scale-[0.97] shrink-0 shadow-lg shadow-section-dark/15 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saveMutation.isPending ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save size={16} strokeWidth={2.5} />
                Save Changes
              </>
            )}
          </button>
        </div>
      </motion.div>

      {/* Stats Bar */}
      <motion.div {...fadeIn(0.05)} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-xl border border-section-dark/10 bg-white/70 p-4">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.15em] text-section-dark/40">Total Courts</p>
          <p className="text-2xl font-extrabold text-section-dark mt-1">{courts.length}</p>
        </div>
        <div className="rounded-xl border border-section-dark/10 bg-white/70 p-4">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.15em] text-section-dark/40">Active</p>
          <p className="text-2xl font-extrabold text-emerald-600 mt-1">{courts.filter((c) => c.isActive).length}</p>
        </div>
        <div className="rounded-xl border border-section-dark/10 bg-white/70 p-4">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.15em] text-section-dark/40">Indoor</p>
          <p className="text-2xl font-extrabold text-section-dark mt-1">{courts.filter((c) => c.isIndoor).length}</p>
        </div>
        <div className="rounded-xl border border-section-dark/10 bg-white/70 p-4">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.15em] text-section-dark/40">Avg Price</p>
          <p className="text-2xl font-extrabold text-section-dark mt-1">
            ₱{courts.length > 0
              ? Math.round(courts.reduce((sum, c) => sum + (parseFloat(c.pricePerHour) || 0), 0) / courts.length)
              : 0}
          </p>
        </div>
      </motion.div>

      {/* Courts Grid */}
      <motion.div {...fadeIn(0.1)} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {courts.map((court, index) => (
            <motion.div
              key={court.id || `new-${index}`}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "rounded-2xl border p-5 space-y-4 transition-colors",
                court.isActive
                  ? "border-section-dark/10 bg-white/70"
                  : "border-section-dark/6 bg-white/40 opacity-60",
                court.isNew && "border-section-dark/20 bg-section-dark/[0.06]"
              )}
            >
              {/* Court Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5 min-w-0">
                  {court.isNew && (
                    <span className="text-[0.55rem] font-bold text-section-dark bg-section-dark/10 border border-section-dark/20 px-1.5 py-0.5 rounded uppercase tracking-wider flex-shrink-0">
                      New
                    </span>
                  )}
                  <div className="min-w-0">
                    <input
                      type="text"
                      value={court.name}
                      onChange={(e) => updateCourtField(index, { name: e.target.value })}
                      className="bg-transparent text-[1rem] font-bold text-section-dark outline-none w-full placeholder:text-section-dark/30"
                      placeholder="Court name"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  {showDeleteConfirm === index ? (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => removeCourt(index)}
                        className="p-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                        title="Confirm delete"
                      >
                        <Check size={14} />
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(null)}
                        className="p-1.5 rounded-lg bg-section-dark/5 text-section-dark/40 hover:bg-section-dark/10 transition-colors"
                        title="Cancel"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setShowDeleteConfirm(index)}
                      className="p-1.5 rounded-lg text-section-dark/20 hover:text-red-500 hover:bg-red-50 transition-colors"
                      title="Delete court"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <label className="text-[0.65rem] font-bold uppercase tracking-widest text-section-dark/40">
                  Hourly Rate (PHP) <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-section-dark/40 font-bold text-[0.85rem]">₱</span>
                  <input
                    type="number"
                    value={court.pricePerHour}
                    onChange={(e) => updateCourtField(index, { pricePerHour: e.target.value })}
                    placeholder="0"
                    min="1"
                    className="w-full bg-white/80 border border-section-dark/15 rounded-xl pl-8 pr-12 py-3 text-[0.95rem] font-bold text-section-dark outline-none focus:border-section-dark/30 focus:bg-white transition-all"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-section-dark/30 text-[0.75rem]">/hr</span>
                </div>
              </div>

              {/* Surface Type */}
              <div className="space-y-2">
                <label className="text-[0.65rem] font-bold uppercase tracking-widest text-section-dark/40">
                  Surface Type
                </label>
                <Select
                  value={court.surfaceType}
                  onValueChange={(v) => updateCourtField(index, { surfaceType: v })}
                >
                  <SelectTrigger className="w-full h-[46px] bg-white/80 border border-section-dark/15 rounded-xl px-4 text-[0.85rem] text-section-dark focus:ring-0 focus:border-section-dark/30 transition-all">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-surface border border-border-light rounded-xl shadow-lg">
                    {SURFACE_TYPES.map((type) => (
                      <SelectItem
                        key={type}
                        value={type}
                        className="text-[0.85rem] text-section-dark focus:bg-section-dark/5 focus:text-section-dark cursor-pointer rounded-lg"
                      >
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Indoor/Outdoor Toggle */}
              <div className="flex items-center justify-between rounded-xl bg-white/60 border border-section-dark/10 p-3">
                <span className="text-[0.8rem] text-section-dark/60 font-medium">
                  {court.isIndoor ? "Indoor" : "Outdoor"}
                </span>
                <button
                  type="button"
                  onClick={() => updateCourtField(index, { isIndoor: !court.isIndoor })}
                  className={`flex-shrink-0 w-10 h-6 rounded-full transition-all relative ${
                    court.isIndoor ? "bg-section-dark" : "bg-section-dark/15"
                  }`}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${
                      court.isIndoor ? "left-5" : "left-1"
                    }`}
                  />
                </button>
              </div>

              {/* Active/Inactive Toggle */}
              <div
                className={cn(
                  "flex items-center justify-between rounded-xl border p-3 transition-all",
                  court.isActive
                    ? "bg-emerald-50 border-emerald-200/60"
                    : "bg-red-50 border-red-200/60"
                )}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      "size-2 rounded-full",
                      court.isActive ? "bg-emerald-500" : "bg-red-500"
                    )}
                  />
                  <span
                    className={cn(
                      "text-[0.8rem] font-medium",
                      court.isActive ? "text-emerald-600" : "text-red-600"
                    )}
                  >
                    {court.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => updateCourtField(index, { isActive: !court.isActive })}
                  className={`flex-shrink-0 w-10 h-6 rounded-full transition-all relative ${
                    court.isActive ? "bg-emerald-500" : "bg-red-400"
                  }`}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${
                      court.isActive ? "left-5" : "left-1"
                    }`}
                  />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Empty Add Court Card */}
        {courts.length < 15 && (
          <motion.button
            {...fadeIn(0.15)}
            onClick={addCourt}
            className="rounded-2xl border-2 border-dashed border-section-dark/10 hover:border-section-dark/20 p-8 flex flex-col items-center justify-center gap-3 transition-all group min-h-[200px]"
          >
            <div className="size-12 rounded-2xl bg-section-dark/5 group-hover:bg-section-dark/10 flex items-center justify-center transition-colors">
              <Plus size={22} className="text-section-dark/30 group-hover:text-section-dark transition-colors" />
            </div>
            <span className="text-[0.8rem] font-bold text-section-dark/30 group-hover:text-section-dark/60 transition-colors uppercase tracking-wider">
              Add Court
            </span>
          </motion.button>
        )}
      </motion.div>

      {/* Pending Deletions Warning */}
      {courtsToDelete.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-amber-200 bg-amber-50 px-5 py-3 flex items-center gap-3"
        >
          <Trash2 size={14} className="text-amber-600 flex-shrink-0" />
          <p className="text-[0.8rem] text-amber-700">
            {courtsToDelete.length} court{courtsToDelete.length > 1 ? "s" : ""} will be permanently removed when you save.
          </p>
        </motion.div>
      )}

      {/* Bottom Save Bar */}
      <div className="flex justify-end pb-8">
        <button
          onClick={() => saveMutation.mutate()}
          disabled={saveMutation.isPending}
          className="flex items-center gap-2 rounded-xl bg-section-dark px-8 py-3 text-[0.85rem] font-bold uppercase tracking-wider text-white transition-all hover:bg-section-dark/90 active:scale-[0.97] shadow-lg shadow-section-dark/15 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saveMutation.isPending ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Check size={16} strokeWidth={3} />
              Save All Changes
            </>
          )}
        </button>
      </div>
    </div>
  );
}
