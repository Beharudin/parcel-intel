import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Phone, Mail, MapPin, ShieldCheck } from "lucide-react";
import { DashboardShell } from "@/components/DashboardShell";
import { StampBadge, statusTone } from "@/components/StampBadge";
import { ScoreRing } from "@/components/ScoreRing";
import { ActivityFeed } from "@/components/ActivityFeed";
import {
  owners,
  getOwnerById,
  getPropertiesForOwner,
  getActivityForOwner,
  formatCurrency,
} from "@/lib/data";

export function generateStaticParams() {
  return owners.map((o) => ({ id: o.id }));
}

const confidenceTone: Record<string, string> = {
  Verified: "text-survey-400 border-survey-500/30 bg-survey-500/10",
  "Skip-Traced": "text-brand-400 border-brand-500/30 bg-brand-500/10",
  Unverified: "text-ink-300 border-white/10 bg-white/5",
  Bounced: "text-flag-400 border-flag-500/30 bg-flag-500/10",
};

export default function OwnerDetailPage({ params }: { params: { id: string } }) {
  const owner = getOwnerById(params.id);
  if (!owner) notFound();

  const ownedProperties = getPropertiesForOwner(owner.id);
  const timeline = getActivityForOwner(owner.id);

  return (
    <DashboardShell crumb={owner.name}>
      <div className="animate-fade-up">
        <Link
          href="/owners"
          className="mb-5 inline-flex items-center gap-1.5 text-[12.5px] text-ink-400 transition-colors hover:text-parchment-100"
        >
          <ArrowLeft size={13} /> Back to owners
        </Link>

        <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
          <div>
            <p className="mb-1.5 font-mono text-[11px] uppercase tracking-wider text-ink-400">
              {owner.type}
            </p>
            <h1 className="font-display text-2xl font-semibold tracking-tight text-parchment-100 lg:text-3xl">
              {owner.name}
            </h1>
            <p className="mt-1.5 flex items-center gap-1.5 text-[13.5px] text-ink-400">
              <MapPin size={12} /> {owner.mailingAddress}
            </p>
          </div>
          <span
            className={`inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-[11px] font-medium ${confidenceTone[owner.contactStatus]}`}
          >
            <ShieldCheck size={12} /> {owner.contactStatus}
          </span>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            <div className="panel p-5">
              <h2 className="mb-4 font-display text-[15px] font-semibold text-parchment-100">
                Owner details
              </h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                <div className="rounded-lg border border-white/[0.05] bg-ink-900/40 p-3">
                  <p className="mb-1 flex items-center gap-1 text-[10.5px] font-semibold uppercase tracking-wider text-ink-400">
                    <Phone size={11} /> Phone
                  </p>
                  <p className="font-mono text-[13px] text-parchment-100">{owner.phone}</p>
                </div>
                <div className="rounded-lg border border-white/[0.05] bg-ink-900/40 p-3">
                  <p className="mb-1 flex items-center gap-1 text-[10.5px] font-semibold uppercase tracking-wider text-ink-400">
                    <Mail size={11} /> Email
                  </p>
                  <p className="break-all text-[13px] text-parchment-100">{owner.email}</p>
                </div>
                <div className="rounded-lg border border-white/[0.05] bg-ink-900/40 p-3">
                  <p className="mb-1 text-[10.5px] font-semibold uppercase tracking-wider text-ink-400">
                    Portfolio Value
                  </p>
                  <p className="font-mono text-[13px] tabular text-parchment-100">
                    {formatCurrency(owner.portfolioValue)}
                  </p>
                </div>
                <div className="rounded-lg border border-white/[0.05] bg-ink-900/40 p-3">
                  <p className="mb-1 text-[10.5px] font-semibold uppercase tracking-wider text-ink-400">
                    Data Confidence
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-survey-500"
                        style={{ width: `${owner.dataQuality}%` }}
                      />
                    </div>
                    <span className="font-mono text-[13px] tabular text-parchment-100">
                      {owner.dataQuality}%
                    </span>
                  </div>
                </div>
                <div className="rounded-lg border border-white/[0.05] bg-ink-900/40 p-3">
                  <p className="mb-1 text-[10.5px] font-semibold uppercase tracking-wider text-ink-400">
                    Properties Owned
                  </p>
                  <p className="text-[13px] text-parchment-100">{ownedProperties.length}</p>
                </div>
              </div>
              <div className="mt-5 border-t border-white/[0.06] pt-5">
                <p className="mb-1.5 text-[10.5px] font-semibold uppercase tracking-wider text-ink-400">
                  CRM Notes
                </p>
                <p className="text-[13px] leading-relaxed text-ink-300">{owner.notes}</p>
              </div>
            </div>

            <div className="panel p-5">
              <h2 className="font-display text-[15px] font-semibold text-parchment-100">
                CRM timeline
              </h2>
              <p className="mb-4 mt-0.5 text-[12px] text-ink-400">
                Activity across every property linked to this owner.
              </p>
              <ActivityFeed items={timeline} />
            </div>
          </div>

          <div className="space-y-4">
            <div className="panel p-5">
              <h2 className="mb-3 font-display text-[14px] font-semibold text-parchment-100">
                Linked properties
              </h2>
              <div className="space-y-2.5">
                {ownedProperties.map((p) => (
                  <Link
                    key={p.id}
                    href={`/properties/${p.id}`}
                    className="block rounded-xl border border-white/[0.06] bg-ink-900/40 p-3 transition-colors hover:border-brand-500/35 hover:bg-brand-500/[0.04]"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate text-[12.5px] font-medium text-parchment-100">
                          {p.address}
                        </p>
                        <p className="font-mono text-[11px] text-ink-400">{p.parcelId}</p>
                      </div>
                      <ScoreRing score={p.opportunityScore} size={36} stroke={3} />
                    </div>
                    <div className="mt-2.5 flex items-center justify-between">
                      <StampBadge tone={statusTone(p.status)} className="text-[9.5px]">
                        {p.status}
                      </StampBadge>
                      <span className="font-mono text-[11px] tabular text-ink-400">
                        {formatCurrency(p.estValue)}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
