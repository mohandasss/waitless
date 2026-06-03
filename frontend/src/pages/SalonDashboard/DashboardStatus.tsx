import React from "react";
import { Users, Flame } from "lucide-react";
import useTodayAnalytics from "@/hooks/useAnalytics";

export function DashboardStatus() {
  // TODO: replace '28' with real salonId from auth
  const { data } = useTodayAnalytics("28");
  
  
  //@ts-expect-error
  const served = data?.customersServed ?? 0;
  //@ts-expect-error
  const peakHour = data?.peakHour ?? null;
  //@ts-expect-error
  const revenue = data?.revenue ?? 0;
  //@ts-expect-error
  const topService = data?.topService ?? "-";

  return (
    <section className="flex flex-col gap-xs">
      <p className="font-meta-label text-meta-label text-on-surface-variant uppercase tracking-wider">Today's Status</p>
      
      <h2 className="font-headline-lg-mobile text-headline-lg-mobile">{data?.status ?? "Busy"}</h2>
      <div className="flex gap-sm mt-sm">
        <span className="bg-surface-container text-on-surface px-4 py-2 rounded-full font-meta-label text-meta-label flex items-center gap-2">
          <Users className="h-[18px] w-[18px]" />
          {served} Served Today
        </span>
        <span className={`px-4 py-2 rounded-full font-meta-label text-meta-label flex items-center gap-2 ${peakHour ? "bg-error-container text-on-error-container" : "bg-surface-container text-on-surface"}`}>
          <Flame className="h-[18px] w-[18px]" />
          {peakHour ? `Peak: ${peakHour}` : "No peak"}
        </span>
      </div>
      <div className="flex gap-sm mt-sm items-center">
        <div className="font-body-md">Top service: <strong>{topService}</strong></div>
        <div className="font-body-md ml-sm">Revenue: <strong>₹{revenue}</strong></div>
      </div>
    </section>
  );
}
