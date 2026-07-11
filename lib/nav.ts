import {
  LayoutDashboard,
  Building2,
  Users,
  Contact,
  ListOrdered,
  History,
  Route,
  ShieldCheck,
  FileBarChart,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  status: "live" | "soon";
  description?: string;
}

export const navSections: { title: string; items: NavItem[] }[] = [
  {
    title: "Oversight",
    items: [
      { label: "Dashboard", href: "/", icon: LayoutDashboard, status: "live" },
      { label: "Properties", href: "/properties", icon: Building2, status: "live" },
      { label: "Owners", href: "/owners", icon: Users, status: "live" },
    ],
  },
  {
    title: "Workflow",
    items: [
      {
        label: "Contacts",
        href: "/contacts",
        icon: Contact,
        status: "soon",
        description:
          "A unified phone and email directory linking every contact back to the owners and properties they belong to, with verification status at a glance.",
      },
      {
        label: "Opportunity Queues",
        href: "/queues",
        icon: ListOrdered,
        status: "soon",
        description:
          "Prioritized work queues that rank leads by opportunity score, so the team always calls the most promising property first.",
      },
      {
        label: "CRM Timeline",
        href: "/crm-timeline",
        icon: History,
        status: "soon",
        description:
          "A network-wide feed of every call, email, note and status change, filterable by rep, property and outcome.",
      },
      {
        label: "Source Trace",
        href: "/source-trace",
        icon: Route,
        status: "soon",
        description:
          "Full provenance for every data point: which registry or feed it came from, how it was captured, and how confident we are in it.",
      },
      {
        label: "Data Quality",
        href: "/data-quality",
        icon: ShieldCheck,
        status: "soon",
        description:
          "Monitors contact and parcel data health across the network: verified vs. unverified, bounced emails, and stale records that need a re-skip.",
      },
      {
        label: "Reports",
        href: "/reports",
        icon: FileBarChart,
        status: "soon",
        description:
          "Exportable performance reports across acquisitions, lead sources, and rep activity for weekly leadership review.",
      },
      {
        label: "AI Assistant",
        href: "/ai-assistant",
        icon: Sparkles,
        status: "soon",
        description:
          "A parcel-aware assistant that drafts owner outreach, summarizes CRM history, and recommends the next best action on any property.",
      },
    ],
  },
];

export const allNavItems: NavItem[] = navSections.flatMap((s) => s.items);
