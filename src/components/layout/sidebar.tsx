import { Link } from "@tanstack/react-router";
import { appConfig } from "../../config/env";
import { navigationGroups } from "../../lib/navigation";

export function Sidebar() {
  return (
    <aside className="border-b border-line/60 bg-surface/75 md:sticky md:top-0 md:h-screen md:w-[18.5rem] md:border-b-0 md:border-r">
      <div className="flex h-full flex-col gap-6 px-4 py-4 sm:px-5">
        <div className="space-y-3 border-b border-line/50 pb-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="workbench-label">Local Agent Workbench</p>
              <h1 className="mt-2 font-display text-2xl tracking-tight text-copy">Open Agent</h1>
            </div>
            <div className="workbench-chip border-accent/40 bg-accent-soft text-accent">Local</div>
          </div>
          <p className="text-sm leading-6 text-copy-muted">
            A practical shell for one technical operator running a local agent stack.
          </p>
        </div>

        <nav className="flex-1 space-y-6 overflow-y-auto pr-1">
          {navigationGroups.map((group) => (
            <section key={group.label} className="space-y-2">
              <p className="workbench-label px-2">{group.label}</p>
              <div className="space-y-1.5">
                {group.items.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    activeOptions={{ exact: true }}
                    activeProps={{
                      className:
                        "border-accent/35 bg-accent-soft/80 text-copy shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]",
                    }}
                    className="group block rounded-soft border border-transparent px-3 py-3 transition hover:border-line/70 hover:bg-surface-muted/90"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-copy">{item.label}</span>
                          <span className="text-[0.68rem] uppercase tracking-[0.16em] text-copy-muted/80">
                            {item.accent}
                          </span>
                        </div>
                        <p className="text-sm leading-5 text-copy-muted">{item.description}</p>
                      </div>
                      {item.shortcut ? (
                        <span className="rounded-full border border-line/60 px-2 py-1 text-[0.68rem] text-copy-muted opacity-0 transition group-hover:opacity-100 md:opacity-100">
                          {item.shortcut}
                        </span>
                      ) : null}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </nav>

        <div className="workbench-card space-y-3 p-4">
          <div>
            <p className="workbench-label">Backend</p>
            <p className="mt-2 text-sm font-medium text-copy">{appConfig.apiBaseUrl}</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-copy-muted">
            <span className="inline-block size-2 rounded-full bg-success" />
            <span>Config scaffold only in Phase 0</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
