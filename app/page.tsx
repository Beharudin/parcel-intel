import Link from "next/link";
import { Building2, Users, Gauge, Flame, ArrowUpRight, TrendingUp } from "lucide-react";
import { DashboardShell } from "@/components/DashboardShell";
import { PageHeader, Panel } from "@/components/PageHeader";
import { StatCard } from "@/components/StatCard";
import { StampBadge, statusTone } from "@/components/StampBadge";
import { ScoreRing } from "@/components/ScoreRing";
import { ScoreTrendChart } from "@/components/charts/ScoreTrendChart";
import { LeadSourceChart } from "@/components/charts/LeadSourceChart";
import { ActivityFeed } from "@/components/ActivityFeed";
import {
  dashboardStats,
  properties,
  activities,
  formatCurrency,
  getOwnerById,
} from "@/lib/data";

export default function DashboardPage() {
  const topOpportunities = [...properties]
    .sort((a, b) => b.opportunityScore - a.opportunityScore)
    .slice(0, 5);

  const recentActivity = [...activities]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 6);

  return (
    <DashboardShell crumb="Dashboard">
      <PageHeader
        eyebrow="Network-wide · Live snapshot"
        title="Dashboard"
        description="Property health, owner reach, and this week's best opportunities at a glance."
      />

      <div className="stagger mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard
          label="Tracked Properties"
          value={dashboardStats.totalProperties.toString()}
          sublabel="new this week"
          delta={`+${dashboardStats.newThisWeek}`}
          icon={Building2}
          accent="brand"
        />
        <StatCard
          label="Owner Records"
          value={dashboardStats.totalOwners.toString()}
          sublabel="Individuals, LLCs & trusts"
          icon={Users}
          accent="blue"
        />
        <StatCard
          label="Avg Opportunity Score"
          value={dashboardStats.avgOpportunityScore.toString()}
          sublabel="Out of 100, network-wide"
          icon={Gauge}
          accent="survey"
        />
        <StatCard
          label="Hot Leads"
          value={dashboardStats.hotLeads.toString()}
          sublabel="Ready for an offer"
          icon={Flame}
          accent="flag"
        />
      </div>

      <div className="mb-6 grid gap-4 lg:grid-cols-3">
        <Panel
          className="lg:col-span-2 animate-fade-up"
          title="Opportunity score trend"
          subtitle="Average lead score across all tracked parcels."
          action={
            <span className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/[0.03] px-2 py-1 text-[10.5px] font-medium text-ink-300">
              <TrendingUp size={11} className="text-survey-400" />
              Last 8 weeks
            </span>
          }
        >
          <ScoreTrendChart />
        </Panel>

        <Panel
          className="animate-fade-up"
          title="Lead sources"
          subtitle="Active leads by acquisition channel."
        >
          <LeadSourceChart />
        </Panel>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Panel
          className="lg:col-span-2 animate-fade-up"
          title="Top opportunities"
          subtitle="Highest-scoring properties across the network."
          action={
            <Link
              href="/properties"
              className="inline-flex items-center gap-1 text-[12px] font-medium text-brand-400 hover:text-brand-300"
            >
              View all <ArrowUpRight size={13} />
            </Link>
          }
        >
          <div className="mt-3">
            {topOpportunities.map((p) => {
              const owner = getOwnerById(p.ownerId);
              return (
                <Link
                  key={p.id}
                  href={`/properties/${p.id}`}
                  className="flex items-center gap-3 border-t border-white/[0.05] px-5 py-3.5 transition-colors hover:bg-white/[0.025] sm:gap-4"
                >
                  <ScoreRing score={p.opportunityScore} size={44} stroke={3.5} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-medium text-parchment-100">
                      {p.address}, {p.city}
                    </p>
                    <p className="mt-0.5 font-mono text-[11px] text-ink-400">
                      {p.parcelId} · {owner?.name}
                    </p>
                  </div>
                  <StampBadge tone={statusTone(p.status)} className="hidden sm:inline-flex">
                    {p.status}
                  </StampBadge>
                  <div className="hidden w-24 shrink-0 text-right md:block">
                    <p className="font-mono text-[13px] tabular text-parchment-100">
                      {formatCurrency(p.estValue)}
                    </p>
                    <p className="text-[10px] text-ink-500">est. value</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </Panel>

        <Panel
          className="animate-fade-up p-5"
          title="Recent CRM activity"
          subtitle="Latest calls, notes and status changes."
        >
          <div className="mt-4">
            <ActivityFeed items={recentActivity} />
          </div>
        </Panel>
      </div>
    </DashboardShell>
  );
}
