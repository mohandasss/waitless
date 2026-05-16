import React from 'react';
import { Button } from "@/components/ui/button";

interface QueueBottomNavProps {
  onBack: () => void;
}

export const QueueBottomNav: React.FC<QueueBottomNavProps> = ({ onBack }) => {
  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-4 pt-2 shadow-[0px_-6px_20px_rgba(0,0,0,0.06)] dark:shadow-none bg-surface-container-lowest dark:bg-inverse-surface rounded-t-lg md:hidden">
      <Button variant="ghost" onClick={onBack} className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant px-3 py-1 hover:text-primary dark:hover:text-primary-fixed-dim transition-all h-auto p-0">
        <span className="material-symbols-outlined mb-1">home</span>
        <span className="font-meta-label text-meta-label text-[10px]">Home</span>
      </Button>
      <Button variant="ghost" className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant px-3 py-1 hover:text-primary dark:hover:text-primary-fixed-dim transition-all h-auto p-0">
        <span className="material-symbols-outlined mb-1">calendar_month</span>
        <span className="font-meta-label text-meta-label text-[10px]">Bookings</span>
      </Button>
      <Button variant="ghost" className="flex flex-col items-center justify-center text-primary dark:text-primary-fixed-dim bg-primary-fixed dark:bg-on-primary-fixed-variant rounded-xl px-3 py-1 scale-90 duration-200 h-auto p-0">
        <span className="material-symbols-outlined mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>hourglass_empty</span>
        <span className="font-meta-label text-meta-label text-[10px] font-bold">Queue</span>
      </Button>
      <Button variant="ghost" className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant px-3 py-1 hover:text-primary dark:hover:text-primary-fixed-dim transition-all h-auto p-0">
        <span className="material-symbols-outlined mb-1">favorite</span>
        <span className="font-meta-label text-meta-label text-[10px]">Saved</span>
      </Button>
      <Button variant="ghost" className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant px-3 py-1 hover:text-primary dark:hover:text-primary-fixed-dim transition-all h-auto p-0">
        <span className="material-symbols-outlined mb-1">person</span>
        <span className="font-meta-label text-meta-label text-[10px]">Profile</span>
      </Button>
    </nav>
  );
};

export default QueueBottomNav;
