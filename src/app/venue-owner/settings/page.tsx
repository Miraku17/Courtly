"use client";

import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="flex size-16 items-center justify-center rounded-2xl bg-white/[0.06] mb-4">
        <Settings size={28} className="text-text-muted/60" />
      </div>
      <h1 className="text-[1.5rem] font-bold text-white mb-2">Settings</h1>
      <p className="text-text-muted/50 max-w-[400px]">
        Manage your account, notification preferences, and payment settings.
      </p>
    </div>
  );
}
