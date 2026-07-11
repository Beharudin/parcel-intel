import { DashboardShell } from "@/components/DashboardShell";
import { ComingSoon } from "@/components/ComingSoon";
import { allNavItems } from "@/lib/nav";

const item = allNavItems.find((i) => i.href === "/reports")!;

export default function ReportsPage() {
  return (
    <DashboardShell crumb="Reports">
      <ComingSoon title={item.label} description={item.description!} icon={item.icon} />
    </DashboardShell>
  );
}
