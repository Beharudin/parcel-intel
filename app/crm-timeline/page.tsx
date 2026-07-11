import { DashboardShell } from "@/components/DashboardShell";
import { ComingSoon } from "@/components/ComingSoon";
import { allNavItems } from "@/lib/nav";

const item = allNavItems.find((i) => i.href === "/crm-timeline")!;

export default function CrmTimelinePage() {
  return (
    <DashboardShell crumb="CRM Timeline">
      <ComingSoon title={item.label} description={item.description!} icon={item.icon} />
    </DashboardShell>
  );
}
