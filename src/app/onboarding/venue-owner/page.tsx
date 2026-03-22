"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, Check, MapPin, Phone, Mail, LocateFixed, Loader2, Plus, Trash2, Clock, Camera, X, QrCode } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createVenue, uploadVenueLogo, uploadVenueQRPayment } from "@/lib/api/venues";
import { createCourt } from "@/lib/api/courts";
import dynamic from "next/dynamic";

const MapPicker = dynamic(
  () => import("@/components/common/map-picker").then((mod) => mod.MapPicker),
  { ssr: false }
);

type Step = 1 | 2 | 3 | 4;

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] as const;
type DaySchedule = { enabled: boolean; open: string; close: string };
type OperatingHours = Record<string, DaySchedule>;

const DEFAULT_HOURS: OperatingHours = Object.fromEntries(
  DAYS.map((day) => [day, { enabled: day !== "Sunday", open: "08:00", close: "22:00" }])
);

const STEP_LABELS = ["Identity", "Location", "Details", "Review"];
const STEP_SUBTITLES = [
  "Name & sport type",
  "Address & contact",
  "Courts & pricing",
  "Final review",
];

const VENUE_TYPES = [
  { label: "Tennis", icon: "🎾" },
  { label: "Padel", icon: "🏸" },
  { label: "Pickleball", icon: "🏓" },
  { label: "Basketball", icon: "🏀" },
  { label: "Multisport", icon: "⚡" },
];

