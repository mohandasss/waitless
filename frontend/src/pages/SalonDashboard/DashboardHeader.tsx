import React from "react";
import { Scissors } from "lucide-react";
import stylistHeadshot from "@/assets/stylist_headshot.png";

export function DashboardHeader() {
  return (
    <header className="bg-surface dark:bg-on-background flex justify-between items-center w-full px-container-padding py-md sticky top-0 z-40 flat no shadows">
      <div className="flex items-center gap-sm">
        <Scissors className="h-6 w-6 text-primary dark:text-primary-fixed-dim" />
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-primary dark:text-primary-fixed-dim">Paradise Parlour</h1>
      </div>
      <div className="flex items-center gap-sm">
        <span className="inline-flex items-center justify-center bg-tertiary-container text-on-tertiary-container px-3 py-1 rounded-full font-meta-label text-meta-label">
          <span className="w-2 h-2 rounded-full bg-tertiary mr-2 animate-pulse"></span>
          Live
        </span>
        <img
          alt="Stylist profile"
          className="w-10 h-10 rounded-full object-cover border-2 border-surface-container"
          src={stylistHeadshot}
        />
      </div>
    </header>
  );
}

