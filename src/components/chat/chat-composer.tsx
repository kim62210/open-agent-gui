import type { KeyboardEvent } from "react";

interface ChatComposerProps {
  value: string;
  disabled: boolean;
  hasCredentials: boolean;
  isStreaming: boolean;
  error: string | null;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

export function ChatComposer({
  value,
  disabled,
  hasCredentials,
  isStreaming,
  error,
  onChange,
  onSubmit,
}: ChatComposerProps) {
  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key !== "Enter" || event.shiftKey) {
      return;
    }

    event.preventDefault();

    if (!disabled) {
      onSubmit();
    }
  }

  return (
    <div className="space-y-3 border-t border-line/60 pt-4">
      <label className="block space-y-2 text-sm text-copy-muted">
        <span className="workbench-label">Composer</span>
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={handleKeyDown}
          rows={4}
          disabled={!hasCredentials || isStreaming}
          placeholder={hasCredentials ? "Ask the workbench to inspect, plan, or draft…" : "Save credentials in Settings to unlock chat."}
          className="w-full rounded-soft border border-line bg-canvas px-4 py-3 text-sm leading-7 text-copy outline-none transition placeholder:text-copy-muted focus:border-accent/50 disabled:cursor-not-allowed disabled:opacity-60"
        />
      </label>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1 text-sm text-copy-muted">
          <p>{hasCredentials ? "Enter sends · Shift+Enter adds a new line." : "Chat requires a bearer token or API key."}</p>
          {error ? <p className="text-warning">{error}</p> : null}
        </div>

        <button
          type="button"
          onClick={onSubmit}
          disabled={disabled}
          className="inline-flex min-h-11 items-center justify-center rounded-full border border-accent/35 bg-accent-soft px-4 py-2 text-sm font-medium text-accent transition hover:border-accent/50 disabled:cursor-not-allowed disabled:border-line/70 disabled:bg-surface disabled:text-copy-muted"
        >
          {isStreaming ? "Streaming…" : "Send"}
        </button>
      </div>
    </div>
  );
}
