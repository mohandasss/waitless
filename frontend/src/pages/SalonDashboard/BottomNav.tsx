import React from "react";
import { LayoutDashboard, ListOrdered, Users, User } from "lucide-react";

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-sm pb-md pt-md bg-surface dark:bg-on-background shadow-[0px_-6px_20px_rgba(0,0,0,0.06)] rounded-t-lg md:hidden">
      <a className="flex flex-col items-center justify-center bg-primary-fixed dark:bg-primary-container text-on-primary-fixed dark:text-on-primary-container rounded-lg px-4 py-2 hover:text-primary dark:hover:text-primary-fixed-dim transition-all active:scale-90 duration-150" href="#">
        <LayoutDashboard className="h-6 w-6" />
        {/* <span className="font-meta-label text-meta-label mt-1">Dashboard</span> */}
      </a>
      <a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant px-4 py-2 hover:text-primary dark:hover:text-primary-fixed-dim transition-all" href="#">
        <ListOrdered className="h-6 w-6" />
        {/* <span className="font-meta-label text-meta-label mt-1">Queue</span> */}
      </a>
      <a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant px-4 py-2 hover:text-primary dark:hover:text-primary-fixed-dim transition-all" href="#">
        <Users className="h-6 w-6" />
        {/* <span className="font-meta-label text-meta-label mt-1">Customers</span> */}
      </a>
      <a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant px-4 py-2 hover:text-primary dark:hover:text-primary-fixed-dim transition-all" href="#">
        <User className="h-6 w-6" />
        {/* <span className="font-meta-label text-meta-label mt-1">Profile</span> */}
      </a>
    </nav>
  );
}
