export type NavigationItem = {
  to: string;
  label: string;
  description: string;
  group: string;
  accent: string;
  shortcut?: string;
};

export const navigationGroups: Array<{ label: string; items: NavigationItem[] }> = [
  {
    label: "Work",
    items: [
      {
        to: "/chat",
        label: "Chat",
        description: "Operator conversations, drafts, and quick execution loops.",
        group: "Work",
        accent: "Live workspace",
        shortcut: "G C",
      },
      {
        to: "/runs",
        label: "Runs",
        description: "Inspect recent agent runs and execution timelines.",
        group: "Work",
        accent: "Traceable output",
        shortcut: "G R",
      },
      {
        to: "/workspaces",
        label: "Workspaces",
        description: "Manage local working sets, repos, and contexts.",
        group: "Work",
        accent: "Local context",
      },
      {
        to: "/pages",
        label: "Pages",
        description: "Structured notes, prompts, and reference material.",
        group: "Work",
        accent: "Reference surfaces",
      },
    ],
  },
  {
    label: "Operations",
    items: [
      {
        to: "/mcp",
        label: "MCP",
        description: "Servers, tool bridges, and connection surfaces.",
        group: "Operations",
        accent: "Tooling fabric",
      },
      {
        to: "/jobs",
        label: "Jobs",
        description: "Queued work, automation hooks, and background tasks.",
        group: "Operations",
        accent: "Background work",
      },
    ],
  },
  {
    label: "System",
    items: [
      {
        to: "/settings",
        label: "Settings",
        description: "Local preferences, model defaults, and environment setup.",
        group: "System",
        accent: "Workbench controls",
      },
      {
        to: "/admin",
        label: "Admin",
        description: "Instance status, safeguards, and operator-only controls.",
        group: "System",
        accent: "Instance control",
      },
    ],
  },
];

export const navigationItems = navigationGroups.flatMap((group) => group.items);

export function resolveNavigationItem(pathname: string): NavigationItem {
  return navigationItems.find((item) => item.to === pathname) ?? navigationItems[0];
}
