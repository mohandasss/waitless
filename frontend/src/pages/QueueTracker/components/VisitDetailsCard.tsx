import React from 'react';
import { Button } from "@/components/ui/button";

interface VisitDetailsCardProps {
  service: string;
  duration: string;
  location: string;
  isPeakRush: boolean;
}

export const VisitDetailsCard: React.FC<VisitDetailsCardProps> = ({
  service,
  duration,
  location,
  isPeakRush
}) => {
  return (
    <section className="flex flex-col gap-md">
      <div className="flex justify-between items-center">
        <h3 className="font-card-title text-card-title text-on-surface">Visit Details</h3>
        {isPeakRush && (
          <span className="bg-error-container/50 text-on-error-container px-2 py-1 rounded-full font-meta-label text-meta-label text-[11px] font-semibold flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">trending_up</span>
            Peak Rush
          </span>
        )}
      </div>
      <div className="bg-surface-container-lowest rounded-lg border border-surface-variant p-md flex flex-col gap-sm">
        <div className="flex justify-between items-center py-sm border-b border-surface-variant/50">
          <span className="font-meta-label text-meta-label text-on-surface-variant">Service</span>
          <span className="font-wait-time text-wait-time text-on-surface font-medium">{service}</span>
        </div>
        <div className="flex justify-between items-center py-sm border-b border-surface-variant/50">
          <span className="font-meta-label text-meta-label text-on-surface-variant">Est. Duration</span>
          <span className="font-wait-time text-wait-time text-on-surface font-medium">{duration}</span>
        </div>
        <div className="flex flex-col gap-1 pt-sm">
          <span className="font-meta-label text-meta-label text-on-surface-variant">Location</span>
          <span className="font-wait-time text-wait-time text-on-surface font-medium">{location}</span>
          <Button variant="link" className="font-meta-label text-meta-label text-primary font-medium mt-1 flex items-center gap-1 self-start hover:underline p-0 h-auto">
            <span className="material-symbols-outlined text-[16px]">map</span> View Map
          </Button>
        </div>
      </div>
    </section>
  );
};

export default VisitDetailsCard;
