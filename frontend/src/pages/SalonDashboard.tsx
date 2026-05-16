import React, { useState, useEffect } from "react";
import { DashboardHeader } from "./SalonDashboard/DashboardHeader";
import { DashboardStatus } from "./SalonDashboard/DashboardStatus";
import { NowServingCard } from "./SalonDashboard/NowServingCard";
import { ActionGrid } from "./SalonDashboard/ActionGrid";
import { QueueList } from "./SalonDashboard/QueueList";
import { BottomNav } from "./SalonDashboard/BottomNav";
import { LoadingState } from "@/components/common/LoadingState";
import { ErrorState } from "@/components/common/ErrorState";

export default function SalonDashboard() {
  const [status, setStatus] = useState<"loading" | "error" | "success">("loading");

  useEffect(() => {
    document.title = "Luxe Studio Dashboard - QueueCut";
    // Simulate loading state
    const timer = setTimeout(() => {
      setStatus("success");
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (status === "loading") {
    return <LoadingState message="Loading dashboard..." fullscreen />;
  }

  if (status === "error") {
    return <ErrorState message="Failed to load dashboard" onRetry={() => setStatus("loading")} />;
  }

  return (
    <div className="bg-background text-on-background antialiased min-h-screen pb-32">
      <DashboardHeader />
      
      <main className="px-container-padding py-lg flex flex-col gap-xl max-w-3xl mx-auto">
        <DashboardStatus />
        <NowServingCard />
        <ActionGrid />
        <QueueList />
      </main>

      <BottomNav />
    </div>
  );
}
