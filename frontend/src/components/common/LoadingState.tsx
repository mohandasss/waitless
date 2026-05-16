import { Loader2 } from "lucide-react";

interface LoadingStateProps {
  message?: string;
  fullscreen?: boolean;
}

export function LoadingState({ message = "Loading...", fullscreen = false }: LoadingStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center p-8 ${fullscreen ? 'min-h-screen' : 'h-full'}`}>
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="mt-4 text-meta-label text-muted-foreground">{message}</p>
    </div>
  );
}
