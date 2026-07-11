import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, Ruler, Calendar, Tag, Gauge } from "lucide-react";
import { DashboardShell } from "@/components/DashboardShell";
import { StampBadge, statusTone } from "@/components/StampBadge";
import { ScoreRing } from "@/components/ScoreRing";
import { ActivityFeed } from "@/components/ActivityFeed";
import {
  properties,
  getPropertyById,
  getOwnerById,
  getActivityForProperty,
  formatCurrency,
} from "@/lib/data";

export function generateStaticParams() {
  return properties.map((p) => ({ id: p.id }));
}

export default function PropertyDetailPage({ params }: { params: { id: string } }) {
  const property = getPropertyById(params.id);
  if (!property) notFound();

  const owner = getOwnerById(property.ownerId);
  const timeline = getActivityForProperty(property.id);

  const facts = [
    { label: "Type", value: property.propertyType, icon: Tag },
    {
      label: "Beds / Baths",
      value: property.beds || property.baths ? `${property.beds} bd · ${property.baths} ba` : "—",
      icon: Ruler,
    },
    { label: "Sqft", value: property.sqft ? property.sqft.toLocaleString() : "—", icon: Ruler },
    { label: "Year Built", value: property.yearBuilt || "—", icon: Calendar },
  ];

  return (
    <DashboardShell crumb={property.address}>
      <div className="animate-fade-up">
        <Link
          href="/properties"
          className="mb-5 inline-flex items-center gap-1.5 text-[12.5px] text-ink-400 transition-colors hover:text-parchment-100"
        >
          <ArrowLeft size={13} /> Back to properties
        </Link>

        <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <MapPin size={13} className="text-brand-400" />
              <p className="font-mono text-[11px] uppercase tracking-wider text-ink-400">
                {property.parcelId}
              </p>
            </div>
            <h1 className="font-display text-2xl font-semibold tracking-tight text-parchment-100 lg:text-3xl">
              {property.address}
            </h1>
            <p className="mt-1.5 text-[13.5px] text-ink-400">
              {property.city}, {property.state} {property.zip}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <StampBadge tone={statusTone(property.status)}>{property.status}</StampBadge>
            <div className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-ink-850/80 px-3 py-2">
              <ScoreRing score={property.opportunityScore} size={48} stroke={4} />
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-400">
                  Opportunity
                </p>
                <p className="font-display text-lg font-semibold text-parchment-100">Score</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            <div className="panel p-5">
              <h2 className="mb-4 font-display text-[15px] font-semibold text-parchment-100">
                Property facts
              </h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {facts.map((f) => (
                  <div key={f.label} className="rounded-lg border border-white/[0.05] bg-ink-900/40 p-3">
                    <p className="mb-1 text-[10.5px] font-semibold uppercase tracking-wider text-ink-400">
                      {f.label}
                    </p>
                    <p className="text-[13.5px] font-medium text-parchment-100">{f.value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 grid grid-cols-2 gap-4 border-t border-white/[0.06] pt-5 sm:grid-cols-4">
                <div>
                  <p className="mb-1 text-[10.5px] font-semibold uppercase tracking-wider text-ink-400">
                    Est. Value
                  </p>
                  <p className="font-mono text-[13.5px] tabular text-parchment-100">
                    {formatCurrency(property.estValue)}
                  </p>
                </div>
                <div>
                  <p className="mb-1 text-[10.5px] font-semibold uppercase tracking-wider text-ink-400">
                    Last Sale
                  </p>
                  <p className="font-mono text-[13.5px] tabular text-parchment-100">
                    {formatCurrency(property.lastSalePrice)}
                  </p>
                  <p className="font-mono text-[10.5px] text-ink-500">{property.lastSaleDate}</p>
                </div>
                <div>
                  <p className="mb-1 text-[10.5px] font-semibold uppercase tracking-wider text-ink-400">
                    Occupancy
                  </p>
                  <p className="text-[13.5px] text-parchment-100">
                    {property.ownerOccupied ? "Owner occupied" : "Non-owner occupied"}
                  </p>
                </div>
                <div>
                  <p className="mb-1 text-[10.5px] font-semibold uppercase tracking-wider text-ink-400">
                    Lead Source
                  </p>
                  <p className="text-[13.5px] text-parchment-100">{property.leadSource}</p>
                </div>
              </div>
              {property.tags.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-1.5 border-t border-white/[0.06] pt-5">
                  {property.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10.5px] font-medium text-ink-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="panel p-5">
              <h2 className="font-display text-[15px] font-semibold text-parchment-100">
                CRM timeline
              </h2>
              <p className="mb-4 mt-0.5 text-[12px] text-ink-400">
                Every touchpoint logged against this parcel.
              </p>
              <ActivityFeed items={timeline} />
            </div>
          </div>

          <div className="space-y-4">
            <div className="panel p-5">
              <div className="mb-3 flex items-center gap-2">
                <Gauge size={14} className="text-brand-400" />
                <h2 className="font-display text-[14px] font-semibold text-parchment-100">
                  Owner profile
                </h2>
              </div>
              {owner ? (
                <div>
                  <Link
                    href={`/owners/${owner.id}`}
                    className="text-[14px] font-medium text-parchment-100 hover:text-brand-400"
                  >
                    {owner.name}
                  </Link>
                  <p className="mt-0.5 font-mono text-[11px] text-ink-400">{owner.type}</p>

                  <dl className="mt-4 space-y-2.5 text-[12.5px]">
                    <div className="flex justify-between gap-2">
                      <dt className="text-ink-400">Phone</dt>
                      <dd className="font-mono text-parchment-100">{owner.phone}</dd>
                    </div>
                    <div className="flex justify-between gap-2">
                      <dt className="text-ink-400">Email</dt>
                      <dd className="max-w-[160px] truncate text-parchment-100" title={owner.email}>
                        {owner.email}
                      </dd>
                    </div>
                    <div>
                      <dt className="mb-1 text-ink-400">Mailing address</dt>
                      <dd className="leading-snug text-parchment-100">{owner.mailingAddress}</dd>
                    </div>
                    <div className="flex justify-between gap-2 border-t border-white/[0.06] pt-2.5">
                      <dt className="text-ink-400">Contact status</dt>
                      <dd className="text-parchment-100">{owner.contactStatus}</dd>
                    </div>
                  </dl>

                  <Link
                    href={`/owners/${owner.id}`}
                    className="btn-brand mt-5 w-full text-[12.5px]"
                  >
                    View full owner profile
                  </Link>
                </div>
              ) : (
                <p className="text-[12.5px] text-ink-400">No owner on record.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
