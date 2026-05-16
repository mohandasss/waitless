import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({ message = "Something went wrong", onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 h-full text-center">
      <AlertCircle className="h-10 w-10 text-destructive mb-4" />
      <h3 className="text-card-title text-on-surface font-semibold mb-2">{message}</h3>
      <p className="text-meta-label text-muted-foreground mb-6">Please try again or contact support if the problem persists.</p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline" className="rounded-full">
          <RefreshCw className="mr-2 h-4 w-4" />
          Retry
        </Button>
      )}
    </div>
  );
}
