import React, { useRef, useState, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import mp4Video from "@/assets/mp_.mp4";

export function LoginHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8; // Slo-mo
      videoRef.current.preservesPitch = true; // Keep sound normal
    }
  }, []);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video) {
      // Last 2 second cut
      if (video.duration && video.currentTime >= video.duration - 3.5) {
        video.currentTime = 0;
        video.play();
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <section className="mt-sm mb-md">
      <div className="rounded-md overflow-hidden mb-lg relative aspect-[16/9] shadow-[0px_6px_20px_rgba(0,0,0,0.06)]">
        <video
          ref={videoRef}
          src={mp4Video}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="w-full h-full object-cover"
          onTimeUpdate={handleTimeUpdate}
        />
        <Button
          variant="ghost"
          size="icon-xs"
          onClick={toggleMute}
          className="absolute bottom-2 right-2 bg-black/50 text-white rounded-full backdrop-blur-sm hover:bg-black/70 hover:text-white transition-colors"
        >
          {isMuted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
        </Button>
      </div>
      {/* <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface mb-sm">Run your queue smarter</h2>
      <p className="font-meta-label text-meta-label text-on-surface-variant">Simple queue control for local salons</p> */}
    </section>
  );
}