function StepContextPanel({ step, formData }: { step: Step; formData: { venueName: string; venueType: string } }) {
  const venueIcon = VENUE_TYPES.find((v) => v.label === formData.venueType)?.icon ?? "🎾";
  const displayName = formData.venueName.trim() || "Your Venue Name";

  const Tip = ({ text }: { text: string }) => (
    <div className="flex items-start gap-2.5">
      <div className="w-4 h-4 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0 mt-0.5">
        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
      </div>
      <p className="text-[0.78rem] text-white/60 leading-snug">{text}</p>
    </div>
  );

  const SectionLabel = ({ children }: { children: React.ReactNode }) => (
    <p className="text-[0.72rem] font-bold uppercase tracking-widest text-primary/70 mb-3">
      {children}
    </p>
  );

  if (step === 1) {
    return (
      <div className="space-y-6">
        <div>
          <SectionLabel>Player preview</SectionLabel>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3 shadow-xl backdrop-blur-sm">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center text-[1.1rem] flex-shrink-0">
                {venueIcon}
              </div>
              <div className="min-w-0">
                <p className={`font-bold text-[0.95rem] leading-tight transition-colors ${formData.venueName ? "text-white" : "text-white/40 italic"}`}>
                  {displayName}
                </p>
                <p className="text-[0.75rem] text-white/50 mt-0.5">{formData.venueType} · Open now</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 pl-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <svg key={i} width="10" height="10" viewBox="0 0 24 24" fill={i <= 4 ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" className="text-primary">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
              <span className="text-[0.68rem] text-white/40 ml-0.5">4.8 · 124 reviews</span>
            </div>
          </div>
          <p className="text-[0.72rem] text-white/40 mt-2 ml-1">
            This is how your venue appears in search results.
          </p>
        </div>
        <div className="space-y-4">
          <SectionLabel>Tips</SectionLabel>
          <Tip text="Use your full, official venue name" />
          <Tip text="Avoid abbreviations players won't recognize" />
          <Tip text="Pick the sport type that best fits your courts" />
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="space-y-2">
        <div>
          <SectionLabel>How you appear to nearby players</SectionLabel>
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden divide-y divide-white/5 shadow-xl backdrop-blur-sm">
            {[
              { name: "City Sports Center", dist: "1.2 km", faded: true },
              { name: displayName, dist: "—", highlight: true, icon: venueIcon },
              { name: "Westside Courts", dist: "3.8 km", faded: true },
            ].map((row) => (
              <div
                key={row.name}
                className={`flex items-center gap-3 px-4 py-3 transition-colors ${row.highlight ? "bg-primary/10" : ""}`}
              >
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-[0.85rem] flex-shrink-0 ${row.highlight ? "bg-primary/20 border border-primary/30" : "bg-white/5"}`}>
                  {row.icon ?? "🏟️"}
                </div>
                <p className={`flex-1 text-[0.8rem] font-bold truncate ${row.highlight ? "text-white" : "text-white/40"}`}>
                  {row.name}
                </p>
                <p className={`text-[0.72rem] flex-shrink-0 ${row.highlight ? "text-primary font-bold" : "text-white/40"}`}>
                  {row.dist}
                </p>
              </div>
            ))}
          </div>
          <p className="text-[0.72rem] text-white/40 mt-2 ml-1">
            Accurate address improves your placement.
          </p>
        </div>

        <div className="space-y-4 pt-4">
          <SectionLabel>Tips</SectionLabel>
          <Tip text="Include unit or floor number if applicable" />
          <Tip text="Double-check the city — it affects search filters" />
          <Tip text="A phone number builds trust with first-time bookers" />
        </div>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="space-y-6">
        <div>
          <SectionLabel>Market rates near you</SectionLabel>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3 shadow-xl backdrop-blur-sm">
            {[
              { label: "Budget", range: "₱300–500/hr", width: "45%" },
              { label: "Mid-range", range: "₱500–800/hr", width: "70%", highlight: true },
              { label: "Premium", range: "₱800–1,500/hr", width: "30%" },
            ].map((tier) => (
              <div key={tier.label} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className={`text-[0.72rem] font-bold ${tier.highlight ? "text-primary" : "text-white/40"}`}>
                    {tier.label}
                  </span>
                  <span className={`text-[0.72rem] ${tier.highlight ? "text-white/70" : "text-white/40"}`}>
                    {tier.range}
                  </span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${tier.highlight ? "bg-primary" : "bg-white/10"}`}
                    style={{ width: tier.width }}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="text-[0.72rem] text-white/40 mt-2 ml-1">
            Most booked venues fall in the mid-range tier.
          </p>
        </div>

        <div className="space-y-4">
          <SectionLabel>What players look for</SectionLabel>
          {[
            { icon: "💡", text: "Clear description of facilities and rules" },
            { icon: "🏅", text: "Court surface type (hard, clay, artificial)" },
            { icon: "🚗", text: "Parking and public transport access" },
          ].map((item) => (
            <div key={item.text} className="flex items-start gap-2.5">
              <span className="text-[0.9rem] flex-shrink-0 mt-0.5">{item.icon}</span>
              <p className="text-[0.78rem] text-white/60 leading-snug">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (step === 4) {
    return (
      <div className="space-y-6">
        <div>
          <SectionLabel>After you launch</SectionLabel>
          <div className="space-y-3">
            {[
              { icon: "🔍", title: "Go live in search", desc: "Your venue appears to players searching in your area." },
              { icon: "📅", title: "Receive booking requests", desc: "Players can request slots — you approve or adjust." },
              { icon: "📊", title: "Track performance", desc: "Monitor views, bookings, and revenue from your dashboard." },
            ].map((item, i) => (
              <div key={item.title} className="flex gap-3">
                <div className="flex flex-col items-center gap-1 flex-shrink-0">
                  <div className="w-8 h-8 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center text-[0.9rem]">
                    {item.icon}
                  </div>
                  {i < 2 && <div className="w-px flex-1 bg-white/10" />}
                </div>
                <div className="pb-3">
                  <p className="text-[0.82rem] font-bold text-white/90">{item.title}</p>
                  <p className="text-[0.75rem] text-white/40 mt-0.5 leading-snug">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0">
            <Check size={16} className="text-primary" strokeWidth={3} />
          </div>
          <div>
            <p className="text-[0.82rem] font-bold text-white/90">Free forever for venue owners</p>
            <p className="text-[0.72rem] text-white/40 mt-0.5">No listing fees. No hidden charges.</p>
          </div>
        </div>
      </div>
    );
  }

  return <div />;
}

export default function VenueOwnerOnboarding() {
  const [step, setStep] = useState<Step>(1);
  const [formData, setFormData] = useState({
    venueName: "",
    venueType: "Tennis",
    address: "",
    city: "",
    phone: "",
    email: "",
    description: "",
    courts: [{ name: "Court 1", pricePerHour: "" }] as { name: string; pricePerHour: string }[],
    operatingHours: DEFAULT_HOURS as OperatingHours,
    tags: [] as string[],
    lat: 10.3157,
    lng: 123.8854,
    venueRules: [] as string[],
    safetyHealth: [] as string[],
    cancellationPolicy: "",
  });
  const [locatingUser, setLocatingUser] = useState(false);
  const [ruleInput, setRuleInput] = useState("");
  const [safetyInput, setSafetyInput] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  const handleLogoSelect = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5MB.");
      return;
    }
    setLogoFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setLogoPreview(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const removeLogo = () => {
    setLogoFile(null);
    setLogoPreview(null);
    if (logoInputRef.current) logoInputRef.current.value = "";
  };

  const [qrFiles, setQrFiles] = useState<File[]>([]);
  const [qrPreviews, setQrPreviews] = useState<string[]>([]);
  const qrInputRef = useRef<HTMLInputElement>(null);

  const handleQrSelect = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5MB.");
      return;
    }
    if (qrFiles.length >= 5) {
      toast.error("Maximum 5 QR codes allowed.");
      return;
    }
    setQrFiles((prev) => [...prev, file]);
    setErrors((prev) => { const next = { ...prev }; delete next.qrPayment; return next; });
    const reader = new FileReader();
    reader.onload = (e) => setQrPreviews((prev) => [...prev, e.target?.result as string]);
    reader.readAsDataURL(file);
  };

  const removeQr = (index: number) => {
    setQrFiles((prev) => prev.filter((_, i) => i !== index));
    setQrPreviews((prev) => prev.filter((_, i) => i !== index));
    if (qrInputRef.current) qrInputRef.current.value = "";
  };

  const validateStep = (s: Step): boolean => {
    const newErrors: Record<string, string> = {};

    if (s === 1) {
      if (!formData.venueName.trim()) newErrors.venueName = "Venue name is required";
    }

    if (s === 2) {
      if (!formData.address.trim()) newErrors.address = "Street address is required";
      if (!formData.city.trim()) newErrors.city = "City is required";
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
      if (!formData.email.trim()) newErrors.email = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Enter a valid email";
    }

    if (s === 3) {
      formData.courts.forEach((court, i) => {
        if (!court.name.trim()) newErrors[`court_name_${i}`] = "Court name is required";
        if (!court.pricePerHour || parseFloat(court.pricePerHour) <= 0) newErrors[`court_price_${i}`] = "Price is required";
      });
      if (qrFiles.length === 0) newErrors.qrPayment = "At least one payment QR code is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [tagInput, setTagInput] = useState("");

  const addTag = (raw: string) => {
    const tag = raw.trim().toLowerCase().replace(/,+$/, "");
    if (tag && !formData.tags.includes(tag)) {
      updateFormData({ tags: [...formData.tags, tag] });
    }
    setTagInput("");
  };

  const removeTag = (tag: string) => {
    updateFormData({ tags: formData.tags.filter((t) => t !== tag) });
  };

  const addCourt = () => {
    if (formData.courts.length >= 15) return;
    const nextNum = formData.courts.length + 1;
    updateFormData({ courts: [...formData.courts, { name: `Court ${nextNum}`, pricePerHour: "" }] });
  };

  const removeCourt = (index: number) => {
    if (formData.courts.length <= 1) return;
    updateFormData({ courts: formData.courts.filter((_, i) => i !== index) });
  };

  const updateCourt = (index: number, data: Partial<{ name: string; pricePerHour: string }>) => {
    const updated = formData.courts.map((c, i) => (i === index ? { ...c, ...data } : c));
    updateFormData({ courts: updated });
  };

  const updateDaySchedule = (day: string, data: Partial<DaySchedule>) => {
    updateFormData({
      operatingHours: {
        ...formData.operatingHours,
        [day]: { ...formData.operatingHours[day], ...data },
      },
    });
  };

  const router = useRouter();

  const nextStep = () => {
    if (!validateStep(step)) return;
    setStep((prev) => (prev < 4 ? ((prev + 1) as Step) : prev));
  };
  const prevStep = () => {
    setErrors({});
    setStep((prev) => (prev > 1 ? ((prev - 1) as Step) : prev));
  };

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
    const keys = Object.keys(data);
    if (keys.length > 0) {
      setErrors((prev) => {
        const next = { ...prev };
        keys.forEach((k) => delete next[k]);
        return next;
      });
    }
  };

  const mutation = useMutation({
    mutationFn: async () => {
      const venue = await createVenue({
        name: formData.venueName,
        type: formData.venueType,
        address: formData.address,
        city: formData.city,
        phone: formData.phone,
        email: formData.email,
        description: formData.description || undefined,
        lat: formData.lat,
        lng: formData.lng,
        operatingHours: formData.operatingHours,
        tags: formData.tags.length > 0 ? formData.tags : undefined,
        venueRules: formData.venueRules.length > 0 ? formData.venueRules : undefined,
        safetyHealth: formData.safetyHealth.length > 0 ? formData.safetyHealth : undefined,
        cancellationPolicy: formData.cancellationPolicy || undefined,
      });

      for (const court of formData.courts) {
        await createCourt({
          name: court.name,
          sportType: formData.venueType,
          pricePerHour: parseFloat(court.pricePerHour) || 0,
        });
      }

      if (logoFile) {
        await uploadVenueLogo(logoFile);
      }

      for (const qr of qrFiles) {
        await uploadVenueQRPayment(qr);
      }

      return venue;
    },
    onSuccess: () => {
      toast.success("Venue created successfully!");
      setTimeout(() => router.push("/venue-owner"), 1000);
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.error || error?.response?.data?.message || "Something went wrong. Please try again.";
      toast.error(message);
    },
  });

  const progress = (step / 4) * 100;

  return (
    <div className="h-svh text-white flex flex-col font-clash overflow-hidden" style={{ backgroundColor: "#102b0f" }}>
      {/* ── Mobile Header ── */}
      <header className="md:hidden px-6 py-5 flex items-center justify-between border-b border-white/10">
        <Link
          href="/"
          className="flex items-center gap-2 text-[1.2rem] uppercase font-bold tracking-tighter"
        >
          <Image src="/logo_final.png" alt="Courtify" width={40} height={40} className="size-10 rounded-full object-cover" />
          <span className="font-panchang text-white">COURTIFY</span>
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-[0.8rem] font-bold text-white/40 uppercase tracking-wider">
            Step {step} / 4
          </span>
          <button className="text-[0.8rem] font-bold text-white/60 hover:text-white transition-colors">
            Save
          </button>
        </div>
      </header>

      {/* Mobile Progress Bar */}
      <div className="md:hidden w-full h-[2px] bg-white/5">
        <motion.div
          className="h-full bg-primary"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>

      {/* ── Two-Column Layout ── */}
      <div className="flex-1 flex min-h-0">
        {/* Left Context Panel */}
        <aside 
          className="hidden md:flex flex-col w-[380px] xl:w-[440px] flex-shrink-0 border-r border-white/10"
          style={{ backgroundColor: "#102b0f" }}
        >
          {/* Logo */}
          <div className="px-10 py-8 border-b border-white/10">
            <Link
              href="/"
              className="flex items-center gap-3 text-[1.4rem] uppercase font-bold tracking-tighter"
            >
              <Image src="/logo_final.png" alt="Courtify" width={48} height={48} className="size-12 rounded-full object-cover" />
              <span className="font-panchang text-white">COURTIFY</span>
            </Link>
          </div>

          {/* Vertical Step Indicator */}
          <div className="px-10 py-8 space-y-1">
            {STEP_LABELS.map((label, i) => {
              const s = (i + 1) as Step;
              const isCompleted = step > s;
              const isActive = step === s;
              return (
                <div key={s} className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-[0.75rem] font-bold flex-shrink-0 transition-all duration-300 ${
                        isCompleted
                          ? "bg-primary text-bg-dark"
                          : isActive
                          ? "bg-primary/20 border border-primary text-primary"
                          : "bg-white/5 border border-white/10 text-white/30"
                      }`}
                    >
                      {isCompleted ? <Check size={14} strokeWidth={3} /> : s}
                    </div>
                    {s < 4 && <div className="w-px h-10 bg-white/5 mt-1.5" />}
                  </div>
                  <div className="pt-1 pb-4">
                    <p
                      className={`text-[0.8rem] font-bold uppercase tracking-wider transition-colors ${
                        isActive ? "text-white" : isCompleted ? "text-white/60" : "text-white/30"
                      }`}
                    >
                      {label}
                    </p>
                    <p
                      className={`text-[0.72rem] mt-0.5 transition-colors ${
                        isActive ? "text-white/50" : "text-white/30"
                      }`}
                    >
                      {STEP_SUBTITLES[i]}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Per-Step Contextual Content */}
          <div className="flex-1 px-10 pb-8 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <StepContextPanel step={step} formData={formData} />
              </motion.div>
            </AnimatePresence>
          </div>

        </aside>

        {/* ── Right Form Panel ── */}
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#0c220c]">
          <div className="hidden md:flex px-12 py-5 justify-end border-b border-white/10 shrink-0">
            <button className="text-[0.82rem] font-bold text-white/40 hover:text-white transition-colors">
              Save and Exit
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-6 md:px-14 py-10 md:py-16">
            <div className="flex items-start justify-center min-h-full">
            <div className="w-full max-w-[540px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  {/* ── Step 1: Identity ── */}
                  {step === 1 && (
                    <div className="space-y-8">
                      <div>
                        <h1 className="text-[2rem] md:text-[2.8rem] font-bold leading-[1.1] mb-3 text-white">
                          Let&apos;s start with{" "}
                          <span className="text-primary italic">your venue identity.</span>
                        </h1>
                        <p className="text-[1rem] text-white/60 max-w-[440px]">
                          Your venue name will be visible to all players. Make it professional
                          and recognizable.
                        </p>
                      </div>

                      <div className="space-y-5 pt-2">
                        <div className="space-y-2">
                          <label className="text-[0.72rem] font-bold uppercase tracking-widest text-primary/70 ml-1">
                            Venue Name <span className="text-primary/50">*</span>
                          </label>
                          <input
                            type="text"
                            value={formData.venueName}
                            onChange={(e) => updateFormData({ venueName: e.target.value })}
                            placeholder="e.g. Royal Tennis Club"
                            className={`w-full bg-white/5 border rounded-xl px-5 py-4 text-[1.05rem] text-white outline-none focus:border-primary/50 focus:bg-white/10 transition-all ${errors.venueName ? "border-red-400/60" : "border-white/10"}`}
                          />
                          {errors.venueName && <p className="text-red-400 text-[0.72rem] ml-1">{errors.venueName}</p>}
                        </div>

                        <div className="space-y-3">
                          <label className="text-[0.72rem] font-bold uppercase tracking-widest text-primary/70 ml-1">
                            Venue Type
                          </label>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {VENUE_TYPES.map(({ label, icon }) => (
                              <button
                                key={label}
                                onClick={() => updateFormData({ venueType: label })}
                                className={`py-3.5 rounded-xl border font-bold text-[0.9rem] transition-all flex flex-col items-center gap-1.5 ${
                                  formData.venueType === label
                                    ? "bg-primary text-bg-dark border-primary shadow-lg shadow-primary/20"
                                    : "bg-white/5 border-white/10 text-white/60 hover:border-white/20 hover:bg-white/10"
                                }`}
                              >
                                <span className="text-[1.2rem] leading-none">{icon}</span>
                                <span>{label}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Venue Logo */}
                        <div className="space-y-2">
                          <label className="text-[0.72rem] font-bold uppercase tracking-widest text-primary/70 ml-1">
                            Venue Logo
                          </label>
                          <input
                            ref={logoInputRef}
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleLogoSelect(file);
                            }}
                          />
                          {logoPreview ? (
                            <div className="relative w-32 h-32 group">
                              <Image
                                src={logoPreview}
                                alt="Venue logo preview"
                                fill
                                className="rounded-2xl object-cover border border-white/10"
                              />
                              <button
                                type="button"
                                onClick={removeLogo}
                                className="absolute -top-2 -right-2 size-6 rounded-full bg-red-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
                              >
                                <X size={14} className="text-white" />
                              </button>
                              <button
                                type="button"
                                onClick={() => logoInputRef.current?.click()}
                                className="absolute inset-0 rounded-2xl bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <Camera size={20} className="text-white" />
                              </button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => logoInputRef.current?.click()}
                              className="flex flex-col items-center justify-center gap-2 w-32 h-32 rounded-2xl border border-dashed border-white/20 bg-white/5 hover:border-primary/30 hover:bg-white/10 transition-all"
                            >
                              <Camera size={24} className="text-white/30" />
                              <span className="text-[0.7rem] font-bold text-white/30">Upload</span>
                            </button>
                          )}
                          <p className="text-[0.7rem] text-white/40 ml-1">JPG, PNG, or WebP. Max 5MB.</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ── Step 2: Location ── */}
                  {step === 2 && (
                    <div className="space-y-8">
                      <div>
                        <h1 className="text-[2rem] md:text-[2.8rem] font-bold leading-[1.1] mb-3 text-white">
                          Where is your{" "}
                          <span className="text-primary italic">venue located?</span>
                        </h1>
                        <p className="text-[1rem] text-white/60 max-w-[440px]">
                          Providing an accurate address helps players find your courts easily.
                        </p>
                      </div>

                      <div className="space-y-5 pt-2">
                        <div className="space-y-2">
                          <label className="text-[0.72rem] font-bold uppercase tracking-widest text-primary/70 ml-1">
                            Street Address <span className="text-primary/50">*</span>
                          </label>
                          <div className="relative">
                            <MapPin
                              className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30"
                              size={18}
                            />
                            <input
                              type="text"
                              value={formData.address}
                              onChange={(e) => updateFormData({ address: e.target.value })}
                              placeholder="Street name and number"
                              className={`w-full bg-white/5 border rounded-xl pl-12 pr-5 py-4 text-[1.05rem] text-white outline-none focus:border-primary/50 focus:bg-white/10 transition-all ${errors.address ? "border-red-400/60" : "border-white/10"}`}
                            />
                          </div>
                          {errors.address && <p className="text-red-400 text-[0.72rem] ml-1">{errors.address}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div className="space-y-2">
                            <label className="text-[0.72rem] font-bold uppercase tracking-widest text-primary/70 ml-1">
                              City <span className="text-primary/50">*</span>
                            </label>
                            <input
                              type="text"
                              value={formData.city}
                              onChange={(e) => updateFormData({ city: e.target.value })}
                              placeholder="City name"
                              className={`w-full bg-white/5 border rounded-xl px-5 py-4 text-[1.05rem] text-white outline-none focus:border-primary/50 focus:bg-white/10 transition-all ${errors.city ? "border-red-400/60" : "border-white/10"}`}
                            />
                            {errors.city && <p className="text-red-400 text-[0.72rem] ml-1">{errors.city}</p>}
                          </div>
                          <div className="space-y-2">
                            <label className="text-[0.72rem] font-bold uppercase tracking-widest text-primary/70 ml-1">
                              Contact Phone <span className="text-primary/50">*</span>
                            </label>
                            <div className="relative">
                              <Phone
                                className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30"
                                size={16}
                              />
                              <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => updateFormData({ phone: e.target.value })}
                                placeholder="+63 (912) 345-6789"
                                className={`w-full bg-white/5 border rounded-xl pl-12 pr-5 py-4 text-[1.05rem] text-white outline-none focus:border-primary/50 focus:bg-white/10 transition-all ${errors.phone ? "border-red-400/60" : "border-white/10"}`}
                              />
                            </div>
                            {errors.phone && <p className="text-red-400 text-[0.72rem] ml-1">{errors.phone}</p>}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-[0.72rem] font-bold uppercase tracking-widest text-primary/70 ml-1">
                            Contact Email <span className="text-primary/50">*</span>
                          </label>
                          <div className="relative">
                            <Mail
                              className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30"
                              size={16}
                            />
                            <input
                              type="email"
                              value={formData.email}
                              onChange={(e) => updateFormData({ email: e.target.value })}
                              placeholder="venue@example.com"
                              className={`w-full bg-white/5 border rounded-xl pl-12 pr-5 py-4 text-[1.05rem] text-white outline-none focus:border-primary/50 focus:bg-white/10 transition-all ${errors.email ? "border-red-400/60" : "border-white/10"}`}
                            />
                          </div>
                          {errors.email && <p className="text-red-400 text-[0.72rem] ml-1">{errors.email}</p>}
                        </div>

                        <div className="space-y-2 pt-2">
                          <div className="flex items-center justify-between">
                            <label className="text-[0.72rem] font-bold uppercase tracking-widest text-primary/70 ml-1">
                              Pin Your Location
                            </label>
                            <button
                              type="button"
                              onClick={() => {
                                setLocatingUser(true);
                                navigator.geolocation.getCurrentPosition(
                                  (pos) => {
                                    updateFormData({ lat: pos.coords.latitude, lng: pos.coords.longitude });
                                    setLocatingUser(false);
                                  },
                                  () => setLocatingUser(false),
                                  { enableHighAccuracy: true }
                                );
                              }}
                              disabled={locatingUser}
                              className="flex items-center gap-1.5 text-[0.72rem] font-bold text-primary hover:text-primary-hover transition-colors disabled:opacity-50"
                            >
                              <LocateFixed size={14} className={locatingUser ? "animate-spin" : ""} />
                              {locatingUser ? "Locating..." : "Use my location"}
                            </button>
                          </div>
                          <div className="h-[280px] sm:h-[320px] rounded-xl overflow-hidden border border-white/10 bg-white/5">
                            <MapPicker
                              lat={formData.lat}
                              lng={formData.lng}
                              onLocationChange={(lat, lng) => updateFormData({ lat, lng })}
                            />
                          </div>
                          <p className="text-[0.72rem] text-white/40 ml-1">
                            Click on the map to pin your venue&apos;s exact location.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ── Step 3: Details ── */}
                  {step === 3 && (
                    <div className="space-y-8">
                      <div>
                        <h1 className="text-[2rem] md:text-[2.8rem] font-bold leading-[1.1] mb-3 text-white">
                          Share some{" "}
                          <span className="text-primary italic">key details.</span>
                        </h1>
                        <p className="text-[1rem] text-white/60 max-w-[440px]">
                          Help players understand what makes your venue unique and how much it
                          costs to play.
                        </p>
                      </div>

                      <div className="space-y-5 pt-2">
                        {/* Courts List */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between ml-1 mr-1">
                            <label className="text-[0.72rem] font-bold uppercase tracking-widest text-primary/70">
                              Courts ({formData.courts.length} / 15) <span className="text-primary/50">*</span>
                            </label>
                          </div>
                          <div className="space-y-3">
                            {formData.courts.map((court, index) => (
                              <div key={index}>
                                <div
                                  className={`flex items-center gap-3 bg-white/5 border rounded-xl p-3 transition-all hover:border-white/20 ${errors[`court_name_${index}`] || errors[`court_price_${index}`] ? "border-red-400/60" : "border-white/10"}`}
                                >
                                  <input
                                    type="text"
                                    value={court.name}
                                    onChange={(e) => {
                                      updateCourt(index, { name: e.target.value });
                                      setErrors((prev) => { const next = { ...prev }; delete next[`court_name_${index}`]; return next; });
                                    }}
                                    placeholder="Court name"
                                    className="flex-1 bg-transparent text-[0.95rem] text-white outline-none placeholder:text-white/20"
                                  />
                                  <div className="relative flex-shrink-0 w-[120px]">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 font-bold text-[0.85rem]">
                                      ₱
                                    </span>
                                    <input
                                      type="number"
                                      value={court.pricePerHour}
                                      onChange={(e) => {
                                        updateCourt(index, { pricePerHour: e.target.value });
                                        setErrors((prev) => { const next = { ...prev }; delete next[`court_price_${index}`]; return next; });
                                      }}
                                      placeholder="0"
                                      min="1"
                                      className={`w-full bg-white/5 border rounded-lg pl-7 pr-3 py-2 text-[0.9rem] text-white outline-none focus:border-primary/50 transition-all ${errors[`court_price_${index}`] ? "border-red-400/60" : "border-white/10"}`}
                                    />
                                  </div>
                                  <span className="text-[0.75rem] text-white/40 flex-shrink-0">/hr</span>
                                  {formData.courts.length > 1 && (
                                    <button
                                      type="button"
                                      onClick={() => removeCourt(index)}
                                      className="flex-shrink-0 p-1.5 text-white/30 hover:text-red-400 transition-colors"
                                    >
                                      <Trash2 size={15} />
                                    </button>
                                  )}
                                </div>
                                {(errors[`court_name_${index}`] || errors[`court_price_${index}`]) && (
                                  <p className="text-red-400 text-[0.72rem] ml-1 mt-1">
                                    {errors[`court_name_${index}`] || errors[`court_price_${index}`]}
                                  </p>
                                )}
                              </div>
                            ))}
                          </div>
                          {formData.courts.length < 15 && (
                            <button
                              type="button"
                              onClick={addCourt}
                              className="flex items-center gap-2 w-full justify-center py-3 rounded-xl border border-dashed border-white/10 text-[0.85rem] font-bold text-white/40 hover:border-primary/30 hover:text-primary/60 transition-all bg-white/5"
                            >
                              <Plus size={16} />
                              Add Court
                            </button>
                          )}
                        </div>

                        {/* Operating Hours */}
                        <div className="space-y-2">
                          <label className="text-[0.72rem] font-bold uppercase tracking-widest text-primary/70 ml-1 flex items-center gap-2">
                            <Clock size={13} className="text-primary/70" />
                            Operating Hours
                          </label>
                          <div className="space-y-2">
                            {DAYS.map((day) => {
                              const schedule = formData.operatingHours[day];
                              return (
                                <div
                                  key={day}
                                  className={`flex items-center gap-3 rounded-xl border p-3 transition-all ${
                                    schedule.enabled
                                      ? "bg-white/5 border-white/10"
                                      : "bg-white/[0.02] border-white/5 opacity-40"
                                  }`}
                                >
                                  <button
                                    type="button"
                                    onClick={() => updateDaySchedule(day, { enabled: !schedule.enabled })}
                                    className={`flex-shrink-0 w-10 h-6 rounded-full transition-all relative ${
                                      schedule.enabled ? "bg-primary" : "bg-white/10"
                                    }`}
                                  >
                                    <div
                                      className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${
                                        schedule.enabled ? "left-5" : "left-1"
                                      }`}
                                    />
                                  </button>
                                  <span className="text-[0.85rem] font-bold w-[72px] flex-shrink-0 text-white/80">
                                    {day.slice(0, 3)}
                                  </span>
                                  {schedule.enabled ? (
                                    <div className="flex items-center gap-2 flex-1">
                                      <input
                                        type="time"
                                        value={schedule.open}
                                        onChange={(e) => updateDaySchedule(day, { open: e.target.value })}
                                        className="bg-white/10 border border-white/15 rounded-lg px-3 py-2 text-[0.85rem] text-white outline-none focus:border-primary/50 transition-all w-[120px] [color-scheme:dark]"
                                      />
                                      <span className="text-white/30 text-[0.8rem]">to</span>
                                      <input
                                        type="time"
                                        value={schedule.close}
                                        onChange={(e) => updateDaySchedule(day, { close: e.target.value })}
                                        className="bg-white/10 border border-white/15 rounded-lg px-3 py-2 text-[0.85rem] text-white outline-none focus:border-primary/50 transition-all w-[120px] [color-scheme:dark]"
                                      />
                                    </div>
                                  ) : (
                                    <span className="text-[0.8rem] text-white/30 italic">Closed</span>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between ml-1 mr-1">
                            <label className="text-[0.72rem] font-bold uppercase tracking-widest text-primary/70">
                              Brief Description
                            </label>
                            <span className="text-[0.7rem] text-white/30">
                              {formData.description.length} / 280
                            </span>
                          </div>
                          <textarea
                            value={formData.description}
                            onChange={(e) =>
                              updateFormData({
                                description: e.target.value.slice(0, 280),
                              })
                            }
                            placeholder="Tell players about your venue, facilities, and any special requirements..."
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-[1.05rem] text-white outline-none focus:border-primary/50 focus:bg-white/10 transition-all min-h-[130px] resize-y leading-relaxed whitespace-pre-wrap"
                          />
                        </div>

                        {/* Tags */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between ml-1 mr-1">
                            <label className="text-[0.72rem] font-bold uppercase tracking-widest text-primary/70">
                              Tags
                            </label>
                            <span className="text-[0.7rem] text-white/30">
                              Press Enter or comma to add
                            </span>
                          </div>
                          <div className={`w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 transition-all flex flex-wrap gap-2 focus-within:border-primary/50 focus-within:bg-white/10`}>
                            {formData.tags.map((tag) => (
                              <span
                                key={tag}
                                className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/20 border border-primary/30 text-primary text-[0.78rem] font-bold rounded-lg"
                              >
                                {tag}
                                <button
                                  type="button"
                                  onClick={() => removeTag(tag)}
                                  className="text-primary/50 hover:text-primary transition-colors leading-none"
                                >
                                  ×
                                </button>
                              </span>
                            ))}
                            <input
                              type="text"
                              value={tagInput}
                              onChange={(e) => {
                                const val = e.target.value;
                                if (val.endsWith(",")) {
                                  addTag(val);
                                } else {
                                  setTagInput(val);
                                }
                              }}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault();
                                  addTag(tagInput);
                                }
                                if (e.key === "Backspace" && tagInput === "" && formData.tags.length > 0) {
                                  removeTag(formData.tags[formData.tags.length - 1]);
                                }
                              }}
                              placeholder={formData.tags.length === 0 ? "e.g. parking, floodlights, clay courts..." : ""}
                              className="flex-1 min-w-[140px] bg-transparent text-[1rem] text-white outline-none placeholder:text-white/20 py-1"
                            />
                          </div>
                        </div>

                        {/* Venue Policies */}
                        <div className="space-y-5 pt-2">
                          <h3 className="text-[0.72rem] font-bold uppercase tracking-widest text-primary/70 ml-1">
                            Venue Policies <span className="text-white/30 font-normal normal-case tracking-normal">(optional)</span>
                          </h3>

                          {/* Venue Rules */}
                          <div className="space-y-2">
                            <label className="text-[0.68rem] font-bold uppercase tracking-widest text-white/40 ml-1">
                              Venue Rules
                            </label>
                            <div className="space-y-2">
                              {formData.venueRules.map((rule, i) => (
                                <div key={i} className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5">
                                  <span className="flex-1 text-[0.85rem] text-white/80">{rule}</span>
                                  <button
                                    type="button"
                                    onClick={() => updateFormData({ venueRules: formData.venueRules.filter((_, idx) => idx !== i) })}
                                    className="text-white/30 hover:text-red-400 transition-colors"
                                  >
                                    <X size={14} />
                                  </button>
                                </div>
                              ))}
                            </div>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={ruleInput}
                                onChange={(e) => setRuleInput(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter" && ruleInput.trim()) {
                                    e.preventDefault();
                                    updateFormData({ venueRules: [...formData.venueRules, ruleInput.trim()] });
                                    setRuleInput("");
                                  }
                                }}
                                placeholder="e.g. Arrive 10 mins early"
                                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-[0.85rem] text-white outline-none focus:border-primary/50 transition-all placeholder:text-white/20"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  if (ruleInput.trim()) {
                                    updateFormData({ venueRules: [...formData.venueRules, ruleInput.trim()] });
                                    setRuleInput("");
                                  }
                                }}
                                className="flex items-center rounded-xl bg-primary/20 px-3 py-2.5 text-primary hover:bg-primary/30 transition-colors"
                              >
                                <Plus size={16} />
                              </button>
                            </div>
                          </div>

                          {/* Safety & Health */}
                          <div className="space-y-2">
                            <label className="text-[0.68rem] font-bold uppercase tracking-widest text-white/40 ml-1">
                              Safety & Health
                            </label>
                            <div className="space-y-2">
                              {formData.safetyHealth.map((item, i) => (
                                <div key={i} className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5">
                                  <span className="flex-1 text-[0.85rem] text-white/80">{item}</span>
                                  <button
                                    type="button"
                                    onClick={() => updateFormData({ safetyHealth: formData.safetyHealth.filter((_, idx) => idx !== i) })}
                                    className="text-white/30 hover:text-red-400 transition-colors"
                                  >
                                    <X size={14} />
                                  </button>
                                </div>
                              ))}
                            </div>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={safetyInput}
                                onChange={(e) => setSafetyInput(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter" && safetyInput.trim()) {
                                    e.preventDefault();
                                    updateFormData({ safetyHealth: [...formData.safetyHealth, safetyInput.trim()] });
                                    setSafetyInput("");
                                  }
                                }}
                                placeholder="e.g. First aid kit on site"
                                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-[0.85rem] text-white outline-none focus:border-primary/50 transition-all placeholder:text-white/20"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  if (safetyInput.trim()) {
                                    updateFormData({ safetyHealth: [...formData.safetyHealth, safetyInput.trim()] });
                                    setSafetyInput("");
                                  }
                                }}
                                className="flex items-center rounded-xl bg-primary/20 px-3 py-2.5 text-primary hover:bg-primary/30 transition-colors"
                              >
                                <Plus size={16} />
                              </button>
                            </div>
                          </div>

                          {/* Cancellation Policy */}
                          <div className="space-y-2">
                            <label className="text-[0.68rem] font-bold uppercase tracking-widest text-white/40 ml-1">
                              Cancellation Policy
                            </label>
                            <textarea
                              value={formData.cancellationPolicy}
                              onChange={(e) => updateFormData({ cancellationPolicy: e.target.value })}
                              placeholder="Describe your cancellation and refund policy..."
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-[0.85rem] text-white outline-none focus:border-primary/50 transition-all min-h-[80px] resize-none leading-relaxed placeholder:text-white/20"
                            />
                          </div>
                        </div>

                        {/* QR Payment Image */}
                        <div className="space-y-2">
                          <label className="text-[0.72rem] font-bold uppercase tracking-widest text-primary/70 ml-1 flex items-center gap-2">
                            <QrCode size={13} className="text-primary/70" />
                            Payment QR Code <span className="text-primary/50">*</span>
                          </label>
                          <p className="text-[0.72rem] text-white/40 ml-1 mb-2">
                            Upload your GCash, Maya, or bank QR code so players can pay you directly.
                          </p>
                          <input
                            ref={qrInputRef}
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleQrSelect(file);
                            }}
                          />
                          <div className="flex flex-wrap gap-3">
                            {qrPreviews.map((preview, index) => (
                              <div key={index} className="relative w-36 h-36 group">
                                <Image
                                  src={preview}
                                  alt={`QR payment ${index + 1}`}
                                  fill
                                  className="rounded-2xl object-contain border border-white/10 bg-white/5"
                                />
                                <button
                                  type="button"
                                  onClick={() => removeQr(index)}
                                  className="absolute -top-2 -right-2 size-6 rounded-full bg-red-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
                                >
                                  <X size={14} className="text-white" />
                                </button>
                              </div>
                            ))}
                            {qrFiles.length < 5 && (
                              <button
                                type="button"
                                onClick={() => qrInputRef.current?.click()}
                                className={`flex flex-col items-center justify-center gap-2 w-36 h-36 rounded-2xl border border-dashed bg-white/5 hover:border-primary/30 hover:bg-white/10 transition-all ${errors.qrPayment ? "border-red-400/60" : "border-white/20"}`}
                              >
                                <QrCode size={28} className="text-white/30" />
                                <span className="text-[0.65rem] font-bold text-white/30">
                                  {qrFiles.length === 0 ? "Upload QR Code" : "Add Another"}
                                </span>
                              </button>
                            )}
                          </div>
                          {errors.qrPayment && <p className="text-red-400 text-[0.72rem] ml-1">{errors.qrPayment}</p>}
                          <p className="text-[0.7rem] text-white/40 ml-1">JPG, PNG, or WebP. Max 5MB.</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ── Step 4: Review ── */}
                  {step === 4 && (
                    <div className="space-y-8">
                      <div>
                        <h1 className="text-[2rem] md:text-[2.8rem] font-bold leading-[1.1] mb-3 text-white">
                          All set!{" "}
                          <span className="text-primary italic">Let&apos;s review.</span>
                        </h1>
                        <p className="text-[1rem] text-white/60 max-w-[440px]">
                          Take a quick look at your details before we finalize your venue
                          profile.
                        </p>
                      </div>

                      <div className="space-y-3">
                        {/* Identity */}
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex justify-between items-start group hover:border-white/20 transition-colors shadow-xl backdrop-blur-sm">
                          <div className="flex items-start gap-4">
                            {logoPreview && (
                              <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border border-white/10">
                                <Image src={logoPreview} alt="Logo" fill className="object-cover" />
                              </div>
                            )}
                            <div>
                              <h3 className="text-primary/50 uppercase text-[0.68rem] font-bold tracking-[0.15em] mb-2">
                                Venue Identity
                              </h3>
                              <p className="text-[1.3rem] font-bold text-white leading-tight">
                                {formData.venueName.trim() || "Your Venue Name"}
                              </p>
                              <span className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 bg-primary/20 text-primary text-[0.68rem] font-bold rounded-lg border border-primary/30">
                                {VENUE_TYPES.find((v) => v.label === formData.venueType)?.icon}{" "}
                                {formData.venueType}
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() => setStep(1)}
                            className="text-white/40 hover:text-primary text-[0.75rem] font-bold transition-colors ml-4 flex-shrink-0"
                          >
                            Edit
                          </button>
                        </div>

                        {/* Location */}
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex justify-between items-start hover:border-white/20 transition-colors shadow-xl backdrop-blur-sm">
                          <div>
                            <h3 className="text-primary/50 uppercase text-[0.68rem] font-bold tracking-[0.15em] mb-2">
                              Location & Contact
                            </h3>
                            <p className="text-[1rem] text-white/80">
                              {formData.address || (
                                <span className="text-white/20 italic">No address provided</span>
                              )}
                            </p>
                            <p className="text-[0.9rem] text-white/50 mt-1">
                              {[formData.city, formData.phone].filter(Boolean).join(" · ") || (
                                <span className="italic">No contact info</span>
                              )}
                            </p>
                          </div>
                          <button
                            onClick={() => setStep(2)}
                            className="text-white/40 hover:text-primary text-[0.75rem] font-bold transition-colors ml-4 flex-shrink-0"
                          >
                            Edit
                          </button>
                        </div>

                        {/* Details */}
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex justify-between items-start hover:border-white/20 transition-colors shadow-xl backdrop-blur-sm">
                          <div className="min-w-0">
                            <h3 className="text-primary/50 uppercase text-[0.68rem] font-bold tracking-[0.15em] mb-2">
                              Courts & Pricing
                            </h3>
                            <div className="space-y-1.5">
                              {formData.courts.map((court, i) => (
                                <p key={i} className="text-[0.95rem] text-white/80 flex items-center gap-2">
                                  {court.name || `Court ${i + 1}`}
                                  {court.pricePerHour && (
                                    <span className="text-primary font-bold text-[0.85rem]">
                                      ₱{court.pricePerHour}/hr
                                    </span>
                                  )}
                                </p>
                              ))}
                            </div>
                          </div>
                          <button
                            onClick={() => setStep(3)}
                            className="text-white/40 hover:text-primary text-[0.75rem] font-bold transition-colors ml-4 flex-shrink-0"
                          >
                            Edit
                          </button>
                        </div>

                        {/* QR Payment */}
                        {qrPreviews.length > 0 && (
                          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-colors shadow-xl backdrop-blur-sm">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h3 className="text-primary/50 uppercase text-[0.68rem] font-bold tracking-[0.15em] mb-1">
                                  Payment QR Codes
                                </h3>
                                <p className="text-[0.75rem] text-white/40">
                                  {qrPreviews.length} QR code{qrPreviews.length > 1 ? "s" : ""} uploaded — players will scan to pay
                                </p>
                              </div>
                              <button
                                onClick={() => setStep(3)}
                                className="text-white/40 hover:text-primary text-[0.75rem] font-bold transition-colors ml-4 flex-shrink-0"
                              >
                                Edit
                              </button>
                            </div>
                            <div className="flex flex-wrap gap-3">
                              {qrPreviews.map((preview, index) => (
                                <div key={index} className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border border-white/10 bg-white/5">
                                  <Image src={preview} alt={`QR Payment ${index + 1}`} fill className="object-contain" />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* ── Navigation Controls ── */}
              <div className="mt-10 flex items-center justify-between pt-8 border-t border-white/10">
                <button
                  onClick={prevStep}
                  className={`flex items-center gap-2 text-[0.9rem] font-bold transition-all ${
                    step === 1
                      ? "opacity-0 pointer-events-none"
                      : "text-white/40 hover:text-white"
                  }`}
                >
                  <ChevronLeft size={18} />
                  Back
                </button>

                <button
                  onClick={step === 4 ? () => mutation.mutate() : nextStep}
                  disabled={mutation.isPending}
                  className="flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-primary text-bg-dark font-bold text-[1rem] transition-all hover:scale-[1.02] active:scale-[0.99] shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {mutation.isPending ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Creating...
                    </>
                  ) : step === 4 ? "Complete Setup" : "Continue"}
                  {!mutation.isPending && <ArrowRight size={18} />}
                </button>
              </div>
            </div>
            </div>
          </div>
        </main>
      </div>

      {/* ── Decorative Background ── */}
      <div className="bg-dot-grid fixed inset-0 pointer-events-none z-[-1] opacity-20 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_40%,black_30%,transparent_100%)]" />
      <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-primary/[0.08] rounded-full blur-[140px] pointer-events-none z-[-1]" />
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-primary/[0.05] rounded-full blur-[120px] pointer-events-none z-[-1]" />

      <div className="fixed left-1/2 top-0 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-primary/10 to-transparent pointer-events-none z-[-1]" />
      <div className="fixed top-1/2 left-0 -translate-y-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/8 to-transparent pointer-events-none z-[-1]" />

      <div className="fixed right-[-60px] bottom-[-100px] w-[380px] opacity-[0.03] text-primary rotate-[8deg] pointer-events-none z-[-1]">
        <svg viewBox="0 0 300 580" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
          <rect x="1" y="1" width="298" height="578" />
          <line x1="0" y1="290" x2="300" y2="290" />
          <line x1="46" y1="0" x2="46" y2="580" />
          <line x1="254" y1="0" x2="254" y2="580" />
          <line x1="46" y1="170" x2="254" y2="170" />
          <line x1="46" y1="410" x2="254" y2="410" />
          <line x1="150" y1="170" x2="150" y2="410" />
        </svg>
      </div>
    </div>
  );
}
