import Link from "next/link";
import { ArrowLeft, Construction, type LucideIcon } from "lucide-react";

export function ComingSoon({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: LucideIcon;
}) {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-16 text-center animate-fade-up sm:py-24">
      <div className="panel relative mb-8 w-full max-w-lg overflow-hidden p-8 sm:p-10">
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-brand-500 to-transparent" />
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-brand-500/25 bg-brand-500/10 shadow-glow-soft">
          <Icon size={24} className="text-brand-400" />
        </div>
        <div className="mb-3 inline-flex items-center gap-1.5 rounded-md border border-signal-gold/30 bg-signal-gold/10 px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-wide text-signal-gold">
          <Construction size={11} />
          Coming soon
        </div>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-parchment-100">
          {title}
        </h1>
        <p className="mx-auto mt-3 max-w-sm text-[13.5px] leading-relaxed text-ink-400">
          {description}
        </p>
        <Link href="/" className="btn-ghost mt-8">
          <ArrowLeft size={14} />
          Back to dashboard
        </Link>
      </div>
    </div>
  );
}
