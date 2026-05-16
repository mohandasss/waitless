import React from 'react';

interface SmartArrivalCardProps {
  bestToReachMins: number;
}

export const SmartArrivalCard: React.FC<SmartArrivalCardProps> = ({ bestToReachMins }) => {
  return (
    <section className="bg-surface-variant/30 border border-outline-variant/30 rounded-lg p-md flex items-start gap-md">
      <div className="w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center shadow-sm shrink-0">
        <span className="material-symbols-outlined text-primary">directions_walk</span>
      </div>
      <div className="flex flex-col gap-xs">
        <span className="font-wait-time text-wait-time text-on-surface">Best to reach in ~{bestToReachMins} mins</span>
        <span className="font-meta-label text-meta-label text-on-surface-variant">Based on typical service times, plan your arrival to minimize waiting.</span>
      </div>
    </section>
  );
};

export default SmartArrivalCard;
