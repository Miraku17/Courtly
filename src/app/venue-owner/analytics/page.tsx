"use client";

import { BarChart3 } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="flex size-16 items-center justify-center rounded-2xl bg-emerald-500/10 mb-4">
        <BarChart3 size={28} className="text-emerald-400" />
      </div>
      <h1 className="text-[1.5rem] font-bold text-white mb-2">Analytics</h1>
      <p className="text-text-muted/50 max-w-[400px]">
        Track revenue, occupancy rates, and booking trends across your venues.
      </p>
    </div>
  );
}
