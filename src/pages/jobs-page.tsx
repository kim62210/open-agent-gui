import { PlaceholderPage } from "./placeholder-page";

export function JobsPage() {
  return (
    <PlaceholderPage
      eyebrow="Operations / Jobs"
      title="Jobs"
      description="A background work surface for queued tasks, recurring automation, and asynchronous execution that should not live inside chat."
      status="Queue surface"
      details={[
        { label: "Intent", value: "Background work and automation" },
        { label: "Reading pattern", value: "Queue first, detail second" },
        { label: "Future actions", value: "Pause, retry, inspect" },
        { label: "Shell state", value: "Ready for lists and filters" },
      ]}
      sections={[
        {
          title: "Reason for separation",
          description: "Jobs deserve an operational home instead of cluttering the chat surface.",
          body: (
            <ul className="space-y-2">
              <li>Scheduled and asynchronous work needs different scanning behavior.</li>
              <li>The right inspector is a natural home for selected job detail.</li>
              <li>Command palette entries can eventually trigger common job actions.</li>
            </ul>
          ),
        },
        {
          title: "Future content",
          description: "Added later once backend semantics are real.",
          body: (
            <ul className="space-y-2">
              <li>Job rows with status and age</li>
              <li>Run linkage and artifact references</li>
              <li>Simple operator controls for retry or cancel</li>
            </ul>
          ),
        },
        {
          title: "Held back",
          description: "No pretend scheduling system in Phase 0.",
          body: (
            <ul className="space-y-2">
              <li>No cron syntax UI</li>
              <li>No persistence model</li>
              <li>No job API client beyond the shared base shell</li>
            </ul>
          ),
        },
      ]}
    />
  );
}
