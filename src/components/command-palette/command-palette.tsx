import { useNavigate } from "@tanstack/react-router";
import { navigationGroups } from "../../lib/navigation";

type CommandPaletteProps = {
  open: boolean;
  onClose: () => void;
};

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const navigate = useNavigate();

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 px-4 py-12 backdrop-blur-sm">
      <div className="workbench-panel w-full max-w-2xl overflow-hidden">
        <div className="border-b border-line/60 px-5 py-4 sm:px-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="workbench-label">Command palette</p>
              <h2 className="mt-2 text-lg font-semibold text-copy">Quick jump and future command entry</h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-line/70 px-3 py-1.5 text-sm text-copy-muted transition hover:text-copy"
            >
              Esc
            </button>
          </div>
          <p className="mt-3 text-sm leading-6 text-copy-muted">
            Phase 0 keeps this intentionally lightweight: fast navigation today, full command execution later.
          </p>
        </div>

        <div className="grid gap-5 px-5 py-5 sm:px-6 lg:grid-cols-2">
          {navigationGroups.map((group) => (
            <section key={group.label} className="space-y-3">
              <p className="workbench-label">{group.label}</p>
              <div className="space-y-2">
                {group.items.map((item) => (
                  <button
                    key={item.to}
                    type="button"
                    onClick={() => {
                      onClose();
                      void navigate({ to: item.to });
                    }}
                    className="flex w-full items-start justify-between gap-3 rounded-soft border border-line/60 bg-surface-muted/85 px-4 py-3 text-left transition hover:border-accent/35 hover:bg-accent-soft/70"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-copy">{item.label}</span>
                        <span className="text-[0.68rem] uppercase tracking-[0.16em] text-copy-muted">
                          {item.accent}
                        </span>
                      </div>
                      <p className="mt-1 text-sm leading-5 text-copy-muted">{item.description}</p>
                    </div>
                    <span className="text-xs text-copy-muted">↵</span>
                  </button>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
