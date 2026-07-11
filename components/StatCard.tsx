import { clsx } from "clsx";
import type { LucideIcon } from "lucide-react";

const accentStyles = {
  brand: {
    bar: "bg-brand-500",
    icon: "text-brand-400 bg-brand-500/10",
    delta: "text-brand-400",
  },
  survey: {
    bar: "bg-survey-500",
    icon: "text-survey-400 bg-survey-500/10",
    delta: "text-survey-400",
  },
  flag: {
    bar: "bg-flag-500",
    icon: "text-flag-400 bg-flag-500/10",
    delta: "text-flag-400",
  },
  blue: {
    bar: "bg-signal-blue",
    icon: "text-signal-blue bg-signal-blue/10",
    delta: "text-signal-blue",
  },
  gold: {
    bar: "bg-signal-gold",
    icon: "text-signal-gold bg-signal-gold/10",
    delta: "text-signal-gold",
  },
} as const;

export function StatCard({
  label,
  value,
  sublabel,
  icon: Icon,
  accent = "brand",
  delta,
}: {
  label: string;
  value: string;
  sublabel?: string;
  icon: LucideIcon;
  accent?: keyof typeof accentStyles;
  delta?: string;
}) {
  const styles = accentStyles[accent];

  return (
    <div className="panel relative overflow-hidden p-4 animate-fade-up">
      <div className={clsx("absolute inset-x-0 top-0 h-[2px]", styles.bar)} />
      <div className="flex items-start justify-between gap-3">
        <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-ink-400">
          {label}
        </p>
        <span className={clsx("flex h-8 w-8 items-center justify-center rounded-lg", styles.icon)}>
          <Icon size={15} strokeWidth={2.25} />
        </span>
      </div>
      <p className="mt-3 font-display text-[30px] font-semibold leading-none tracking-tight text-parchment-100 tabular">
        {value}
      </p>
      <div className="mt-2 flex items-center gap-2">
        {delta && (
          <span className={clsx("text-[11px] font-semibold tabular", styles.delta)}>{delta}</span>
        )}
        {sublabel && <p className="text-[11.5px] text-ink-400">{sublabel}</p>}
      </div>
    </div>
  );
}
