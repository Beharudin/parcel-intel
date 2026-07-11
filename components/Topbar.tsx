"use client";

import { Search, Command } from "lucide-react";

export function Topbar({ crumb }: { crumb: string }) {
  return (
    <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-white/[0.06] bg-ink-950/75 px-4 py-3.5 backdrop-blur-xl lg:px-8">
      <div className="flex min-w-0 items-center gap-2 text-[13px]">
        <span className="hidden text-ink-400 sm:inline">Parcel Intel</span>
        <span className="hidden text-ink-500 sm:inline">/</span>
        <span className="truncate font-medium text-parchment-100">{crumb}</span>
      </div>

      <div className="ml-auto flex items-center gap-2 sm:gap-3">
        <div className="hidden items-center gap-1.5 md:flex">
          <span className="inline-flex items-center gap-1.5 rounded-md border border-survey-500/30 bg-survey-500/10 px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-wide text-survey-400">
            <span className="h-1.5 w-1.5 rounded-full bg-survey-400 animate-pulse-dot" />
            Live
          </span>
        </div>

        <div className="relative hidden sm:block">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
          <input
            placeholder="Search parcels, owners, APN..."
            className="w-52 rounded-lg border border-white/10 bg-ink-800/70 py-2 pl-9 pr-12 text-[12.5px] text-parchment-100 placeholder:text-ink-400 outline-none transition-colors focus:border-brand-500/40 focus:ring-1 focus:ring-brand-500/20 lg:w-64"
          />
          <kbd className="pointer-events-none absolute right-2.5 top-1/2 flex -translate-y-1/2 items-center gap-0.5 rounded border border-white/10 bg-ink-700/80 px-1.5 py-0.5 text-[10px] text-ink-400">
            <Command size={9} />K
          </kbd>
        </div>
      </div>
    </header>
  );
}
