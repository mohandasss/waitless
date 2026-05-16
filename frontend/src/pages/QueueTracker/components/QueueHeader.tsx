import React from 'react';
import { Button } from "@/components/ui/button";

interface QueueHeaderProps {
  onBack: () => void;
}

export const QueueHeader: React.FC<QueueHeaderProps> = ({ onBack }) => {
  return (
    <div className="flex justify-between items-center w-full px-container-padding py-md bg-surface sticky top-0 z-40">
      <Button
        onClick={onBack}
        variant="ghost"
        className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container-high text-on-surface hover:bg-surface-variant transition-colors p-0"
      >
        <span className="material-symbols-outlined">arrow_back</span>
      </Button>
      <h1 className="font-card-title text-card-title text-on-surface">Your Queue Status</h1>
      <div className="flex items-center bg-tertiary-container/10 px-3 py-1.5 rounded-full border border-tertiary-container/20">
        <div className="w-2 h-2 rounded-full bg-tertiary mr-2 animate-pulse"></div>
        <span className="font-meta-label text-meta-label text-tertiary font-bold tracking-wider uppercase text-[10px]">Live</span>
      </div>
    </div>
  );
};

export default QueueHeader;
