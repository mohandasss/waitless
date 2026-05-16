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

interface HeroSalonCardProps {
  heroSalon: Salon;
  onJoinQueue: (salonId: string) => void;
  onBookSlot: (salonId: string) => void;
}

export const HeroSalonCard: React.FC<HeroSalonCardProps> = ({
  heroSalon,
  onJoinQueue,
  onBookSlot,
}) => {
  return (
    <article className="relative bg-surface rounded-lg shadow-[0px_8px_24px_rgba(0,0,0,0.06)] border border-surface-container-highest overflow-hidden mb-xl">
      {/* Image Area */}
      <div className="relative w-full h-[240px] bg-surface-container-high">
        <img 
          className="w-full h-full object-cover" 
          alt={heroSalon.name}
          src={heroSalon.image} 
        />
        {/* Floating Badges */}
        <div className="absolute top-md left-md flex gap-sm">
          {heroSalon.badges?.includes('Open Now') && (
            <span className="bg-surface/90 backdrop-blur-sm text-tertiary-container font-meta-label text-meta-label px-sm py-xs rounded-full flex items-center gap-xs shadow-sm">
              <span className="w-2 h-2 rounded-full bg-tertiary"></span> Open Now
            </span>
          )}
          {heroSalon.badges?.includes('Low Wait') && (
            <span className="bg-surface/90 backdrop-blur-sm text-primary font-meta-label text-meta-label px-sm py-xs rounded-full shadow-sm">
              Low Wait
            </span>
          )}
        </div>
        {/* Save Button */}
        <Button variant="ghost" size="icon" className="absolute top-md right-md w-10 h-10 bg-surface/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm text-on-surface-variant hover:text-primary transition-colors">
          <span className="material-symbols-outlined">favorite</span>
        </Button>
      </div>
      {/* Content Area */}
      <div className="p-gutter">
        <div className="flex justify-between items-start mb-sm">
          <div>
            <h2 className="font-card-title text-card-title text-on-surface mb-xs">{heroSalon.name}</h2>
            <div className="flex items-center gap-xs font-meta-label text-meta-label text-on-surface-variant">
              <span className="material-symbols-outlined text-[16px] text-[#F59E0B]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="font-wait-time text-on-surface">{heroSalon.rating}</span>
              <span>•</span>
              <span>{heroSalon.distance}</span>
              <span>•</span>
              <span>{heroSalon.price}</span>
            </div>
          </div>
        </div>
        {/* Queue Status Box */}
        <div className="bg-surface-container-low rounded-[16px] p-md flex items-center justify-between mb-lg border border-surface-variant">
          <div className="flex items-center gap-md">
            <div className="w-12 h-12 bg-primary-container/10 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>hourglass_bottom</span>
            </div>
            <div>
              <p className="font-meta-label text-meta-label text-on-surface-variant mb-[2px]">Live Queue</p>
              <p className="font-wait-time text-wait-time text-on-surface"><span className="font-card-title text-primary">{heroSalon.queue.waiting}</span> waiting</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-meta-label text-meta-label text-on-surface-variant mb-[2px]">Est. Time</p>
            <p className="font-card-title text-card-title text-on-surface">{heroSalon.queue.estTime}</p>
          </div>
        </div>
        {/* Actions */}
        <div className="flex gap-md">
          <Button 
            onClick={() => onJoinQueue(heroSalon.id)}
            className="flex-1 bg-primary !text-white text-on-primary font-body-cta text-body-cta py-md rounded-full shadow-[0px_4px_12px_rgba(186,0,54,0.2)] hover:bg-primary/90 transition-colors h-auto"
          >
            Join Queue
          </Button>
          <Button 
            onClick={() => onBookSlot(heroSalon.id)}
            variant="outline"
            className="flex-1 bg-surface border border-outline-variant text-on-surface font-body-cta text-body-cta py-md rounded-full hover:bg-surface-container-low transition-colors h-auto"
          >
            Book Slot
          </Button>
        </div>
      </div>
    </article>
  );
};

export default HeroSalonCard;
