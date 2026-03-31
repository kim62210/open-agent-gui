import { PlaceholderPage } from "./placeholder-page";

export function AdminPage() {
  return (
    <PlaceholderPage
      eyebrow="System / Admin"
      title="Admin"
      description="A compact control surface for instance-level oversight, safeguards, and maintenance tasks that only the operator should touch."
      status="Instance control"
      details={[
        { label: "Scope", value: "Operational controls" },
        { label: "Tone", value: "Serious, not ceremonial" },
        { label: "Expected use", value: "Occasional, high-trust actions" },
        { label: "Current state", value: "Placeholder with IA slot" },
      ]}
      sections={[
        {
          title: "Role in the IA",
          description: "Separated from Settings because these actions affect the instance, not personal workflow comfort.",
          body: (
            <ul className="space-y-2">
              <li>System health and policy controls can remain sparse but explicit.</li>
              <li>Maintenance actions should be surrounded by context, not hidden behind menus.</li>
              <li>The inspector can later show selected service or safeguard details.</li>
            </ul>
          ),
        },
        {
          title: "Future modules",
          description: "Only once backend capabilities are defined.",
          body: (
            <ul className="space-y-2">
              <li>Service health and storage overview</li>
              <li>Operator audit surfaces</li>
              <li>Guarded maintenance actions</li>
            </ul>
          ),
        },
        {
          title: "What is intentionally absent",
          description: "No invented administration system.",
          body: (
            <ul className="space-y-2">
              <li>No fake user management</li>
              <li>No fabricated permissions model</li>
              <li>No dangerous controls without real backend backing</li>
            </ul>
          ),
        },
      ]}
    />
  );
}
