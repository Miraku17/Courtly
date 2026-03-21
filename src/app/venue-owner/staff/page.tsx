"use client";

import { Users } from "lucide-react";

export default function StaffPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10 mb-4">
        <Users size={28} className="text-primary" />
      </div>
      <h1 className="text-[1.5rem] font-bold text-white mb-2">Staff</h1>
      <p className="text-text-muted/50 max-w-[400px]">
        Manage your team members, assign roles, and track staff schedules.
      </p>
    </div>
  );
}
