import { useEffect, useRef } from "react";
import { cn } from "../../lib/cn";
import type { ChatMessage } from "../../state/chat-store";

interface ChatThreadProps {
  messages: ChatMessage[];
}

function getRoleLabel(role: ChatMessage["role"]) {
  return role === "user" ? "Operator" : "Workbench";
}

export function ChatThread({ messages }: ChatThreadProps) {
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex min-h-[20rem] items-center justify-center rounded-soft border border-dashed border-line/70 bg-surface/50 px-6 py-10 text-center">
        <div className="max-w-xl space-y-3">
          <p className="workbench-label">Ready for first prompt</p>
          <p className="text-sm leading-7 text-copy-muted sm:text-base">
            Send a question to start a live streamed reply. Assistant tokens will render here as the backend emits them.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-h-[32rem] space-y-4 overflow-y-auto pr-1">
      {messages.map((message) => {
        const isUser = message.role === "user";

        return (
          <div key={`${message.role}-${message.content}-${message.status ?? "complete"}`} className={cn("flex", isUser ? "justify-end" : "justify-start")}>
            <article
              className={cn(
                "w-full max-w-3xl rounded-soft border p-4",
                isUser
                  ? "border-accent/25 bg-accent-soft text-copy"
                  : "border-line/60 bg-black/10 text-copy-muted",
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <p className="workbench-label">{getRoleLabel(message.role)}</p>
                <span className="text-[0.68rem] uppercase tracking-[0.16em] text-copy-muted">
                  {message.status === "streaming" ? "Streaming" : message.status === "error" ? "Error" : "Ready"}
                </span>
              </div>
              <p className={cn("mt-3 whitespace-pre-wrap text-sm leading-7", isUser ? "text-copy" : "text-copy-muted")}>
                {message.content || "…"}
              </p>
            </article>
          </div>
        );
      })}
      <div ref={endRef} />
    </div>
  );
}
