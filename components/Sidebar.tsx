"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { Lock } from "lucide-react";
import { navSections } from "@/lib/nav";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex w-[260px] shrink-0 flex-col border-r border-white/[0.06] bg-ink-900/80 backdrop-blur-xl">
      <div className="border-b border-white/[0.06] px-4 py-4">
        <Link href="/" className="block">
          <Image
            src="/logo.png"
            alt="914 Home Renovations"
            width={300}
            height={48}
            className="h-9 w-auto max-w-full object-contain object-left"
            priority
          />
        </Link>
        <p className="mt-2.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-400">
          Parcel Intel · Property CRM
        </p>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-5 space-y-6">
        {navSections.map((section) => (
          <div key={section.title}>
            <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-500">
              {section.title}
            </p>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const active =
                  item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={clsx(
                      "group flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-[13px] font-medium transition-all duration-200",
                      active
                        ? "nav-active"
                        : "text-ink-300 hover:bg-white/[0.04] hover:text-parchment-100"
                    )}
                  >
                    <Icon
                      size={16}
                      strokeWidth={2}
                      className={clsx(
                        "shrink-0 transition-colors",
                        active ? "text-brand-400" : "text-ink-400 group-hover:text-brand-400"
                      )}
                    />
                    <span className="flex-1 truncate">{item.label}</span>
                    {item.status === "soon" && (
                      <Lock size={11} className="text-ink-500 shrink-0 opacity-70" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="px-4 py-4 border-t border-white/[0.06]">
        <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-ink-800/50 p-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-500/15 text-[13px] font-semibold text-brand-400 ring-1 ring-brand-500/30">
            BM
          </div>
          <div className="min-w-0 leading-tight">
            <p className="text-[12.5px] font-semibold text-parchment-100 truncate">
              Beharudin M.
            </p>
            <p className="text-[10.5px] text-ink-400 truncate">Demo · Frontend MVP</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
