import React from 'react';
import { Button } from "@/components/ui/button";

interface QueueInfo {
  waiting: number;
  estTime: string;
}

interface Salon {
  id: string;
  name: string;
  rating: number;
  distance: string;
  price: string;
  image: string;
  badges?: string[];
  queue: QueueInfo;
}

interface SalonListItemProps {
  salon: Salon;
  onJoinQueue: (salonId: string) => void;
}

export const SalonListItem: React.FC<SalonListItemProps> = ({
  salon,
  onJoinQueue,
}) => {
  return (
    <article className="flex gap-md bg-surface p-sm rounded-[24px] shadow-[0px_4px_16px_rgba(0,0,0,0.04)] border border-surface-container-high relative">
      {/* Image */}
      <div className="w-[110px] h-[130px] shrink-0 rounded-[16px] overflow-hidden relative">
        <img className="w-full h-full object-cover" src={salon.image} alt={salon.name} />
        <Button variant="ghost" size="icon" className="absolute top-sm right-sm w-8 h-8 bg-surface/90 backdrop-blur-sm rounded-full flex items-center justify-center text-on-surface-variant shadow-sm">
          <span className="material-symbols-outlined text-[18px]">favorite</span>
        </Button>
        {salon.badges?.includes('Walk-in') && (
          <div className="absolute bottom-sm left-sm bg-surface/90 backdrop-blur-sm text-tertiary-container font-meta-label text-[10px] px-xs py-[2px] rounded-sm font-medium">
            Walk-in
          </div>
        )}
      </div>
      {/* Details */}
      <div className="py-xs pr-sm flex flex-col justify-between flex-1">
        <div>
          <div className="flex justify-between items-start">
            <h4 className="font-wait-time text-wait-time text-on-surface line-clamp-1">{salon.name}</h4>
            <div className="flex items-center gap-[2px] bg-surface-container p-xs rounded-lg">
              <span className="material-symbols-outlined text-[14px] text-[#F59E0B]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="font-meta-label text-meta-label font-medium">{salon.rating}</span>
            </div>
          </div>
          <p className="font-meta-label text-meta-label text-on-surface-variant mt-xs">{salon.distance} • {salon.price}</p>
        </div>
        <div className="flex items-end justify-between mt-sm">
          <div className="bg-surface-container-low px-sm py-xs rounded-[12px] border border-surface-variant">
            <p className="font-meta-label text-meta-label text-on-surface-variant text-[12px]">Wait Time</p>
            <p className="font-wait-time text-wait-time text-primary">{salon.queue.estTime} <span className="text-on-surface-variant font-normal text-[12px]">({salon.queue.waiting} wait)</span></p>
          </div>
          <Button 
            onClick={() => onJoinQueue(salon.id)}
            className="bg-on-surface !text-white text-surface px-md py-sm rounded-full font-meta-label text-meta-label font-medium shadow-sm hover:bg-on-surface/90 h-auto"
          >
            Join
          </Button>
        </div>
      </div>
    </article>
  );
};

export default SalonListItem;
