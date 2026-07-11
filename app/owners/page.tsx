import { DashboardShell } from "@/components/DashboardShell";
import { PageHeader } from "@/components/PageHeader";
import { OwnersTable } from "@/components/OwnersTable";
import { owners } from "@/lib/data";

export default function OwnersPage() {
  return (
    <DashboardShell crumb="Owners">
      <PageHeader
        eyebrow={`Owner registry · ${owners.length} records`}
        title="Owners"
        description="Individuals, LLCs, trusts and estates behind every tracked parcel."
      />
      <OwnersTable />
    </DashboardShell>
  );
}
