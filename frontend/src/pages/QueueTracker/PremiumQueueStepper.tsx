import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

type QueueStepperProps = {
  currentServing?: number;
  yourNumber?: number;
};

export default function PremiumQueueStepper({
  currentServing = 15,
  yourNumber = 18,
}: QueueStepperProps) {
  const steps = Array.from(
    { length: yourNumber - currentServing + 1 },
    (_, i) => currentServing + i
  );

  return (
    <div className="w-full max-w-sm mx-auto rounded-2xl bg-white shadow-[0_2px_16px_rgba(0,0,0,0.04)] p-5 border border-zinc-100 ">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h2 className="font-card-title text-card-title text-zinc-900">
            Queue Progress
          </h2>
          <p className="text-[13px] text-zinc-500 mt-0.5">
            Your turn is approaching
          </p>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
            Serving
          </span>
          <span className="text-lg font-bold text-emerald-500 leading-none mt-1">
            #{currentServing}
          </span>
        </div>
      </div>

      {/* Progress Line */}
      <div className="relative px-1 mb-4 mt-2">
        {/* Lines Container */}
        <div className="absolute top-1/2 left-0 w-full h-[2px] -translate-y-1/2 z-0 px-4">
          <div className="w-full h-full bg-zinc-100 rounded-full" />
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute top-0 left-4 h-full bg-gradient-to-r from-emerald-400 to-rose-400 rounded-full"
            style={{ maxWidth: "calc(100% - 2rem)" }}
          />
        </div>

        <div className="relative flex items-center justify-between z-10">
          {steps.map((step, index) => {
            const isServing = step === currentServing;
            const isYou = step === yourNumber;

            return (
              <motion.div
                key={step}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.3,
                }}
                className="relative flex flex-col items-center"
              >
                {/* Step Circle */}
                <motion.div
                  animate={isYou ? { y: [0, -2, 0] } : {}}
                  transition={
                    isYou
                      ? { repeat: Infinity, duration: 2, ease: "easeInOut" }
                      : {}
                  }
                  className={`
                    flex items-center justify-center rounded-full text-xs font-semibold transition-all
                    ${
                      isServing
                        ? "w-8 h-8 bg-emerald-500 text-white shadow-sm shadow-emerald-200 border-2 border-white ring-1 ring-emerald-100"
                        : isYou
                        ? "w-9 h-9 bg-rose-500 text-white shadow-sm shadow-rose-200 border-2 border-white ring-2 ring-rose-100"
                        : "w-6 h-6 bg-white text-zinc-400 border-2 border-zinc-100"
                    }
                  `}
                >
                  {step}
                </motion.div>

                {/* Labels */}
                <div className="absolute -bottom-5 w-16 text-center">
                  {isServing && (
                    <p className="text-[9px] font-bold text-emerald-600 tracking-wider">
                      NOW
                    </p>
                  )}
                  {isYou && (
                    <p className="text-[9px] font-bold text-rose-600 tracking-wider">
                      YOU
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom Card */}
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-8 rounded-xl bg-zinc-50/80 border border-zinc-100 px-4 py-3 flex items-center justify-between"
      >
        <div className="flex flex-col">
          <p className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">
            Est. Wait Time
          </p>
          <p className="text-sm font-semibold text-zinc-900 mt-0.5">~9 mins</p>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100/50 text-emerald-600 text-xs font-medium">
          <Check className="w-3.5 h-3.5" />
          Live
        </div>
      </motion.div>
    </div>
  );
}