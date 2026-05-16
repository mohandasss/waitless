import React, { useMemo, useState, useEffect, useRef } from 'react';
import { motion, animate } from 'framer-motion';

interface QueueHeroCardProps {
  tokenNumber: number;
  estimatedWaitMins: number;
  currentlyServing: number;
  aheadOfYou: number;
  joinedAt: string;
  visitDetails: {
    service: string;
    duration: string;
    location: string;
    isPeakRush: boolean;
  };
}

interface ParticleConfig {
  id: number;
  initialX: number;
  initialY: number;
  animateKeyframes: { x: number[]; y: number[]; opacity: number[]; scale: number[] };
  duration: number;
  delay: number;
  color: string;
}

const generateParticlesConfig = (count: number): ParticleConfig[] => {
  const colors = [
    'rgba(99, 102, 241, 0.35)',
    'rgba(56, 189, 248, 0.35)',
    'rgba(45, 212, 191, 0.25)',
  ];
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    initialX: Math.random() * 100 - 50,
    initialY: Math.random() * 100 - 50,
    animateKeyframes: {
      x: Array.from({ length: 4 }, () => Math.random() * 200 - 100),
      y: Array.from({ length: 4 }, () => Math.random() * 200 - 100),
      opacity: [0.4, 0.7, 0.4, 0.7, 0.4],
      scale: [1, 1.4, 1],
    },
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 5,
    color: colors[i % colors.length],
  }));
};

