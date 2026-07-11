import { clsx } from "clsx";
import { Phone, Mail, MessageSquare, StickyNote, RefreshCcw, Fingerprint } from "lucide-react";
import type { Activity } from "@/lib/data";

const iconMap = {
  Call: Phone,
  Email: Mail,
  SMS: MessageSquare,
  Note: StickyNote,
  "Status Change": RefreshCcw,
  "Skip Trace": Fingerprint,
};

const colorMap: Record<Activity["type"], string> = {
  Call: "text-survey-400 border-survey-500/30 bg-survey-500/10",
  Email: "text-brand-400 border-brand-500/30 bg-brand-500/10",
  SMS: "text-signal-blue border-signal-blue/30 bg-signal-blue/10",
  Note: "text-ink-300 border-white/10 bg-white/5",
  "Status Change": "text-flag-400 border-flag-500/30 bg-flag-500/10",
  "Skip Trace": "text-signal-violet border-signal-violet/30 bg-signal-violet/10",
};

export function ActivityFeed({ items }: { items: Activity[]; showProperty?: boolean }) {
  if (items.length === 0) {
    return <p className="py-8 text-center text-[12.5px] text-ink-400">No activity logged yet.</p>;
  }

  return (
    <ol className="space-y-0">
      {items.map((a, i) => {
        const Icon = iconMap[a.type];
        return (
          <li key={a.id} className="relative flex gap-3 pb-5 last:pb-0">
            {i < items.length - 1 && (
              <span className="absolute left-[13px] top-8 bottom-0 w-px bg-white/[0.06]" />
            )}
            <div
              className={clsx(
                "relative z-[1] flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border",
                colorMap[a.type]
              )}
            >
              <Icon size={12} strokeWidth={2.25} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="text-[12.5px] font-semibold text-parchment-100">{a.type}</p>
                <p className="shrink-0 font-mono text-[11px] text-ink-400">{a.date}</p>
              </div>
              <p className="mt-0.5 text-[12.5px] leading-relaxed text-ink-300">{a.summary}</p>
              <p className="mt-1 font-mono text-[10.5px] text-ink-500">{a.user}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
