"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react";
import { clsx } from "clsx";
import { owners as allOwners, formatCurrency, type Owner, type OwnerType } from "@/lib/data";

type SortKey = "name" | "portfolioValue" | "dataQuality";

const types: (OwnerType | "All")[] = ["All", "Individual", "LLC", "Trust", "Estate"];

const statusTone: Record<Owner["contactStatus"], string> = {
  Verified: "text-survey-400 border-survey-500/30 bg-survey-500/10",
  "Skip-Traced": "text-brand-400 border-brand-500/30 bg-brand-500/10",
  Unverified: "text-ink-300 border-white/10 bg-white/5",
  Bounced: "text-flag-400 border-flag-500/30 bg-flag-500/10",
};

const PAGE_SIZE = 8;

export function OwnersTable() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<(typeof types)[number]>("All");
  const [sortKey, setSortKey] = useState<SortKey>("portfolioValue");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let rows: Owner[] = allOwners;
    if (type !== "All") rows = rows.filter((o) => o.type === type);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      rows = rows.filter(
        (o) => o.name.toLowerCase().includes(q) || o.email.toLowerCase().includes(q)
      );
    }
    rows = [...rows].sort((a, b) => {
      let cmp = 0;
      if (sortKey === "name") cmp = a.name.localeCompare(b.name);
      else cmp = (a[sortKey] as number) - (b[sortKey] as number);
      return sortDir === "asc" ? cmp : -cmp;
    });
    return rows;
  }, [query, type, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageRows = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("desc");
    }
    setPage(1);
  }

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
            placeholder="Search owner name or email..."
            className="input-field"
          />
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => {
                setType(t);
                setPage(1);
              }}
              className={clsx(
                "shrink-0 rounded-lg border px-2.5 py-1.5 text-[11px] font-medium transition-colors",
                type === t
                  ? "border-brand-500/40 bg-brand-500/15 text-brand-400"
                  : "border-white/10 text-ink-400 hover:text-parchment-100"
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/[0.06] text-[10.5px] font-semibold uppercase tracking-wider text-ink-400">
              <th className="px-5 py-3">
                <button
                  onClick={() => toggleSort("name")}
                  className="inline-flex items-center gap-1 hover:text-parchment-100"
                >
                  Owner <ArrowUpDown size={10} />
                </button>
              </th>
              <th className="px-5 py-3">Properties</th>
              <th className="px-5 py-3">Contact Status</th>
              <th className="px-5 py-3 text-right">
                <button
                  onClick={() => toggleSort("dataQuality")}
                  className="ml-auto inline-flex items-center gap-1 hover:text-parchment-100"
                >
                  Confidence <ArrowUpDown size={10} />
                </button>
              </th>
              <th className="px-5 py-3 text-right">
                <button
                  onClick={() => toggleSort("portfolioValue")}
                  className="ml-auto inline-flex items-center gap-1 hover:text-parchment-100"
                >
                  Portfolio Value <ArrowUpDown size={10} />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {pageRows.map((o) => (
              <tr
                key={o.id}
                className="border-b border-white/[0.04] transition-colors last:border-0 hover:bg-white/[0.025]"
              >
                <td className="px-5 py-3.5">
                  <Link href={`/owners/${o.id}`} className="block">
                    <p className="text-[13px] font-medium text-parchment-100 hover:text-brand-400">
                      {o.name}
                    </p>
                    <p className="mt-0.5 font-mono text-[11px] text-ink-400">{o.type}</p>
                  </Link>
                </td>
                <td className="px-5 py-3.5 text-[12.5px] text-ink-300">
                  {o.propertyIds.length} parcel{o.propertyIds.length !== 1 ? "s" : ""}
                </td>
                <td className="px-5 py-3.5">
                  <span
                    className={clsx(
                      "inline-flex rounded-md border px-2 py-0.5 text-[10.5px] font-medium",
                      statusTone[o.contactStatus]
                    )}
                  >
                    {o.contactStatus}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-right">
                  <div className="inline-flex items-center gap-2">
                    <div className="hidden h-1.5 w-12 overflow-hidden rounded-full bg-white/10 sm:block">
                      <div
                        className="h-full rounded-full bg-survey-500"
                        style={{ width: `${o.dataQuality}%` }}
                      />
                    </div>
                    <span className="font-mono text-[12.5px] tabular text-parchment-100">
                      {o.dataQuality}%
                    </span>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-right">
                  <span className="font-mono text-[12.5px] tabular text-parchment-100">
                    {formatCurrency(o.portfolioValue)}
                  </span>
                </td>
              </tr>
            ))}
            {pageRows.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-12 text-center text-[13px] text-ink-400">
                  No owners match this search.
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
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-ink-400 hover:text-parchment-100 disabled:opacity-30"
          >
            <ChevronLeft size={14} />
          </button>
          <span className="px-1 font-mono text-[11.5px] text-ink-400">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-ink-400 hover:text-parchment-100 disabled:opacity-30"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
