"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  MapPin,
  Phone,
  ImagePlus,
  ChevronLeft,
  ChevronRight,
  Check,
  Clock,
  DollarSign,
  Wifi,
  ParkingCircle,
  ShowerHead,
  Lightbulb,
  X,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const STEPS = [
  { id: 1, label: "Basics" },
  { id: 2, label: "Details" },
  { id: 3, label: "Photos" },
  { id: 4, label: "Review" },
];

const sportTypes = [
  "Tennis",
  "Padel",
  "Basketball",
  "Pickleball",
  "Badminton",
  "Volleyball",
];

const surfaceTypes = [
  "Hard Court",
  "Clay",
  "Grass",
  "Synthetic",
  "Indoor Wood",
  "Concrete",
];

const amenities = [
  { id: "wifi", label: "Wi-Fi", icon: Wifi },
  { id: "parking", label: "Parking", icon: ParkingCircle },
  { id: "showers", label: "Showers", icon: ShowerHead },
  { id: "lighting", label: "Night Lighting", icon: Lightbulb },
];

const hourOptions = [
  "6:00 AM", "7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM",
  "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM", "11:00 PM",
];

export default function NewVenuePage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Step 1 — Basics
  const [venueName, setVenueName] = useState("");
  const [location, setLocation] = useState("");
  const [sport, setSport] = useState("");
  const [courtCount, setCourtCount] = useState("");
  const [phone, setPhone] = useState("");

  // Step 2 — Details
  const [description, setDescription] = useState("");
  const [surface, setSurface] = useState("");
  const [pricePerHour, setPricePerHour] = useState("");
  const [openTime, setOpenTime] = useState("8:00 AM");
  const [closeTime, setCloseTime] = useState("10:00 PM");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  // Step 3 — Photos
  const [photos, setPhotos] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const toggleAmenity = (id: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter((f) => f.size <= 5 * 1024 * 1024);
    if (validFiles.length < files.length) {
      toast.error("Some files exceeded 5MB and were skipped");
    }
    setPhotos((prev) => [...prev, ...validFiles]);
    setPreviews((prev) => [
      ...prev,
      ...validFiles.map((f) => URL.createObjectURL(f)),
    ]);
  };

  const removePhoto = (index: number) => {
    URL.revokeObjectURL(previews[index]);
    setPhotos((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const validateStep = (s: number): boolean => {
    if (s === 1) {
      if (!venueName.trim()) { toast.error("Venue name is required"); return false; }
      if (!location.trim()) { toast.error("Location is required"); return false; }
      if (!sport) { toast.error("Please select a sport type"); return false; }
      return true;
    }
    if (s === 2) {
      if (!description.trim()) { toast.error("Please add a description"); return false; }
      return true;
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep(step)) setStep((s) => Math.min(s + 1, 4));
  };

  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // TODO: API call to create venue
    await new Promise((r) => setTimeout(r, 1500));
    toast.success("Venue submitted for review!");
    setIsSubmitting(false);
    router.push("/venue-owner/venues");
  };

  const slideVariants = {
    enter: (direction: number) => ({ x: direction > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction > 0 ? -80 : 80, opacity: 0 }),
  };

  const [direction, setDirection] = useState(1);

  const goNext = () => { setDirection(1); nextStep(); };
  const goPrev = () => { setDirection(-1); prevStep(); };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/venue-owner"
          className="flex size-10 items-center justify-center rounded-xl bg-white/[0.04] text-text-muted/50 hover:bg-white/[0.08] hover:text-white transition-colors"
        >
          <ChevronLeft size={20} />
        </Link>
        <div>
          <h1 className="text-[1.5rem] sm:text-[1.8rem] font-extrabold text-white tracking-tight">
            Add New Venue
          </h1>
          <p className="text-text-muted/40 text-[0.85rem]">
            Step {step} of {STEPS.length} &mdash; {STEPS[step - 1].label}
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="flex items-center gap-2 mb-8">
        {STEPS.map((s, i) => (
          <div key={s.id} className="flex items-center flex-1 gap-2">
            <div className="flex-1 flex flex-col items-center gap-1.5">
              <div className="w-full h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-primary"
                  initial={false}
                  animate={{ width: step > s.id ? "100%" : step === s.id ? "50%" : "0%" }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                />
              </div>
              <span
                className={`text-[0.65rem] font-bold uppercase tracking-wider ${
                  step >= s.id ? "text-primary" : "text-text-muted/25"
                }`}
              >
                {s.label}
              </span>
            </div>
            {i < STEPS.length - 1 && <div className="w-2" />}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          {step === 1 && (
            <motion.div
              key="step-1"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="p-6 sm:p-8 space-y-6"
            >
              {/* Venue Name */}
              <div className="space-y-2">
                <label className="text-[0.7rem] font-bold uppercase tracking-[0.15em] text-text-muted/40">
                  Venue Name <span className="text-red-400">*</span>
                </label>
                <div className="relative group">
                  <Building2
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted/30 group-focus-within:text-primary transition-colors"
                  />
                  <input
                    type="text"
                    value={venueName}
                    onChange={(e) => setVenueName(e.target.value)}
                    placeholder="e.g. Green Valley Tennis Club"
                    className="w-full rounded-xl border border-white/[0.06] bg-white/[0.03] py-3 pl-10 pr-4 text-[0.85rem] text-white placeholder:text-white/15 outline-none transition-all focus:border-primary/40 focus:bg-white/[0.05] focus:ring-2 focus:ring-primary/10"
                  />
                </div>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label className="text-[0.7rem] font-bold uppercase tracking-[0.15em] text-text-muted/40">
                  Address <span className="text-red-400">*</span>
                </label>
                <div className="relative group">
                  <MapPin
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted/30 group-focus-within:text-primary transition-colors"
                  />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. 123 Main St, San Francisco, CA"
                    className="w-full rounded-xl border border-white/[0.06] bg-white/[0.03] py-3 pl-10 pr-4 text-[0.85rem] text-white placeholder:text-white/15 outline-none transition-all focus:border-primary/40 focus:bg-white/[0.05] focus:ring-2 focus:ring-primary/10"
                  />
                </div>
              </div>

              {/* Sport + Courts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[0.7rem] font-bold uppercase tracking-[0.15em] text-text-muted/40">
                    Sport Type <span className="text-red-400">*</span>
                  </label>
                  <select
                    value={sport}
                    onChange={(e) => setSport(e.target.value)}
                    className="w-full rounded-xl border border-white/[0.06] bg-white/[0.03] py-3 px-4 text-[0.85rem] text-white outline-none transition-all focus:border-primary/40 focus:bg-white/[0.05] focus:ring-2 focus:ring-primary/10 appearance-none"
                  >
                    <option value="" className="bg-bg-dark text-text-muted/50">
                      Select sport
                    </option>
                    {sportTypes.map((s) => (
                      <option key={s} value={s} className="bg-bg-dark text-white">
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[0.7rem] font-bold uppercase tracking-[0.15em] text-text-muted/40">
                    Number of Courts
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={courtCount}
                    onChange={(e) => setCourtCount(e.target.value)}
                    placeholder="e.g. 4"
                    className="w-full rounded-xl border border-white/[0.06] bg-white/[0.03] py-3 px-4 text-[0.85rem] text-white placeholder:text-white/15 outline-none transition-all focus:border-primary/40 focus:bg-white/[0.05] focus:ring-2 focus:ring-primary/10"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="text-[0.7rem] font-bold uppercase tracking-[0.15em] text-text-muted/40">
                  Contact Phone{" "}
                  <span className="text-text-muted/20 normal-case tracking-normal text-[0.65rem]">
                    (optional)
                  </span>
                </label>
                <div className="relative group">
                  <Phone
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted/30 group-focus-within:text-primary transition-colors"
                  />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full rounded-xl border border-white/[0.06] bg-white/[0.03] py-3 pl-10 pr-4 text-[0.85rem] text-white placeholder:text-white/15 outline-none transition-all focus:border-primary/40 focus:bg-white/[0.05] focus:ring-2 focus:ring-primary/10"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step-2"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="p-6 sm:p-8 space-y-6"
            >
              {/* Description */}
              <div className="space-y-2">
                <label className="text-[0.7rem] font-bold uppercase tracking-[0.15em] text-text-muted/40">
                  Description <span className="text-red-400">*</span>
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tell players about your venue — what makes it special, surface quality, atmosphere..."
                  rows={4}
                  className="w-full rounded-xl border border-white/[0.06] bg-white/[0.03] py-3 px-4 text-[0.85rem] text-white placeholder:text-white/15 outline-none transition-all focus:border-primary/40 focus:bg-white/[0.05] focus:ring-2 focus:ring-primary/10 resize-none"
                />
              </div>

              {/* Surface + Price */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[0.7rem] font-bold uppercase tracking-[0.15em] text-text-muted/40">
                    Surface Type
                  </label>
                  <select
                    value={surface}
                    onChange={(e) => setSurface(e.target.value)}
                    className="w-full rounded-xl border border-white/[0.06] bg-white/[0.03] py-3 px-4 text-[0.85rem] text-white outline-none transition-all focus:border-primary/40 focus:bg-white/[0.05] focus:ring-2 focus:ring-primary/10 appearance-none"
                  >
                    <option value="" className="bg-bg-dark text-text-muted/50">
                      Select surface
                    </option>
                    {surfaceTypes.map((s) => (
                      <option key={s} value={s} className="bg-bg-dark text-white">
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[0.7rem] font-bold uppercase tracking-[0.15em] text-text-muted/40">
                    Price per Hour
                  </label>
                  <div className="relative group">
                    <DollarSign
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted/30 group-focus-within:text-primary transition-colors"
                    />
                    <input
                      type="number"
                      min="0"
                      value={pricePerHour}
                      onChange={(e) => setPricePerHour(e.target.value)}
                      placeholder="e.g. 45"
                      className="w-full rounded-xl border border-white/[0.06] bg-white/[0.03] py-3 pl-10 pr-4 text-[0.85rem] text-white placeholder:text-white/15 outline-none transition-all focus:border-primary/40 focus:bg-white/[0.05] focus:ring-2 focus:ring-primary/10"
                    />
                  </div>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="space-y-2">
                <label className="text-[0.7rem] font-bold uppercase tracking-[0.15em] text-text-muted/40 flex items-center gap-1.5">
                  <Clock size={12} />
                  Operating Hours
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <select
                    value={openTime}
                    onChange={(e) => setOpenTime(e.target.value)}
                    className="w-full rounded-xl border border-white/[0.06] bg-white/[0.03] py-3 px-4 text-[0.85rem] text-white outline-none transition-all focus:border-primary/40 focus:bg-white/[0.05] focus:ring-2 focus:ring-primary/10 appearance-none"
                  >
                    {hourOptions.map((h) => (
                      <option key={h} value={h} className="bg-bg-dark text-white">
                        {h}
                      </option>
                    ))}
                  </select>
                  <select
                    value={closeTime}
                    onChange={(e) => setCloseTime(e.target.value)}
                    className="w-full rounded-xl border border-white/[0.06] bg-white/[0.03] py-3 px-4 text-[0.85rem] text-white outline-none transition-all focus:border-primary/40 focus:bg-white/[0.05] focus:ring-2 focus:ring-primary/10 appearance-none"
                  >
                    {hourOptions.map((h) => (
                      <option key={h} value={h} className="bg-bg-dark text-white">
                        {h}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Amenities */}
              <div className="space-y-3">
                <label className="text-[0.7rem] font-bold uppercase tracking-[0.15em] text-text-muted/40">
                  Amenities
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {amenities.map((amenity) => {
                    const selected = selectedAmenities.includes(amenity.id);
                    return (
                      <button
                        key={amenity.id}
                        type="button"
                        onClick={() => toggleAmenity(amenity.id)}
                        className={`flex items-center gap-3 rounded-xl border p-3.5 transition-all ${
                          selected
                            ? "border-primary/30 bg-primary/10 text-white"
                            : "border-white/[0.06] bg-white/[0.02] text-text-muted/50 hover:bg-white/[0.04]"
                        }`}
                      >
                        <amenity.icon
                          size={18}
                          className={selected ? "text-primary" : "text-text-muted/30"}
                        />
                        <span className="text-[0.8rem] font-medium">{amenity.label}</span>
                        {selected && (
                          <Check size={14} className="text-primary ml-auto" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step-3"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="p-6 sm:p-8 space-y-6"
            >
              <div className="space-y-2">
                <label className="text-[0.7rem] font-bold uppercase tracking-[0.15em] text-text-muted/40">
                  Venue Photos
                </label>
                <p className="text-[0.8rem] text-text-muted/30">
                  Upload photos of your courts, facilities, and surroundings. Great photos attract more bookings.
                </p>
              </div>

              {/* Upload Area */}
              <label className="flex items-center justify-center rounded-xl border-2 border-dashed border-white/[0.08] bg-white/[0.02] py-12 hover:border-primary/30 hover:bg-white/[0.03] transition-colors cursor-pointer group">
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  multiple
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
                <div className="flex flex-col items-center gap-3 text-center">
                  <ImagePlus
                    size={32}
                    className="text-text-muted/20 group-hover:text-primary/50 transition-colors"
                  />
                  <div>
                    <p className="text-[0.9rem] text-text-muted/40">
                      Drag & drop or{" "}
                      <span className="text-primary/70 font-semibold">browse</span>
                    </p>
                    <p className="text-[0.7rem] text-text-muted/25 mt-1">
                      PNG, JPG, WebP up to 5MB each
                    </p>
                  </div>
                </div>
              </label>

              {/* Preview Grid */}
              {previews.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {previews.map((src, i) => (
                    <div
                      key={i}
                      className="relative aspect-[4/3] rounded-xl overflow-hidden border border-white/[0.06] group"
                    >
                      <img
                        src={src}
                        alt={`Venue photo ${i + 1}`}
                        className="size-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(i)}
                        className="absolute top-2 right-2 flex size-7 items-center justify-center rounded-lg bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step-4"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="p-6 sm:p-8 space-y-6"
            >
              <div className="space-y-2">
                <h2 className="text-[1rem] font-bold text-white">Review Your Venue</h2>
                <p className="text-[0.8rem] text-text-muted/40">
                  Make sure everything looks good before submitting.
                </p>
              </div>

              <div className="space-y-4">
                {/* Basics */}
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[0.8rem] font-bold uppercase tracking-wider text-primary">
                      Basics
                    </h3>
                    <button
                      onClick={() => { setDirection(-1); setStep(1); }}
                      className="text-[0.75rem] font-semibold text-text-muted/40 hover:text-white transition-colors"
                    >
                      Edit
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-y-3 gap-x-6">
                    <ReviewField label="Venue Name" value={venueName} />
                    <ReviewField label="Sport" value={sport} />
                    <ReviewField label="Location" value={location} />
                    <ReviewField label="Courts" value={courtCount || "—"} />
                    <ReviewField label="Phone" value={phone || "—"} />
                  </div>
                </div>

                {/* Details */}
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[0.8rem] font-bold uppercase tracking-wider text-primary">
                      Details
                    </h3>
                    <button
                      onClick={() => { setDirection(-1); setStep(2); }}
                      className="text-[0.75rem] font-semibold text-text-muted/40 hover:text-white transition-colors"
                    >
                      Edit
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-y-3 gap-x-6">
                    <ReviewField label="Surface" value={surface || "—"} />
                    <ReviewField label="Price/hr" value={pricePerHour ? `$${pricePerHour}` : "—"} />
                    <ReviewField label="Hours" value={`${openTime} – ${closeTime}`} />
                    <ReviewField
                      label="Amenities"
                      value={
                        selectedAmenities.length > 0
                          ? selectedAmenities
                              .map((id) => amenities.find((a) => a.id === id)?.label)
                              .join(", ")
                          : "—"
                      }
                    />
                  </div>
                  {description && (
                    <div className="pt-2 border-t border-white/[0.04]">
                      <p className="text-[0.7rem] font-bold uppercase tracking-wider text-text-muted/30 mb-1">
                        Description
                      </p>
                      <p className="text-[0.8rem] text-text-muted/60 leading-relaxed">
                        {description}
                      </p>
                    </div>
                  )}
                </div>

                {/* Photos */}
                {previews.length > 0 && (
                  <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-[0.8rem] font-bold uppercase tracking-wider text-primary">
                        Photos ({previews.length})
                      </h3>
                      <button
                        onClick={() => { setDirection(-1); setStep(3); }}
                        className="text-[0.75rem] font-semibold text-text-muted/40 hover:text-white transition-colors"
                      >
                        Edit
                      </button>
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-1">
                      {previews.map((src, i) => (
                        <img
                          key={i}
                          src={src}
                          alt={`Photo ${i + 1}`}
                          className="size-20 rounded-lg object-cover border border-white/[0.06] shrink-0"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Footer */}
        <div className="flex items-center justify-between border-t border-white/[0.06] px-6 sm:px-8 py-4">
          <button
            onClick={goPrev}
            disabled={step === 1}
            className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-5 py-2.5 text-[0.8rem] font-semibold text-white transition-all hover:bg-white/[0.08] active:scale-[0.98] disabled:opacity-30 disabled:pointer-events-none"
          >
            <ChevronLeft size={16} />
            Back
          </button>

          {step < 4 ? (
            <button
              onClick={goNext}
              className="flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-[0.8rem] font-bold text-text-dark transition-all hover:brightness-110 active:scale-[0.98]"
            >
              Continue
              <ChevronRight size={16} />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-[0.8rem] font-bold text-text-dark transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-60 shadow-lg shadow-primary/20"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg className="size-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Submitting...
                </span>
              ) : (
                <>
                  <Check size={16} strokeWidth={3} />
                  Submit Venue
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function ReviewField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[0.65rem] font-bold uppercase tracking-wider text-text-muted/30">
        {label}
      </p>
      <p className="text-[0.85rem] text-white/80 font-medium mt-0.5 truncate">
        {value}
      </p>
    </div>
  );
}
