"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { Menu, X, Lock } from "lucide-react";
import { navSections } from "@/lib/nav";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setOpen(true)}
        aria-label="Open navigation"
        className="fixed left-4 top-3.5 z-30 flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-ink-800/95 text-parchment-100 shadow-panel backdrop-blur"
      >
        <Menu size={16} />
      </button>

      {open && (
        <div className="fixed inset-0 z-40 flex">
          <div className="flex h-full w-[280px] flex-col border-r border-white/[0.06] bg-ink-900">
            <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-4">
              <div className="flex items-center gap-2.5">
                <Image
                  src="/logo-placeholder.svg"
                  alt="Parcel Intel"
                  width={30}
                  height={30}
                  className="rounded-md"
                />
                <p className="font-display font-semibold text-parchment-100">Parcel Intel</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close navigation"
                className="rounded-md p-1 text-ink-400 hover:text-parchment-100"
              >
                <X size={18} />
              </button>
            </div>
            <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-5">
              {navSections.map((section) => (
                <div key={section.title}>
                  <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-500">
                    {section.title}
                  </p>
                  <div className="space-y-0.5">
                    {section.items.map((item) => {
                      const active =
                        item.href === "/"
                          ? pathname === "/"
                          : pathname.startsWith(item.href);
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className={clsx(
                            "flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-[13px] font-medium",
                            active
                              ? "nav-active"
                              : "text-ink-300 hover:bg-white/[0.04] hover:text-parchment-100"
                          )}
                        >
                          <Icon
                            size={16}
                            className={active ? "text-brand-400" : "text-ink-400"}
                          />
                          <span className="flex-1">{item.label}</span>
                          {item.status === "soon" && (
                            <Lock size={11} className="text-ink-500" />
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </nav>
          </div>
          <div className="flex-1 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
        </div>
      )}
    </div>
  );
}
