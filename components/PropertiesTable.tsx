"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react";
import { clsx } from "clsx";
import {
  properties as allProperties,
  getOwnerById,
  formatCurrency,
  type LeadStatus,
  type Property,
} from "@/lib/data";
import { StampBadge, statusTone } from "@/components/StampBadge";
import { ScoreRing } from "@/components/ScoreRing";

type SortKey = "opportunityScore" | "estValue" | "lastActivity" | "address";

const statuses: (LeadStatus | "All")[] = [
  "All",
  "New Lead",
  "Contacted",
  "Under Review",
  "Hot Lead",
  "Under Contract",
  "Closed",
];

const PAGE_SIZE = 8;

export function PropertiesTable() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<(typeof statuses)[number]>("All");
  const [sortKey, setSortKey] = useState<SortKey>("opportunityScore");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let rows: Property[] = allProperties;

    if (status !== "All") {
      rows = rows.filter((p) => p.status === status);
    }

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      rows = rows.filter((p) => {
        const owner = getOwnerById(p.ownerId);
        return (
          p.address.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q) ||
          p.parcelId.toLowerCase().includes(q) ||
          owner?.name.toLowerCase().includes(q)
        );
      });
    }

    rows = [...rows].sort((a, b) => {
      let cmp = 0;
      if (sortKey === "address") cmp = a.address.localeCompare(b.address);
      else if (sortKey === "lastActivity") cmp = a.lastActivity.localeCompare(b.lastActivity);
      else cmp = (a[sortKey] as number) - (b[sortKey] as number);
      return sortDir === "asc" ? cmp : -cmp;
    });

    return rows;
  }, [query, status, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageRows = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
    setPage(1);
  }

  const columns: { key: SortKey | null; label: string; className?: string }[] = [
    { key: "address", label: "Property" },
    { key: null, label: "Owner" },
    { key: null, label: "Status" },
    { key: "opportunityScore", label: "Score", className: "text-right" },
    { key: "estValue", label: "Est. Value", className: "text-right" },
    { key: "lastActivity", label: "Last Activity", className: "text-right" },
  ];

  return (
    <div className="panel overflow-hidden animate-fade-up">
      <div className="flex flex-col gap-3 border-b border-white/[0.06] p-4 sm:flex-row">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Search address, city, APN, or owner..."
            className="input-field"
          />
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {statuses.map((s) => (
            <button
              key={s}
              onClick={() => {
                setStatus(s);
                setPage(1);
              }}
              className={clsx(
                "shrink-0 rounded-lg border px-2.5 py-1.5 text-[11px] font-medium transition-colors",
                status === s
                  ? "border-brand-500/40 bg-brand-500/15 text-brand-400"
                  : "border-white/10 text-ink-400 hover:text-parchment-100"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/[0.06] text-[10.5px] font-semibold uppercase tracking-wider text-ink-400">
              {columns.map((c) => (
                <th key={c.label} className={clsx("px-5 py-3", c.className)}>
                  {c.key ? (
                    <button
                      onClick={() => toggleSort(c.key as SortKey)}
                      className="inline-flex items-center gap-1 hover:text-parchment-100"
                    >
                      {c.label}
                      <ArrowUpDown size={10} />
                    </button>
                  ) : (
                    c.label
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageRows.map((p) => {
              const owner = getOwnerById(p.ownerId);
              return (
                <tr
                  key={p.id}
                  className="border-b border-white/[0.04] transition-colors last:border-0 hover:bg-white/[0.025]"
                >
                  <td className="px-5 py-3.5">
                    <Link href={`/properties/${p.id}`} className="block">
                      <p className="text-[13px] font-medium text-parchment-100 hover:text-brand-400">
                        {p.address}
                      </p>
                      <p className="mt-0.5 font-mono text-[11px] text-ink-400">
                        {p.city}, {p.state} · {p.parcelId}
                      </p>
                    </Link>
                  </td>
                  <td className="px-5 py-3.5">
                    <Link
                      href={`/owners/${owner?.id}`}
                      className="text-[12.5px] text-ink-300 hover:text-brand-400"
                    >
                      {owner?.name}
                    </Link>
                  </td>
                  <td className="px-5 py-3.5">
                    <StampBadge tone={statusTone(p.status)}>{p.status}</StampBadge>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex justify-end">
                      <ScoreRing score={p.opportunityScore} size={40} stroke={3} />
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <span className="font-mono text-[12.5px] tabular text-parchment-100">
                      {formatCurrency(p.estValue)}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <span className="font-mono text-[11.5px] tabular text-ink-400">
                      {p.lastActivity}
                    </span>
                  </td>
                </tr>
              );
            })}
            {pageRows.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-12 text-center text-[13px] text-ink-400">
                  No properties match this search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-white/[0.06] px-5 py-3.5">
        <p className="font-mono text-[11.5px] text-ink-400">
          {filtered.length === 0
            ? "0 results"
            : `${(currentPage - 1) * PAGE_SIZE + 1}–${Math.min(
                currentPage * PAGE_SIZE,
                filtered.length
              )} of ${filtered.length}`}
        </p>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-ink-400 transition-colors hover:text-parchment-100 disabled:opacity-30"
          >
            <ChevronLeft size={14} />
          </button>
          <span className="px-1 font-mono text-[11.5px] text-ink-400">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-ink-400 transition-colors hover:text-parchment-100 disabled:opacity-30"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
