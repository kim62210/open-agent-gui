import { PlaceholderPage } from "./placeholder-page";

export function PagesPage() {
  return (
    <PlaceholderPage
      eyebrow="Work / Pages"
      title="Pages"
      description="Structured reference space for prompts, notes, and internal knowledge that should live close to active agent work."
      status="Reference surface"
      details={[
        { label: "Purpose", value: "Long-form context and reusable docs" },
        { label: "Reading mode", value: "Editor-friendly page frame" },
        { label: "Cross-link future", value: "Attach into chat and workspaces" },
        { label: "Tone", value: "Quiet documentation, not wiki sprawl" },
      ]}
      sections={[
        {
          title: "Why this matters",
          description: "A power user needs durable context, not just chat transcripts.",
          body: (
            <ul className="space-y-2">
              <li>Pages hold reusable prompts, notes, and project memory.</li>
              <li>The shell already gives them a stable route and page frame.</li>
              <li>Future editing can stay focused because the information architecture is separated now.</li>
            </ul>
          ),
        },
        {
          title: "Planned surfaces",
          description: "Enough room for both list and reading detail patterns.",
          body: (
            <ul className="space-y-2">
              <li>Page library or outline in the main content region</li>
              <li>Selection metadata in the right inspector</li>
              <li>Lightweight command entry for page actions via the palette</li>
            </ul>
          ),
        },
        {
          title: "Scope guardrails",
          description: "Phase 0 stays intentionally thin.",
          body: (
            <ul className="space-y-2">
              <li>No editor integration yet</li>
              <li>No markdown pipeline assumptions</li>
              <li>No storage format commitments</li>
            </ul>
          ),
        },
      ]}
    />
  );
}
