import { PlaceholderPage } from "./placeholder-page";

export function McpPage() {
  return (
    <PlaceholderPage
      eyebrow="Operations / MCP"
      title="MCP"
      description="A future registry for model context protocol servers, bridge status, and connection surfaces that feed the local workbench."
      status="Tooling fabric"
      details={[
        { label: "Concern", value: "Servers and tool access" },
        { label: "Operator pattern", value: "Scan list, inspect detail" },
        { label: "Phase 0 shell", value: "No protocol assumptions" },
        { label: "Layout bias", value: "Operational over decorative" },
      ]}
      sections={[
        {
          title: "Primary view",
          description: "This route is built to support a clear server list later.",
          body: (
            <ul className="space-y-2">
              <li>Healthy versus broken states should be visible at a glance.</li>
              <li>Transport detail belongs in the inspector, not in card clutter.</li>
              <li>Actions can stay sparse because the operator knows the system well.</li>
            </ul>
          ),
        },
        {
          title: "Eventual detail",
          description: "Reserved for concrete backend shapes when they exist.",
          body: (
            <ul className="space-y-2">
              <li>Connection target and transport</li>
              <li>Advertised tools and resources</li>
              <li>Last health check or error context</li>
            </ul>
          ),
        },
        {
          title: "Not implemented",
          description: "Avoided to keep the scaffold honest.",
          body: (
            <ul className="space-y-2">
              <li>No fetches to imaginary endpoints</li>
              <li>No mock servers that imply a stable API</li>
              <li>No connection controls until the contract exists</li>
            </ul>
          ),
        },
      ]}
    />
  );
}
