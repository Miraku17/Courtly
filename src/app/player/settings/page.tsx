"use client";

import { useState, useEffect, useRef } from "react";
import { User, Bell, Lock, Trash2, Camera, Mail, Phone, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProfile, updateProfile, uploadAvatar } from "@/lib/api/profiles";
import { toast } from "sonner";

const settingsNav = [
  { key: "profile" as const, icon: User, label: "Profile" },
  { key: "notifications" as const, icon: Bell, label: "Notifications" },
  { key: "security" as const, icon: Lock, label: "Security" },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState<"profile" | "notifications" | "security">("profile");
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl sm:text-3xl font-extrabold text-section-dark mb-1">Settings</h1>
        <p className="text-section-dark/50 text-sm sm:text-base">Manage your profile, notifications, and security.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8 items-start pb-12">
        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="sticky top-8"
        >
          {/* Mobile: Horizontal scroll */}
          <div className="flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 -mx-4 px-4 lg:mx-0 lg:px-0 scrollbar-none">
            {settingsNav.map((item) => (
              <button
                key={item.key}
                onClick={() => setActiveSection(item.key)}
                className={cn(
                  "flex items-center gap-2.5 px-5 py-3 rounded-xl transition-all duration-200 font-bold text-sm group whitespace-nowrap flex-shrink-0",
                  activeSection === item.key
                    ? "bg-section-dark text-white"
                    : "text-section-dark/50 hover:bg-section-dark/5 hover:text-section-dark"
                )}
              >
                <item.icon size={16} className={cn(activeSection === item.key ? "text-white" : "group-hover:text-section-dark transition-colors")} />
                <span>{item.label}</span>
                {activeSection === item.key && <ChevronRight size={14} className="ml-auto hidden lg:block" />}
              </button>
            ))}
          </div>

          <div className="hidden lg:block pt-6 mt-6 border-t border-section-dark/10">
            <button className="flex items-center gap-2.5 w-full px-5 py-3 rounded-xl text-red-400/70 hover:bg-red-50 hover:text-red-500 transition-all font-bold text-sm">
              <Trash2 size={16} />
              <span>Delete Account</span>
            </button>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-[#f5f5f5] border border-section-dark/10 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-sm"
        >
          {activeSection === "profile" && <ProfileSection />}
          {activeSection === "notifications" && <NotificationsSection />}
          {activeSection === "security" && <SecuritySection />}
        </motion.div>
      </div>
    </div>
  );
}

function ProfileSection() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  useEffect(() => {
    if (data?.profile) {
      setFirstName(data.profile.first_name ?? "");
      setLastName(data.profile.last_name ?? "");
      setPhone(data.profile.phone ?? "");
      setEmail(data.profile.email ?? "");
    }
  }, [data]);

  const mutation = useMutation({
    mutationFn: () => updateProfile({ firstName, lastName, phone }),
    onSuccess: (res) => { toast.success(res.message) },
    onError: () => { toast.error("Failed to update profile.") },
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const avatarMutation = useMutation({
    mutationFn: (file: File) => uploadAvatar(file),
    onSuccess: () => {
      toast.success("Avatar uploaded successfully.");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: () => { toast.error("Failed to upload avatar."); },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) avatarMutation.mutate(file);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="size-6 border-2 border-section-dark border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="relative group">
          <div className="size-24 rounded-2xl bg-section-dark/10 border-2 border-dashed border-section-dark/20 flex items-center justify-center text-section-dark overflow-hidden">
            {data?.profile?.avatar_url ? (
              <img src={data.profile.avatar_url} alt="Avatar" className="size-full object-cover" />
            ) : (
              <User size={48} strokeWidth={1.5} />
            )}
          </div>
          <input type="file" ref={fileInputRef} accept="image/jpeg,image/png" hidden onChange={handleFileChange} />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={avatarMutation.isPending}
            className="absolute -bottom-1 -right-1 size-8 rounded-lg bg-section-dark text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform disabled:opacity-50"
          >
            <Camera size={14} />
          </button>
        </div>
        <div className="text-center sm:text-left">
          <h3 className="text-lg font-bold text-section-dark mb-1">Profile Picture</h3>
          <p className="text-section-dark/40 text-sm">JPG, GIF or PNG. Max 800K</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <SettingsInput label="First Name" value={firstName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)} />
        <SettingsInput label="Last Name" value={lastName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)} />
        <SettingsInput label="Email Address" value={email} disabled icon={Mail} />
        <SettingsInput label="Phone Number" value={phone} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)} icon={Phone} />
      </div>

      <div className="flex justify-end pt-2">
        <button
          onClick={() => mutation.mutate()}
          disabled={mutation.isPending}
          className="px-8 py-3 rounded-xl bg-section-dark text-white font-bold text-sm hover:bg-section-dark/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {mutation.isPending ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}

