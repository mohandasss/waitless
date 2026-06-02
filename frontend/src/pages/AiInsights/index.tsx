import { Sparkles } from "lucide-react";

import { useAiInsights } from "./hooks/useAiInsights";

export default function AiInsightsPage() {
  const {
    generateInsights,
    displayedText,
    isLoading,
    error,
  } = useAiInsights();

  return (
    <div className="min-h-screen bg-background text-on-surface">
      <main className="mx-auto flex min-h-screen max-w-md flex-col px-container-padding py-lg">
        <div className="pt-4">
          <p className="text-meta-label uppercase tracking-[0.35em] text-on-surface-variant/70">AI insights</p>
          <h1 className="mt-3 text-headline-lg-mobile">Salon 28 insights</h1>
          <p className="mt-3 text-meta-label text-on-surface-variant">Tap the button below to fetch the AI response.</p>
        </div>

        <section className="mt-8 flex-1 rounded-[2rem] border border-surface-variant bg-surface-container-low p-5 shadow-ambient">
          <div className="flex items-center justify-between">
            <p className="text-meta-label uppercase tracking-[0.3em] text-on-surface-variant/70">Generated text</p>
            {isLoading ? <span className="text-meta-label text-primary">Generating...</span> : null}
          </div>

          <div className="mt-4 min-h-[260px] whitespace-pre-wrap text-wait-time leading-7 text-on-surface">
            {displayedText || (error ? error : "The result will appear here.")}
          </div>
        </section>

        <div className="flex items-end justify-center py-6">
          <button
            type="button"
            onClick={() => {
              void generateInsights();
            }}
            disabled={isLoading}
            className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-ambient transition disabled:opacity-70"
            aria-label="Get AI insights"
          >
            <Sparkles className="h-7 w-7" />
          </button>
        </div>
      </main>
    </div>
  );
}