import React from 'react';
import PremiumQueueStepper from './PremiumQueueStepper';
import { Button } from "@/components/ui/button";
import { QueueHeader } from './components/QueueHeader';
import { QueueHeroCard } from './components/QueueHeroCard';
import { SmartArrivalCard } from './components/SmartArrivalCard';
import { VisitDetailsCard } from './components/VisitDetailsCard';
import { QueueActions } from './components/QueueActions';
import { QueueBottomNav } from './components/QueueBottomNav';

export interface QueueTrackerProps {
  queueStatus: {
    tokenNumber: number;
    estimatedWaitMins: number;
    currentlyServing: number;
    aheadOfYou: number;
    joinedAt: string;
  };
  visitDetails: {
    service: string;
    duration: string;
    location: string;
    isPeakRush: boolean;
  };
  isLoading: boolean;
  error: string | null;
  onLeaveQueue: () => void;
  onNotifyToggle: () => void;
  onBack: () => void;
}

export const QueueTracker: React.FC<QueueTrackerProps> = ({
  queueStatus,
  visitDetails,
  isLoading,
  error,
  onLeaveQueue,
  onNotifyToggle,
  onBack
}) => {
  if (isLoading) {
    return (
      <div className="bg-surface text-on-surface font-sans antialiased min-h-screen flex flex-col pb-32 items-center justify-center">
        <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
        <p className="mt-4 font-meta-label text-on-surface-variant">Loading queue status...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-surface text-on-surface font-sans antialiased min-h-screen flex flex-col pb-32 items-center justify-center px-container-padding">
        <span className="material-symbols-outlined text-error text-4xl mb-4">error</span>
        <h2 className="font-card-title text-card-title text-on-surface mb-2">Something went wrong</h2>
        <p className="font-meta-label text-on-surface-variant text-center mb-6">{error}</p>
        <Button
          onClick={onBack}
          className="bg-primary text-on-primary px-6 py-2 rounded-full font-body-cta h-auto"
        >
          Go Back
        </Button>
      </div>
    );
  }

  const { tokenNumber, estimatedWaitMins, currentlyServing, aheadOfYou, joinedAt } = queueStatus;
  const { service, duration, location, isPeakRush } = visitDetails;

  const bestToReachMins = Math.max(0, estimatedWaitMins - 12);

  return (
    <div className="bg-surface text-on-surface antialiased min-h-screen flex flex-col pb-20">
      <QueueHeader onBack={onBack} />

      <main className="flex-1 px-container-padding pt-md pb-xl flex flex-col gap-xl max-w-md mx-auto w-full">
        <QueueHeroCard
          tokenNumber={tokenNumber}
          estimatedWaitMins={estimatedWaitMins}
          currentlyServing={currentlyServing}
          aheadOfYou={aheadOfYou}
          joinedAt={joinedAt}
          visitDetails={visitDetails}
        />

        <section className="flex flex-col gap-md">
          <PremiumQueueStepper 
            currentServing={currentlyServing} 
            yourNumber={tokenNumber} 
            onNotifyToggle={onNotifyToggle}
            onLeaveQueue={onLeaveQueue}
          />
        </section>


      </main>

      <QueueBottomNav onBack={onBack} />
    </div>
  );
};

export default QueueTracker;
