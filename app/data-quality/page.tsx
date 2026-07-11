import { DashboardShell } from "@/components/DashboardShell";
import { ComingSoon } from "@/components/ComingSoon";
import { allNavItems } from "@/lib/nav";

const item = allNavItems.find((i) => i.href === "/data-quality")!;

export default function DataQualityPage() {
  return (
    <DashboardShell crumb="Data Quality">
      <ComingSoon title={item.label} description={item.description!} icon={item.icon} />
    </DashboardShell>
  );
}
