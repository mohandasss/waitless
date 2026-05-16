import React from 'react';
import { Button } from "@/components/ui/button";

interface QueueActionsProps {
  onNotifyToggle: () => void;
  onLeaveQueue: () => void;
}

export const QueueActions: React.FC<QueueActionsProps> = ({
  onNotifyToggle,
  onLeaveQueue
}) => {
  return (
    <section className="flex flex-col gap-md pt-md pb-xl">
      <Button
        onClick={onNotifyToggle}
        className="w-full bg-primary !text-white hover:bg-primary-container text-on-primary font-body-cta text-body-cta py-4 px-lg rounded-full shadow-[0px_4px_12px_rgba(186,0,54,0.2)] transition-all flex justify-center items-center gap-2 h-auto"
      >
        <span className="material-symbols-outlined">notifications_active</span>
        Notify Me Near Turn
      </Button>
      <Button
        onClick={onLeaveQueue}
        variant="ghost"
        className="w-full bg-transparent text-on-surface-variant hover:text-on-surface font-body-cta text-body-cta py-3 transition-colors text-center border border-transparent hover:border-surface-variant rounded-full h-auto"
      >
        Leave Queue
      </Button>
    </section>
  );
};

export default QueueActions;
