import { DashboardShell } from "@/components/DashboardShell";
import { ComingSoon } from "@/components/ComingSoon";
import { allNavItems } from "@/lib/nav";

const item = allNavItems.find((i) => i.href === "/ai-assistant")!;

export default function AiAssistantPage() {
  return (
    <DashboardShell crumb="AI Assistant">
      <ComingSoon title={item.label} description={item.description!} icon={item.icon} />
    </DashboardShell>
  );
}
