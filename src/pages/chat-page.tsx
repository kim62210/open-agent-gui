import { PageFrame } from "../components/ui/page-frame";
import { SurfaceCard } from "../components/ui/surface-card";

const messages = [
  {
    role: "Operator",
    content: "Start a clean GUI shell for local agent operations. Keep the navigation grouped and inspector-friendly.",
  },
  {
    role: "Workbench",
    content: "Phase 0 is active. Routing, shell structure, and backend configuration are ready for feature wiring.",
  },
];

export function ChatPage() {
  return (
    <PageFrame
      eyebrow="Work / Chat"
      title="Chat workbench"
      description="A calm conversation surface for drafting, steering, and reviewing agent work without turning the whole product into a toy messenger."
      actions={<div className="workbench-chip border-accent/40 bg-accent-soft text-accent">Phase 0 shell</div>}
    >
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.45fr)_minmax(18rem,0.9fr)]">
        <SurfaceCard
          title="Session canvas"
          description="Large, readable message space with enough density for an operator to skim decisions, outputs, and next actions."
          className="min-h-[32rem]"
        >
          <div className="space-y-4">
            {messages.map((message) => (
              <article key={message.role} className="rounded-soft border border-line/60 bg-black/10 p-4">
                <p className="workbench-label">{message.role}</p>
                <p className="mt-3 text-sm leading-7 text-copy-muted">{message.content}</p>
              </article>
            ))}

            <div className="rounded-soft border border-dashed border-line/70 bg-surface/70 p-4">
              <p className="text-sm text-copy-muted">
                Composer, slash commands, attachments, and rich run inserts land in the next phase.
              </p>
            </div>
          </div>
        </SurfaceCard>

        <div className="space-y-4">
          <SurfaceCard title="Context pins" description="Reserved for the workspace, page, and run references currently attached to the chat.">
            <ul className="space-y-3 text-sm leading-6 text-copy-muted">
              <li>Local repo state</li>
              <li>Selected workspace memory</li>
              <li>Recent run summaries</li>
            </ul>
          </SurfaceCard>

          <SurfaceCard title="Next wiring" description="The shell is ready for real feature work when APIs are defined.">
            <ul className="space-y-3 text-sm leading-6 text-copy-muted">
              <li>Thread list and draft persistence</li>
              <li>Message send + stream states</li>
              <li>Structured attachments and run inserts</li>
            </ul>
          </SurfaceCard>
        </div>
      </div>
    </PageFrame>
  );
}