function NotificationsSection() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-bold text-section-dark mb-1">Notification Preferences</h3>
        <p className="text-section-dark/40 text-sm">Choose how and when you want to be notified.</p>
      </div>
      <div className="space-y-3">
        <ToggleItem label="Email Notifications" description="Updates about bookings and venue news." defaultChecked />
        <ToggleItem label="Booking Reminders" description="Get notified 24h before scheduled games." defaultChecked />
        <ToggleItem label="Special Offers" description="Discounts and events from your favorite venues." />
        <ToggleItem label="SMS Alerts" description="Text message updates for urgent changes." />
      </div>
      <div className="flex justify-end pt-2">
        <button className="px-8 py-3 rounded-xl bg-section-dark text-white font-bold text-sm hover:bg-section-dark/90 transition-all">
          Update Preferences
        </button>
      </div>
    </div>
  );
}

function SecuritySection() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-bold text-section-dark mb-1">Change Password</h3>
        <p className="text-section-dark/40 text-sm">Update your password to keep your account secure.</p>
      </div>
      <div className="space-y-5 max-w-md">
        <SettingsInput label="Current Password" type="password" placeholder="Enter current password" />
        <SettingsInput label="New Password" type="password" placeholder="Enter new password" />
        <SettingsInput label="Confirm Password" type="password" placeholder="Confirm new password" />
      </div>
      <div className="flex justify-end pt-2">
        <button className="px-8 py-3 rounded-xl bg-section-dark text-white font-bold text-sm hover:bg-section-dark/90 transition-all">
          Update Password
        </button>
      </div>
    </div>
  );
}

function SettingsInput({ label, icon: Icon, ...props }: any) {
  return (
    <div className="space-y-1.5">
      <label className="text-[11px] font-bold uppercase tracking-wider text-section-dark/40 px-0.5">{label}</label>
      <div className="relative group">
        {Icon && (
          <Icon
            className="absolute left-4 top-1/2 -translate-y-1/2 text-section-dark/30 group-focus-within:text-section-dark transition-colors"
            size={16}
          />
        )}
        <input
          {...props}
          className={cn(
            "w-full bg-white/80 border border-section-dark/15 rounded-xl py-3 pr-4 text-section-dark text-sm focus:outline-none focus:border-section-dark/30 transition-all placeholder:text-section-dark/30",
            Icon ? "pl-11" : "pl-4",
            props.disabled && "opacity-40 cursor-not-allowed"
          )}
        />
      </div>
    </div>
  );
}

function ToggleItem({
  label,
  description,
  defaultChecked,
}: {
  label: string;
  description: string;
  defaultChecked?: boolean;
}) {
  const [checked, setChecked] = useState(defaultChecked || false);
  return (
    <div className="flex items-center justify-between p-4 sm:p-5 rounded-xl bg-white/60 border border-section-dark/10 hover:border-section-dark/15 transition-all gap-4">
      <div className="min-w-0">
        <div className="text-sm text-section-dark font-bold">{label}</div>
        <div className="text-section-dark/40 text-xs mt-0.5">{description}</div>
      </div>
      <button
        onClick={() => setChecked(!checked)}
        className={cn(
          "relative w-11 h-6 rounded-full transition-all duration-300 flex-shrink-0",
          checked ? "bg-section-dark" : "bg-section-dark/15"
        )}
      >
        <div
          className={cn(
            "absolute top-1 size-4 rounded-full transition-all duration-300 shadow-sm",
            checked ? "left-6 bg-white" : "left-1 bg-white"
          )}
        />
      </button>
    </div>
  );
}
