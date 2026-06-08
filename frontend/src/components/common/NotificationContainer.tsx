import React, { useEffect, useState } from 'react';
import { useNotificationStore, NotificationType, Notification } from '@/store/useNotificationStore';
import { CheckCircle, XCircle, AlertCircle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

const icons: Record<NotificationType, React.ReactNode> = {
  success: <CheckCircle className="h-4 w-4 text-green-500" />,
  error: <XCircle className="h-4 w-4 text-red-500" />,
  warning: <AlertCircle className="h-4 w-4 text-yellow-500" />,
  info: <Info className="h-4 w-4 text-blue-500" />,
};

const bgColors: Record<NotificationType, string> = {
  success: 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800',
  error: 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800',
  warning: 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800',
  info: 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800',
};

const NotificationItem: React.FC<{ notification: Notification }> = ({ notification }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const duration = notification.duration || 3000;
    const exitDelay = Math.max(0, duration - 300);

    // Start exit animation before the notification is removed from the store
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, exitDelay);

    return () => clearTimeout(exitTimer);
  }, [notification.duration]);

  return (
    <div
      className={cn(
        "flex items-center gap-2 px-3 py-1.5 rounded-full border shadow-sm backdrop-blur-sm pointer-events-auto",
        "transition-all duration-300 ease-in-out",
        isExiting
          ? "animate-out slide-out-to-bottom-full opacity-0"
          : "animate-in slide-in-from-bottom-full",
        bgColors[notification.type]
      )}
      role="alert"
    >
      <div className="flex-shrink-0">
        {icons[notification.type]}
      </div>
      <p className="text-xs font-medium text-gray-900 dark:text-gray-100 whitespace-nowrap">
        {notification.message}
      </p>
    </div>
  );
};

export const NotificationContainer: React.FC = () => {
  const { notifications } = useNotificationStore();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed  bottom-32 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center space-y-2 pointer-events-none">
      {notifications.map((notification) => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}
    </div>
  );
};
