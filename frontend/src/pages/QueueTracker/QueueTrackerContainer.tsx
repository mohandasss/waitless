import React, { useState, useEffect } from 'react';
import { QueueTracker } from './QueueTracker';
import { useNavigate } from 'react-router-dom';
import { useNotificationStore } from '@/store/useNotificationStore';

export const QueueTrackerContainer: React.FC = () => {
  const navigate = useNavigate();
  const addNotification = useNotificationStore((state) => state.addNotification);
  const [isLoading, setIsLoading] = useState(true);
  
  // Mock State to match template
  const [queueStatus] = useState({
    tokenNumber: 18,
    estimatedWaitMins: 32,
    currentlyServing: 15,
    aheadOfYou: 3,
    joinedAt: "4:58 PM"
  });

  const [visitDetails] = useState({
    service: "Haircut",
    duration: "45 mins",
    location: "Luxe Studio, 124 Grand Ave",
    isPeakRush: true
  });

  useEffect(() => {
    // Simulate API loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleLeaveQueue = () => {
    if (window.confirm("Are you sure you want to leave the queue?")) {
        addNotification({message: "You have successfully left the queue.", type: "success"});
      navigate('/');
    }
  };

  const handleNotifyToggle = () => {
    addNotification({message: "We will notify you when your turn is approaching.", type: "info"});
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <QueueTracker 
      queueStatus={queueStatus}
      visitDetails={visitDetails}
      isLoading={isLoading}
      error={null}
      onLeaveQueue={handleLeaveQueue}
      onNotifyToggle={handleNotifyToggle}
      onBack={handleBack}
    />
  );
};

export default QueueTrackerContainer;
