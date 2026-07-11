import { clsx } from "clsx";

const toneMap = {
  brand: "border-brand-500/35 bg-brand-500/12 text-brand-400",
  survey: "border-survey-500/35 bg-survey-500/12 text-survey-400",
  flag: "border-flag-500/35 bg-flag-500/12 text-flag-400",
  muted: "border-white/10 bg-white/[0.04] text-ink-300",
  blue: "border-signal-blue/35 bg-signal-blue/12 text-signal-blue",
  gold: "border-signal-gold/35 bg-signal-gold/12 text-signal-gold",
} as const;

export function StampBadge({
  children,
  tone = "brand",
  className,
  dot,
}: {
  children: React.ReactNode;
  tone?: keyof typeof toneMap;
  className?: string;
  dot?: boolean;
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-[10.5px] font-medium tracking-wide",
        toneMap[tone],
        className
      )}
    >
      {dot && (
        <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse-dot" aria-hidden />
      )}
      {children}
    </span>
  );
}

export function statusTone(status: string): keyof typeof toneMap {
  switch (status) {
    case "Hot Lead":
      return "flag";
    case "Under Contract":
    case "Closed":
      return "survey";
    case "Contacted":
    case "Under Review":
      return "brand";
    case "New Lead":
      return "blue";
    default:
      return "muted";
  }
}