export const QueueHeroCard: React.FC<QueueHeroCardProps> = ({
  tokenNumber,
  estimatedWaitMins,
  currentlyServing,
  aheadOfYou,
  joinedAt,
  visitDetails,
}) => {
  const particlesConfig = useMemo(() => generateParticlesConfig(6), []);
  const [showBack, setShowBack] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);

  const HALF = 0.18;

  const handleFlip = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const outEl = showBack ? backRef.current : frontRef.current;
    const inEl  = showBack ? frontRef.current : backRef.current;
    if (!outEl || !inEl) return;

    animate(outEl, { scaleX: 0 }, {
      duration: HALF,
      ease: [0.4, 0, 1, 1],
      onComplete: () => {
        setShowBack(prev => !prev);
        animate(inEl, { scaleX: [0, 1] }, {
          duration: HALF,
          ease: [0, 0, 0.6, 1],
          onComplete: () => setIsAnimating(false),
        });
      },
    });
  };

  useEffect(() => {
    if (frontRef.current) frontRef.current.style.transform = 'scaleX(1)';
    if (backRef.current)  backRef.current.style.transform  = 'scaleX(0)';
  }, []);

  return (
    <div
      className="w-full max-w-sm mx-auto cursor-pointer relative h-[300px]"
      onClick={handleFlip}
    >
      {/* FRONT */}
      <div
        ref={frontRef}
        className="absolute inset-0 rounded-2xl shadow-[0px_8px_30px_rgba(0,0,0,0.08)] flex flex-col items-center border border-white/20 overflow-hidden bg-surface-container-lowest"
      >
        {/*
          Particles are in an isolated stacking context.
          isolation:isolate prevents their GPU filter promotion
          from bleeding up into the parent card or sibling text layer.
        */}
        <div
          className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex items-center justify-center"
          style={{ isolation: 'isolate' }}
        >
          {particlesConfig.map(config => (
            <motion.div
              key={config.id}
              initial={{ x: config.initialX, y: config.initialY, opacity: 0.4, scale: 1 }}
              animate={{
                x: [...config.animateKeyframes.x, config.initialX],
                y: [...config.animateKeyframes.y, config.initialY],
                opacity: config.animateKeyframes.opacity,
                scale: config.animateKeyframes.scale,
              }}
              transition={{ duration: config.duration, delay: config.delay, repeat: Infinity, ease: 'linear' }}
              style={{ background: config.color }}
              className="absolute rounded-full w-40 h-40 blur-[60px]"
            />
          ))}
          {/* Solid overlay — NOT backdrop-filter */}
          <div className="absolute inset-0 bg-surface-container-lowest/50" />
          <div className="absolute inset-0 bg-gradient-to-br from-white/8 via-transparent to-black/5" />
        </div>

        {/* Text layer — zero GPU filters, renders natively crisp */}
        <div className="z-10 flex flex-col items-center w-full relative h-full justify-between p-6">
          <span className="text-on-surface-variant mb-1 uppercase tracking-widest text-[11px] font-semibold">
            Your Token
          </span>

          <span className="text-on-surface text-[48px] leading-none font-bold tracking-tight">
            #{tokenNumber}
          </span>

          <div className="w-full h-px bg-surface-variant/40 my-2" />

          <div className="flex flex-col items-center gap-0.5">
            <span className="text-on-surface font-semibold text-[24px] leading-tight">
              Approx {estimatedWaitMins} mins
            </span>
            <span className="text-on-surface-variant text-xs">
              Estimated wait time
            </span>
          </div>

          {/* Sub-card: solid bg replaces backdrop-blur-xl */}
          <div className="w-full bg-white/15 rounded-xl px-4 py-3 flex justify-between items-center border border-white/20">
            <div className="flex flex-col">
              <span className="text-on-surface-variant text-[10px] mb-0.5">Currently Serving</span>
              <span className="text-primary font-bold text-base">#{currentlyServing}</span>
            </div>
            <div className="w-px h-6 bg-surface-variant/50" />
            <div className="flex flex-col items-end">
              <span className="text-on-surface-variant text-[10px] mb-0.5">Ahead of You</span>
              <span className="text-on-surface font-bold text-base">
                {aheadOfYou} {aheadOfYou === 1 ? 'customer' : 'customers'}
              </span>
            </div>
          </div>

          <div className="flex justify-between w-full items-center mt-2">
            <span className="text-on-surface-variant/60 text-[10px]">Joined at {joinedAt}</span>
            <span className="text-primary text-[10px] font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-[12px]">flip</span>
              Flip for details
            </span>
          </div>
        </div>
      </div>

      {/* BACK */}
      <div
        ref={backRef}
        className="absolute inset-0 bg-surface-container-lowest rounded-2xl p-6 shadow-[0px_8px_30px_rgba(0,0,0,0.08)] flex flex-col border border-white/20 overflow-hidden"
      >
        <div className="flex flex-col h-full justify-between">
          <div className="flex justify-between items-center border-b border-surface-variant/30 pb-2">
            <h3 className="text-on-surface font-semibold text-base">Visit Details</h3>
            {visitDetails.isPeakRush && (
              <span className="bg-error-container/40 text-error px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-0.5 uppercase border border-error/20">
                <span className="material-symbols-outlined text-[12px]">trending_up</span>
                Peak
              </span>
            )}
          </div>

          <div className="flex flex-col gap-3 py-3 flex-1 justify-center">
            <div className="flex justify-between items-center">
              <span className="text-on-surface-variant text-sm">Service</span>
              <span className="text-on-surface font-medium text-sm">{visitDetails.service}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-on-surface-variant text-sm">Est. Duration</span>
              <span className="text-on-surface font-medium text-sm">{visitDetails.duration}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-on-surface-variant text-sm">Location</span>
              <div className="flex justify-between items-center">
                <span className="text-on-surface font-medium text-sm truncate max-w-[80%]">{visitDetails.location}</span>
                <span className="material-symbols-outlined text-primary cursor-pointer">map</span>
              </div>
            </div>
          </div>

          <div className="flex justify-between w-full items-center border-t border-surface-variant/30 pt-2">
            <span className="text-on-surface-variant/60 text-[10px]">Tap anywhere to go back</span>
            <span className="text-primary text-[10px] font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-[12px]">flip</span>
              Flip back
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueueHeroCard;