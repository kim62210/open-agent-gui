import { PlaceholderPage } from "./placeholder-page";

export function WorkspacesPage() {
  return (
    <PlaceholderPage
      eyebrow="Work / Workspaces"
      title="Workspaces"
      description="A home for local repos, working sets, and context bundles that help the operator switch tasks without losing continuity."
      status="Context registry"
      details={[
        { label: "Core unit", value: "Local workspace" },
        { label: "Shape", value: "Grid + detail drill-in" },
        { label: "Reference", value: "Dify shell with Directus detail habits" },
        { label: "Operator need", value: "Fast switching with low ceremony" },
      ]}
      sections={[
        {
          title: "Layout intent",
          description: "Designed to support cards now and richer detail later.",
          body: (
            <ul className="space-y-2">
              <li>Each workspace becomes a selectable operating surface.</li>
              <li>Important state should move into the inspector, not a modal.</li>
              <li>Cards can stay compact because a single user will recognize labels quickly.</li>
            </ul>
          ),
        },
        {
          title: "Expected contents",
          description: "Phase 1 will wire these to real data.",
          body: (
            <ul className="space-y-2">
              <li>Repo path and branch</li>
              <li>Default model and skill set</li>
              <li>Recent sessions or pinned pages</li>
            </ul>
          ),
        },
        {
          title: "What stays out",
          description: "No fake intelligence, no invented workflows.",
          body: (
            <ul className="space-y-2">
              <li>No automatic repo discovery logic</li>
              <li>No persistence beyond local shell state</li>
              <li>No opinionated setup wizard yet</li>
            </ul>
          ),
        },
      ]}
    />
  );
}
