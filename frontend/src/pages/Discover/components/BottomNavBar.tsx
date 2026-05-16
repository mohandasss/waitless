import React from 'react';

export const BottomNavBar: React.FC = () => {
  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-4 pt-2 shadow-[0px_-6px_20px_rgba(0,0,0,0.06)] dark:shadow-none bg-surface-container-lowest dark:bg-inverse-surface rounded-t-lg">
      {/* Home (Active) */}
      <a className="flex flex-col items-center justify-center text-primary dark:text-primary-fixed-dim bg-primary-fixed dark:bg-on-primary-fixed-variant rounded-xl px-3 py-1 scale-90 duration-200" href="#">
        <span className="material-symbols-outlined mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
        <span className="font-meta-label text-meta-label">Home</span>
      </a>
      {/* Bookings */}
      <a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant px-3 py-1 hover:text-primary dark:hover:text-primary-fixed-dim transition-all" href="#">
        <span className="material-symbols-outlined mb-1">calendar_month</span>
        <span className="font-meta-label text-meta-label">Bookings</span>
      </a>
      {/* Queue */}
      <a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant px-3 py-1 hover:text-primary dark:hover:text-primary-fixed-dim transition-all" href="#">
        <span className="material-symbols-outlined mb-1">hourglass_empty</span>
        <span className="font-meta-label text-meta-label">Queue</span>
      </a>
      {/* Saved */}
      <a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant px-3 py-1 hover:text-primary dark:hover:text-primary-fixed-dim transition-all" href="#">
        <span className="material-symbols-outlined mb-1">favorite</span>
        <span className="font-meta-label text-meta-label">Saved</span>
      </a>
      {/* Profile */}
      <a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant px-3 py-1 hover:text-primary dark:hover:text-primary-fixed-dim transition-all" href="#">
        <span className="material-symbols-outlined mb-1">person</span>
        <span className="font-meta-label text-meta-label">Profile</span>
      </a>
    </nav>
  );
};

export default BottomNavBar;
