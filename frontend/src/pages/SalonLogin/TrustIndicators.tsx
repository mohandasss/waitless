import React from "react";
import { CheckCircle, Zap, Gift } from "lucide-react";

export function TrustIndicators() {
  return (
    <section className="mb-md bg-surface-container-low rounded-md p-md border border-surface-variant">
      <ul className="flex flex-col gap-sm">
        <li className="flex items-start gap-sm">
          <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
          <span className="font-meta-label text-meta-label text-on-surface-variant">No technical setup required</span>
        </li>
        <li className="flex items-start gap-sm">
          <Zap className="h-5 w-5 text-primary flex-shrink-0" />
          <span className="font-meta-label text-meta-label text-on-surface-variant">Get started in under 2 mins</span>
        </li>
        <li className="flex items-start gap-sm">
          <Gift className="h-5 w-5 text-primary flex-shrink-0" />
          <span className="font-meta-label text-meta-label text-on-surface-variant">Free basic setup</span>
        </li>
      </ul>
    </section>
  );
}
