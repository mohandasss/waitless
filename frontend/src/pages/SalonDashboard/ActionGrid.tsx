import React from "react";
import { useTranslation } from "react-i18next";
import {
  ArrowRight,
  UserPlus,
  CheckCircle2,
  SkipForward,
} from "lucide-react";

const actions = [
  {
    key: "next",
    icon: ArrowRight,
    color: "bg-rose-500 hover:bg-rose-600",
  },
  {
    key: "walkIn",
    icon: UserPlus,
    color: "bg-violet-500 hover:bg-violet-600",
  },
  {
    key: "done",
    icon: CheckCircle2,
    color: "bg-emerald-500 hover:bg-emerald-600",
  },
  {
    key: "skip",
    icon: SkipForward,
    color: "bg-slate-500 hover:bg-slate-600",
  },
];

export function ActionGrid() {
  const { t } = useTranslation();

  return (
    <section className="w-full">
      {/* Compact Header */}
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
          {t("dashboard.quickActions")}
        </h2>
      </div>

      {/* Horizontal Compact Layout */}
      <div className="grid grid-cols-4 gap-3">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.key}
              className={`
                flex flex-col items-center justify-center
                rounded-2xl p-3
                text-white
                shadow-sm
                transition-all duration-200
                active:scale-95
                ${action.color}
              `}
            >
              <Icon className="h-5 w-5 mb-1" />
              <span className="text-[11px] font-medium leading-none">
                {t(`dashboard.${action.key}`)}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}