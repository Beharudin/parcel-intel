import { clsx } from "clsx";
import { RefreshCw } from "lucide-react";

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between animate-fade-up">
      <div className="min-w-0">
        <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-400">
          {eyebrow}
        </p>
        <h1 className="font-display text-[28px] font-semibold tracking-tight text-parchment-100 sm:text-[32px]">
          {title}
        </h1>
        {description && (
          <p className="mt-1.5 max-w-xl text-[13.5px] leading-relaxed text-ink-400">
            {description}
          </p>
        )}
      </div>
      <div className="flex shrink-0 items-center gap-3">
        {actions}
        <div className="hidden items-center gap-1.5 text-[11.5px] text-ink-400 sm:flex">
          <RefreshCw size={12} className="text-survey-400" />
          <span>Refreshed just now</span>
        </div>
      </div>
    </div>
  );
}

export function Panel({
  children,
  className,
  title,
  subtitle,
  action,
}: {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className={clsx("panel overflow-hidden", className)}>
      {(title || action) && (
        <div className="flex items-start justify-between gap-3 px-5 pt-5 pb-1">
          <div className="min-w-0">
            {title && (
              <h2 className="font-display text-[15px] font-semibold text-parchment-100">{title}</h2>
            )}
            {subtitle && <p className="mt-0.5 text-[12px] text-ink-400">{subtitle}</p>}
          </div>
          {action}
        </div>
      )}
      {children}
    </div>
  );
}
