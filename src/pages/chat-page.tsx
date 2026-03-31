import { PageFrame } from "../components/ui/page-frame";
import { ChatComposer } from "../components/chat/chat-composer";
import { ChatThread } from "../components/chat/chat-thread";
import { SurfaceCard } from "../components/ui/surface-card";
import { hasStoredCredentials } from "../lib/credentials";
import { useChatStore } from "../state/workbench-store";

export function ChatPage() {
  const draft = useChatStore((state) => state.draft);
  const messages = useChatStore((state) => state.messages);
  const stream = useChatStore((state) => state.stream);
  const isStreaming = stream.status === "streaming";
  const error = stream.error;
  const setDraft = useChatStore((state) => state.setDraft);
  const sendMessage = useChatStore((state) => state.sendMessage);

  const hasCredentials = hasStoredCredentials();
  const submitDisabled = !hasCredentials || isStreaming || draft.trim().length === 0;

  return (
    <PageFrame
      eyebrow="Work / Chat"
      title="Chat workbench"
      description="A focused operator chat surface wired to the real streaming backend so prompts, partial tokens, and final responses all stay visible in one calm workbench lane."
      actions={
        <div className="workbench-chip border-accent/40 bg-accent-soft text-accent">
          {hasCredentials ? (isStreaming ? "Streaming live" : "Live operator chat") : "Credentials required"}
        </div>
      }
    >
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.45fr)_minmax(18rem,0.9fr)]">
        <SurfaceCard
          title="Session canvas"
          description="POST /api/chat/stream is the primary path here, so assistant output appears as soon as the backend emits token or content_delta events."
          className="min-h-[36rem]"
        >
          <div className="flex h-full flex-col gap-4">
            <ChatThread messages={messages} />
            <ChatComposer
              value={draft}
              disabled={submitDisabled}
              hasCredentials={hasCredentials}
              isStreaming={isStreaming}
              error={error}
              onChange={setDraft}
              onSubmit={() => {
                void sendMessage(draft);
              }}
            />
          </div>
        </SurfaceCard>

        <div className="space-y-4">
          <SurfaceCard title="Connection" description="This page stays deliberately small: auth, stream status, and the exact request lane it depends on.">
            <dl className="space-y-3 text-sm text-copy-muted">
              <div className="flex items-start justify-between gap-4">
                <dt>Auth</dt>
                <dd className="text-right font-medium text-copy">{hasCredentials ? "Stored locally" : "Missing"}</dd>
              </div>
              <div className="flex items-start justify-between gap-4">
                <dt>Transport</dt>
                <dd className="text-right font-medium text-copy">POST + SSE</dd>
              </div>
              <div className="flex items-start justify-between gap-4">
                <dt>Endpoint</dt>
                <dd className="text-right font-medium text-copy">/api/chat/stream</dd>
              </div>
              <div className="flex items-start justify-between gap-4">
                <dt>State</dt>
                <dd className="text-right font-medium text-copy">{isStreaming ? "Receiving tokens" : "Idle"}</dd>
              </div>
            </dl>
          </SurfaceCard>

          <SurfaceCard title="Streaming contract" description="The UI only relies on the backend fields that are already known for chat streaming.">
            <ul className="space-y-3 text-sm leading-6 text-copy-muted">
              <li>Request body sends the live conversation as `messages`.</li>
              <li>`token` and `content_delta` frames append visible assistant text immediately.</li>
              <li>`done` closes the turn, while `error` stays inline instead of failing silently.</li>
            </ul>
          </SurfaceCard>
        </div>
      </div>
    </PageFrame>
  );
}
