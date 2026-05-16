import React from "react";
import { Users, Flame } from "lucide-react";

export function DashboardStatus() {
  return (
    <section className="flex flex-col gap-xs">
      <p className="font-meta-label text-meta-label text-on-surface-variant uppercase tracking-wider">Today's Status</p>
      <h2 className="font-headline-lg-mobile text-headline-lg-mobile">Busy</h2>
      <div className="flex gap-sm mt-sm">
        <span className="bg-surface-container text-on-surface px-4 py-2 rounded-full font-meta-label text-meta-label flex items-center gap-2">
          <Users className="h-[18px] w-[18px]" />
          42 Served Today
        </span>
        <span className="bg-error-container text-on-error-container px-4 py-2 rounded-full font-meta-label text-meta-label flex items-center gap-2">
          <Flame className="h-[18px] w-[18px]" />
          Peak Rush active
        </span>
      </div>
    </section>
  );
}
