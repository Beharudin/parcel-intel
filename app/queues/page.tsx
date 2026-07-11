import { DashboardShell } from "@/components/DashboardShell";
import { ComingSoon } from "@/components/ComingSoon";
import { allNavItems } from "@/lib/nav";

const item = allNavItems.find((i) => i.href === "/queues")!;

export default function QueuesPage() {
  return (
    <DashboardShell crumb="Opportunity Queues">
      <ComingSoon title={item.label} description={item.description!} icon={item.icon} />
    </DashboardShell>
  );
}
