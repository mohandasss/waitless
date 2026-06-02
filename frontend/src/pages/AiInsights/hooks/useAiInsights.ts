import { useEffect, useRef, useState } from "react";

import { api } from "@/APis/api";
import type { AiInsightsData } from "@/APis/Types";

const SALON_ID = "28";
const THINKING_DELAY_MS = 180;
const TYPE_SPEED_MS = 18;

function buildTranscript(data: AiInsightsData) {
  return [
    "AI Summary",
    data.summary,
    "",
    "Recommended Move",
    data.recommendation,
    "",
    "Growth Opportunity",
    data.growthOpportunity,
  ].join("\n");
}

export function useAiInsights() {
  const [displayedText, setDisplayedText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const timerIds = useRef<number[]>([]);

  const clearTimers = () => {
    timerIds.current.forEach((timerId) => window.clearTimeout(timerId));
    timerIds.current = [];
  };

  useEffect(() => {
    return () => {
      clearTimers();
    };
  }, []);

  const startTyping = (text: string) => {
    clearTimers();
    setDisplayedText("");
    setIsTyping(true);

    const startId = window.setTimeout(() => {
      let cursor = 0;

      const tick = () => {
        cursor += 1;
        setDisplayedText(text.slice(0, cursor));

        if (cursor < text.length) {
          const nextId = window.setTimeout(tick, TYPE_SPEED_MS);
          timerIds.current.push(nextId);
          return;
        }

        setIsTyping(false);
      };

      tick();
    }, THINKING_DELAY_MS);

    timerIds.current.push(startId);
  };

  const generateInsights = async () => {
    clearTimers();
    setDisplayedText("");
    setError(null);
    setIsTyping(false);

    try {
      const response = await api.AiInsights(SALON_ID);

      if (!response.success || !response.data) {
        throw new Error(response.message || "Failed to load AI insights.");
      }

      startTyping(buildTranscript(response.data));
      return response;
    } catch (caughtError) {
      const message =
        caughtError instanceof Error
          ? caughtError.message
          : "Failed to load AI insights.";

      setError(message);
      setIsTyping(false);
      return null;
    }
  };

  return {
    generateInsights,
    displayedText,
    isLoading: isTyping,
    error,
    isTyping,
  };
}