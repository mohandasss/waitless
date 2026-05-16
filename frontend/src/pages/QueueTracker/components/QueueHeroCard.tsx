import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface QueueHeroCardProps {
  tokenNumber: number;
  estimatedWaitMins: number;
  currentlyServing: number;
  aheadOfYou: number;
  joinedAt: string;
}

interface ParticleConfig {
  id: number;
  initialX: number;
  initialY: number;
  animateKeyframes: {
    x: number[];
    y: number[];
    opacity: number[];
    scale: number[];
  };
  duration: number;
  delay: number;
  color: string;
}

// Function to generate randomized particle configurations
const generateParticlesConfig = (count: number): ParticleConfig[] => {
  const particles: ParticleConfig[] = [];
  const colors = [
    'rgba(147, 51, 234, 0.4)', // Using a color related to primary/purple
    'rgba(59, 130, 246, 0.3)', // Related to blue-400
    'rgba(16, 185, 129, 0.3)', // Related to emerald-400
  ];

  for (let i = 0; i < count; i++) {
    // Randomized movement ranges within the card's bounds (approx max-w-sm and reasonable height)
    // Adjust values based on the component's actual width and height
    const xMovementRange = 250;
    const yMovementRange = 350;

    particles.push({
      id: i,
      // Initial position randomized
      initialX: Math.random() * (xMovementRange / 2) - xMovementRange / 4,
      initialY: Math.random() * (yMovementRange / 2) - yMovementRange / 4,
      // Randomized keyframes for continuous movement
      animateKeyframes: {
        x: Array.from({ length: 4 }, () => Math.random() * xMovementRange - xMovementRange / 2),
        y: Array.from({ length: 4 }, () => Math.random() * yMovementRange - yMovementRange / 2),
        // Randomized opacities for breathing effect
        opacity: [0.1, Math.random() * 0.4 + 0.1, 0.1, Math.random() * 0.4 + 0.1, 0.1],
        // Randomized scaling for dynamic size
        scale: [Math.random() * 0.5 + 0.5, Math.random() * 1.5 + 0.5, Math.random() * 0.5 + 0.5],
      },
      // Randomized duration and delay for non-uniform patterns
      duration: Math.random() * 15 + 10, // 10s to 25s
      delay: Math.random() * 10, // 0s to 10s
      color: colors[i % colors.length],
    });
  }
  return particles;
};

export const QueueHeroCard: React.FC<QueueHeroCardProps> = ({
  tokenNumber,
  estimatedWaitMins,
  currentlyServing,
  aheadOfYou,
  joinedAt
}) => {
  // Use useMemo to generate particles configuration once on component mount
  const particlesCount = 20; // Number of particles
  const particlesConfig = useMemo(() => generateParticlesConfig(particlesCount), []);

  return (
    <section className="bg-surface-container-lowest rounded-2xl p-6 shadow-[0px_6px_20px_rgba(0,0,0,0.06)] flex flex-col items-center border border-surface-container-highest/50 relative overflow-hidden w-full max-w-sm mx-auto">
      
      {/* Animated Ambient Background - Constant Particle Animation */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Static overlay gradient for a base color and text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent backdrop-blur-[2px]" />
        
        {/* Render particles based on the configuration */}
        {particlesConfig.map(config => (
          <motion.div
            key={config.id}
            initial={{ x: config.initialX, y: config.initialY, opacity: 0.1, scale: 0.5 }}
            animate={{
              x: [...config.animateKeyframes.x, config.initialX],
              y: [...config.animateKeyframes.y, config.initialY],
              opacity: config.animateKeyframes.opacity,
              scale: config.animateKeyframes.scale,
            }}
            transition={{
              duration: config.duration,
              delay: config.delay,
              repeat: Infinity,
              ease: "linear", // Use linear for smooth, constant movement
            }}
            style={{
              background: config.color,
            }}
            // Small particle styling with a subtle blur
            className="absolute rounded-full w-4 h-4 blur-[1px]"
          />
        ))}
      </div>

      {/* Content (Z-10 to stay above the animated background) */}
      <div className="z-10 flex flex-col items-center w-full relative">
        <span className="font-meta-label text-meta-label text-on-surface-variant mb-2 uppercase tracking-widest text-[11px] font-semibold">
          Your Token
        </span>
        
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
          className="flex items-baseline gap-2 mb-2"
        >
          <span className="text-on-surface font-headline-lg-mobile text-[48px] leading-none font-bold tracking-tight">
            #{tokenNumber}
          </span>
        </motion.div>

        <div className="w-full h-px bg-surface-variant/60 my-4"></div>
        
        <div className="flex flex-col items-center gap-1">
          <span className="font-wait-time text-wait-time text-on-surface font-semibold text-[28px] leading-tight">
            Approx {estimatedWaitMins} mins
          </span>
          <span className="font-meta-label text-meta-label text-on-surface-variant text-sm">
            Estimated wait time
          </span>
        </div>

        {/* Sub-card with backdrop-blur-md continues to interact with background animation */}
        <div className="w-full bg-surface-container-high/80 backdrop-blur-md rounded-2xl px-5 py-4 mt-6 flex justify-between items-center shadow-sm border border-white/10">
          <div className="flex flex-col">
            <span className="font-meta-label text-meta-label text-on-surface-variant text-[12px] mb-1">
              Currently Serving
            </span>
            <span className="font-wait-time text-wait-time text-primary font-bold text-lg">
              #{currentlyServing}
            </span>
          </div>
          <div className="w-px h-8 bg-surface-variant"></div>
          <div className="flex flex-col items-end">
            <span className="font-meta-label text-meta-label text-on-surface-variant text-[12px] mb-1">
              Ahead of You
            </span>
            <span className="font-wait-time text-wait-time text-on-surface font-bold text-lg">
              {aheadOfYou} {aheadOfYou === 1 ? 'customer' : 'customers'}
            </span>
          </div>
        </div>

        <span className="font-meta-label text-meta-label text-on-surface-variant/60 mt-5 text-[11px]">
          Joined queue at {joinedAt}
        </span>
      </div>
    </section>
  );
};

export default QueueHeroCard;