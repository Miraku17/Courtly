"use client";

import { useState, useRef, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMyVenue, updateMyVenue, uploadVenueLogo } from "@/lib/api/venues";
import { toast } from "sonner";
import { motion } from "framer-motion";
import {
  Save,
  Upload,
  MapPin,
  Phone,
  Mail,
  Clock,
  Loader2,
  Camera,
  X,
  Check,
} from "lucide-react";
import dynamic from "next/dynamic";
import { ConfirmModal } from "@/components/common/confirm-modal";

const MapPicker = dynamic(
  () => import("@/components/common/map-picker").then((mod) => mod.MapPicker),
  { ssr: false }
);

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] as const;

type DaySchedule = { enabled: boolean; open: string; close: string };
type OperatingHours = Record<string, DaySchedule>;

const fadeIn = (delay: number) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.4 },
});

export default function EditVenuePage() {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const [form, setForm] = useState({
    name: "",
    type: "",
    address: "",
    city: "",
    phone: "",
    email: "",
    description: "",
    lat: 10.3157,
    lng: 123.8854,
    operatingHours: {} as OperatingHours,
    tags: [] as string[],
    logoUrl: "",
  });

  const [tagInput, setTagInput] = useState("");

  const { data: venueData, isLoading } = useQuery({
    queryKey: ["my-venue"],
    queryFn: getMyVenue,
  });

  useEffect(() => {
    if (venueData?.venue) {
      const v = venueData.venue;
      setForm({
        name: v.name || "",
        type: v.type || "",
        address: v.address || "",
        city: v.city || "",
        phone: v.phone || "",
        email: v.email || "",
        description: v.description || "",
        lat: v.lat || 10.3157,
        lng: v.lng || 123.8854,
        operatingHours: v.operating_hours || {},
        tags: v.tags || [],
        logoUrl: v.image_url || "",
      });
    }
  }, [venueData]);

  const updateForm = (data: Partial<typeof form>) => setForm((prev) => ({ ...prev, ...data }));

  const handleLogoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
  };

  const addTag = (raw: string) => {
    const tag = raw.trim().toLowerCase().replace(/,+$/, "");
    if (tag && !form.tags.includes(tag)) {
      updateForm({ tags: [...form.tags, tag] });
    }
    setTagInput("");
  };

  const removeTag = (tag: string) => {
    updateForm({ tags: form.tags.filter((t) => t !== tag) });
  };

  const updateDaySchedule = (day: string, data: Partial<DaySchedule>) => {
    updateForm({
      operatingHours: {
        ...form.operatingHours,
        [day]: { ...form.operatingHours[day], ...data },
      },
    });
  };

  const saveMutation = useMutation({
    mutationFn: async () => {
      if (logoFile) {
        await uploadVenueLogo(logoFile);
      }
      await updateMyVenue({
        name: form.name,
        type: form.type,
        address: form.address,
        city: form.city,
        phone: form.phone || undefined,
        email: form.email || undefined,
        description: form.description || undefined,
        lat: form.lat,
        lng: form.lng,
        operatingHours: form.operatingHours,
        tags: form.tags.length > 0 ? form.tags : undefined,
      });
    },
    onSuccess: () => {
      toast.success("Venue updated successfully!");
      setLogoFile(null);
      setShowConfirm(false);
      queryClient.invalidateQueries({ queryKey: ["my-venue"] });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.error || error?.response?.data?.message || "Failed to update venue";
      toast.error(message);
    },
  });

  if (isLoading) {
    return (
      <div className="bg-bg-light min-h-screen -mx-4 sm:-mx-6 lg:-mx-8 -my-6 sm:-my-8 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="flex flex-col items-center gap-4">
            <Loader2 size={32} className="text-section-dark animate-spin" />
            <p className="text-text-muted-dark text-sm">Loading venue details...</p>
          </div>
        </div>
      </div>
    );
  }

  const currentLogo = logoPreview || form.logoUrl;

  return (
    <div className="bg-bg-light min-h-screen -mx-4 sm:-mx-6 lg:-mx-8 -my-6 sm:-my-8 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="space-y-6">
        {/* Header */}
        <motion.div {...fadeIn(0)} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-[1.6rem] sm:text-[2rem] font-extrabold text-text-dark tracking-tight">
              My Venue
            </h1>
            <p className="text-text-muted-dark text-[0.85rem] mt-0.5">
              Update your venue details, location, and operating hours.
            </p>
          </div>
          <button
            onClick={() => setShowConfirm(true)}
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
        </motion.div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Logo + Basic Info */}
            <motion.div {...fadeIn(0.05)} className="rounded-2xl border border-border-light bg-surface p-6 space-y-6 shadow-sm">
              <h2 className="text-[0.7rem] font-bold text-text-dark uppercase tracking-[0.15em]">
                Venue Identity
              </h2>

              {/* Logo */}
              <div className="flex items-center gap-5">
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="relative size-20 rounded-2xl border-2 border-dashed border-border-light hover:border-section-dark/30 transition-colors cursor-pointer overflow-hidden group flex items-center justify-center bg-bg-light flex-shrink-0"
                >
                  {currentLogo ? (
                    <>
                      <img src={currentLogo} alt="Venue logo" className="size-full object-cover" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Camera size={18} className="text-white" />
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center gap-1 text-muted-light">
                      <Upload size={18} />
                      <span className="text-[0.55rem] font-bold uppercase tracking-wider">Logo</span>
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleLogoSelect}
                  className="hidden"
                />
                <div className="space-y-1 min-w-0">
                  <p className="text-[0.8rem] font-medium text-text-dark/80 truncate">
                    {logoFile ? logoFile.name : "Upload venue logo"}
                  </p>
                  <p className="text-[0.68rem] text-muted-light">JPG, PNG or WebP. Max 800KB.</p>
                  {logoFile && (
                    <button
                      onClick={() => { setLogoFile(null); setLogoPreview(null); }}
                      className="text-[0.68rem] text-red-400 hover:text-red-300 transition-colors flex items-center gap-1"
                    >
                      <X size={11} /> Remove
                    </button>
                  )}
                </div>
              </div>

              {/* Venue Name */}
              <div className="space-y-2">
                <label className="text-[0.72rem] font-bold uppercase tracking-widest text-muted-light ml-1">
                  Venue Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => updateForm({ name: e.target.value })}
                  className="w-full bg-surface border border-border-light rounded-xl px-5 py-3.5 text-[0.95rem] text-text-dark outline-none focus:border-section-dark/30 focus:bg-surface transition-all"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <div className="flex items-center justify-between ml-1 mr-1">
                  <label className="text-[0.72rem] font-bold uppercase tracking-widest text-muted-light">
                    Description
                  </label>
                  <span className="text-[0.65rem] text-muted-light">{form.description.length} / 280</span>
                </div>
                <textarea
                  value={form.description}
                  onChange={(e) => updateForm({ description: e.target.value.slice(0, 280) })}
                  placeholder="Tell players about your venue..."
                  className="w-full bg-surface border border-border-light rounded-xl px-5 py-3.5 text-[0.95rem] text-text-dark outline-none focus:border-section-dark/30 focus:bg-surface transition-all min-h-[100px] resize-none leading-relaxed placeholder:text-muted-light"
                />
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <div className="flex items-center justify-between ml-1 mr-1">
                  <label className="text-[0.72rem] font-bold uppercase tracking-widest text-muted-light">
                    Tags
                  </label>
                  <span className="text-[0.65rem] text-muted-light">Enter or comma to add</span>
                </div>
                <div className="w-full bg-surface border border-border-light rounded-xl px-4 py-3 transition-all flex flex-wrap gap-2 focus-within:border-section-dark/30 focus-within:bg-surface">
                  {form.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-section-dark/10 border border-section-dark/20 text-section-dark text-[0.75rem] font-bold rounded-lg"
                    >
                      {tag}
                      <button type="button" onClick={() => removeTag(tag)} className="text-section-dark/50 hover:text-section-dark transition-colors leading-none">
                        x
                      </button>
                    </span>
                  ))}
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => {
                      if (e.target.value.endsWith(",")) { addTag(e.target.value); } else { setTagInput(e.target.value); }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") { e.preventDefault(); addTag(tagInput); }
                      if (e.key === "Backspace" && tagInput === "" && form.tags.length > 0) { removeTag(form.tags[form.tags.length - 1]); }
                    }}
                    placeholder={form.tags.length === 0 ? "e.g. parking, floodlights..." : ""}
                    className="flex-1 min-w-[120px] bg-transparent text-[0.9rem] text-text-dark outline-none placeholder:text-muted-light py-1"
                  />
                </div>
              </div>
            </motion.div>

            {/* Operating Hours */}
            <motion.div {...fadeIn(0.15)} className="rounded-2xl border border-border-light bg-surface p-6 space-y-5 shadow-sm">
              <h2 className="text-[0.7rem] font-bold text-text-dark uppercase tracking-[0.15em] flex items-center gap-2">
                <Clock size={13} className="text-muted-light" />
                Operating Hours
              </h2>

              <div className="space-y-2">
                {DAYS.map((day) => {
                  const schedule = form.operatingHours[day] || { enabled: true, open: "08:00", close: "22:00" };
                  return (
                    <div
                      key={day}
                      className={`flex items-center gap-3 rounded-xl border p-3 transition-all ${
                        schedule.enabled
                          ? "bg-surface border-border-light"
                          : "bg-bg-light border-border-light opacity-40"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => updateDaySchedule(day, { enabled: !schedule.enabled })}
                        className={`flex-shrink-0 w-10 h-6 rounded-full transition-all relative ${
                          schedule.enabled ? "bg-section-dark" : "bg-surface-hover"
                        }`}
                      >
                        <div
                          className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${
                            schedule.enabled ? "left-5" : "left-1"
                          }`}
                        />
                      </button>
                      <span className="text-[0.85rem] font-bold w-[72px] flex-shrink-0 text-text-dark">
                        {day.slice(0, 3)}
                      </span>
                      {schedule.enabled ? (
                        <div className="flex items-center gap-2 flex-1">
                          <input
                            type="time"
                            value={schedule.open}
                            onChange={(e) => updateDaySchedule(day, { open: e.target.value })}
                            className="bg-surface border border-border-light rounded-lg px-3 py-1.5 text-[0.85rem] text-text-dark outline-none focus:border-section-dark/30 transition-all w-[135px]"
                          />
                          <span className="text-muted-light text-[0.8rem]">to</span>
                          <input
                            type="time"
                            value={schedule.close}
                            onChange={(e) => updateDaySchedule(day, { close: e.target.value })}
                            className="bg-surface border border-border-light rounded-lg px-3 py-1.5 text-[0.85rem] text-text-dark outline-none focus:border-section-dark/30 transition-all w-[135px]"
                          />
                        </div>
                      ) : (
                        <span className="text-[0.8rem] text-muted-light italic">Closed</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Location & Contact */}
            <motion.div {...fadeIn(0.1)} className="rounded-2xl border border-border-light bg-surface p-6 space-y-5 shadow-sm">
              <h2 className="text-[0.7rem] font-bold text-text-dark uppercase tracking-[0.15em]">
                Location & Contact
              </h2>

              <div className="space-y-2">
                <label className="text-[0.72rem] font-bold uppercase tracking-widest text-muted-light ml-1">
                  Street Address <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-light" size={16} />
                  <input
                    type="text"
                    value={form.address}
                    onChange={(e) => updateForm({ address: e.target.value })}
                    className="w-full bg-surface border border-border-light rounded-xl pl-11 pr-5 py-3.5 text-[0.95rem] text-text-dark outline-none focus:border-section-dark/30 focus:bg-surface transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[0.72rem] font-bold uppercase tracking-widest text-muted-light ml-1">
                    City <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.city}
                    onChange={(e) => updateForm({ city: e.target.value })}
                    className="w-full bg-surface border border-border-light rounded-xl px-5 py-3.5 text-[0.95rem] text-text-dark outline-none focus:border-section-dark/30 focus:bg-surface transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[0.72rem] font-bold uppercase tracking-widest text-muted-light ml-1">
                    Phone
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-light" size={14} />
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => updateForm({ phone: e.target.value })}
                      placeholder="+63 912 345 6789"
                      className="w-full bg-surface border border-border-light rounded-xl pl-11 pr-5 py-3.5 text-[0.95rem] text-text-dark outline-none focus:border-section-dark/30 focus:bg-surface transition-all placeholder:text-muted-light"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[0.72rem] font-bold uppercase tracking-widest text-muted-light ml-1">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-light" size={14} />
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => updateForm({ email: e.target.value })}
                    placeholder="venue@example.com"
                    className="w-full bg-surface border border-border-light rounded-xl pl-11 pr-5 py-3.5 text-[0.95rem] text-text-dark outline-none focus:border-section-dark/30 focus:bg-surface transition-all placeholder:text-muted-light"
                  />
                </div>
              </div>
            </motion.div>

            {/* Map */}
            <motion.div {...fadeIn(0.2)} className="rounded-2xl border border-border-light bg-surface p-6 space-y-4 shadow-sm">
              <h2 className="text-[0.7rem] font-bold text-text-dark uppercase tracking-[0.15em]">
                Pin Location
              </h2>
              <div className="h-[320px] rounded-xl overflow-hidden border border-border-light">
                <MapPicker
                  lat={form.lat}
                  lng={form.lng}
                  onLocationChange={(lat, lng) => updateForm({ lat, lng })}
                />
              </div>
              <p className="text-[0.68rem] text-muted-light ml-1 flex items-center gap-1.5">
                <MapPin size={11} className="text-section-dark/50" />
                {form.lat.toFixed(4)}, {form.lng.toFixed(4)}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Bottom Save Bar */}
        <motion.div {...fadeIn(0.25)} className="flex justify-end pb-8">
          <button
            onClick={() => setShowConfirm(true)}
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
        </motion.div>
      </div>

      <ConfirmModal
        open={showConfirm}
        onOpenChange={setShowConfirm}
        title="Save Changes"
        description="Are you sure you want to save the changes to your venue? This will update the live listing immediately."
        confirmLabel="Save Changes"
        isPending={saveMutation.isPending}
        onConfirm={() => saveMutation.mutate()}
      />
    </div>
  );
}
