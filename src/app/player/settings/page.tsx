"use client";

import { useState, useEffect } from "react";
import { User, Bell, Lock, Trash2, Camera, Mail, Phone, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getProfile, updateProfile } from "@/lib/api/profiles";
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
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-1">Settings</h1>
        <p className="text-text-muted/60 text-sm sm:text-base">Manage your profile, notifications, and security.</p>
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
                    ? "bg-primary text-text-dark"
                    : "text-text-muted/60 hover:bg-white/[0.04] hover:text-white"
                )}
              >
                <item.icon size={16} className={cn(activeSection === item.key ? "text-text-dark" : "group-hover:text-primary transition-colors")} />
                <span>{item.label}</span>
                {activeSection === item.key && <ChevronRight size={14} className="ml-auto hidden lg:block" />}
              </button>
            ))}
          </div>

          <div className="hidden lg:block pt-6 mt-6 border-t border-white/[0.06]">
            <button className="flex items-center gap-2.5 w-full px-5 py-3 rounded-xl text-red-400/70 hover:bg-red-400/[0.05] hover:text-red-400 transition-all font-bold text-sm">
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
          className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 sm:p-8 lg:p-10"
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="size-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="relative group">
          <div className="size-24 rounded-2xl bg-primary/15 border-2 border-dashed border-primary/30 flex items-center justify-center text-primary overflow-hidden">
            <User size={48} strokeWidth={1.5} />
          </div>
          <button className="absolute -bottom-1 -right-1 size-8 rounded-lg bg-primary text-text-dark flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
            <Camera size={14} />
          </button>
        </div>
        <div className="text-center sm:text-left">
          <h3 className="text-lg font-bold text-white mb-1">Profile Picture</h3>
          <p className="text-text-muted/40 text-sm">JPG, GIF or PNG. Max 800K</p>
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
          className="px-8 py-3 rounded-xl bg-primary text-text-dark font-bold text-sm hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
        <h3 className="text-lg font-bold text-white mb-1">Notification Preferences</h3>
        <p className="text-text-muted/40 text-sm">Choose how and when you want to be notified.</p>
      </div>
      <div className="space-y-3">
        <ToggleItem label="Email Notifications" description="Updates about bookings and venue news." defaultChecked />
        <ToggleItem label="Booking Reminders" description="Get notified 24h before scheduled games." defaultChecked />
        <ToggleItem label="Special Offers" description="Discounts and events from your favorite venues." />
        <ToggleItem label="SMS Alerts" description="Text message updates for urgent changes." />
      </div>
      <div className="flex justify-end pt-2">
        <button className="px-8 py-3 rounded-xl bg-primary text-text-dark font-bold text-sm hover:brightness-110 transition-all">
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
        <h3 className="text-lg font-bold text-white mb-1">Change Password</h3>
        <p className="text-text-muted/40 text-sm">Update your password to keep your account secure.</p>
      </div>
      <div className="space-y-5 max-w-md">
        <SettingsInput label="Current Password" type="password" placeholder="Enter current password" />
        <SettingsInput label="New Password" type="password" placeholder="Enter new password" />
        <SettingsInput label="Confirm Password" type="password" placeholder="Confirm new password" />
      </div>
      <div className="flex justify-end pt-2">
        <button className="px-8 py-3 rounded-xl bg-primary text-text-dark font-bold text-sm hover:brightness-110 transition-all">
          Update Password
        </button>
      </div>
    </div>
  );
}

function SettingsInput({ label, icon: Icon, ...props }: any) {
  return (
    <div className="space-y-1.5">
      <label className="text-[11px] font-bold uppercase tracking-wider text-text-muted/40 px-0.5">{label}</label>
      <div className="relative group">
        {Icon && (
          <Icon
            className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted/30 group-focus-within:text-primary transition-colors"
            size={16}
          />
        )}
        <input
          {...props}
          className={cn(
            "w-full bg-white/[0.03] border border-white/[0.06] rounded-xl py-3 pr-4 text-white text-sm focus:outline-none focus:border-primary/40 transition-all placeholder:text-text-muted/20",
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
    <div className="flex items-center justify-between p-4 sm:p-5 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.08] transition-all gap-4">
      <div className="min-w-0">
        <div className="text-sm text-white font-bold">{label}</div>
        <div className="text-text-muted/40 text-xs mt-0.5">{description}</div>
      </div>
      <button
        onClick={() => setChecked(!checked)}
        className={cn(
          "relative w-11 h-6 rounded-full transition-all duration-300 flex-shrink-0",
          checked ? "bg-primary" : "bg-white/[0.08]"
        )}
      >
        <div
          className={cn(
            "absolute top-1 size-4 rounded-full transition-all duration-300 shadow-sm",
            checked ? "left-6 bg-text-dark" : "left-1 bg-white/60"
          )}
        />
      </button>
    </div>
  );
}
