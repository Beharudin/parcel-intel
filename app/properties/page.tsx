import { DashboardShell } from "@/components/DashboardShell";
import { PageHeader } from "@/components/PageHeader";
import { PropertiesTable } from "@/components/PropertiesTable";
import { properties } from "@/lib/data";

export default function PropertiesPage() {
  return (
    <DashboardShell crumb="Properties">
      <PageHeader
        eyebrow={`Property registry · ${properties.length} parcels`}
        title="Properties"
        description="Every tracked parcel, searchable by address, city, APN or owner."
      />
      <PropertiesTable />
    </DashboardShell>
  );
}
