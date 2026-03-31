import { useQuery } from "@tanstack/react-query";
import { appConfig } from "../../config/env";
import { getHealth } from "../../lib/api-client";
import type { NavigationItem } from "../../lib/navigation";

type TopBarProps = {
  currentPage: NavigationItem;
  onOpenPalette: () => void;
  onToggleInspector: () => void;
};

export function TopBar({ currentPage, onOpenPalette, onToggleInspector }: TopBarProps) {
  const healthQuery = useQuery({
    queryKey: ["health"],
    queryFn: getHealth,
    refetchInterval: 30_000,
  });

  const healthLabel = healthQuery.data
    ? healthQuery.data.llm_connected
      ? `LLM ready · ${healthQuery.data.model}`
      : `LLM offline · ${healthQuery.data.error ?? "check settings"}`
    : healthQuery.isError
      ? "Backend unavailable"
      : "Checking backend";

  return (
    <header className="sticky top-0 z-20 border-b border-line/60 bg-canvas/80 px-4 py-4 backdrop-blur-md sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.18em] text-copy-muted">
            <span>{currentPage.group}</span>
            <span className="inline-block size-1 rounded-full bg-line" />
            <span>{currentPage.accent}</span>
          </div>
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-copy">{currentPage.label}</h2>
            <p className="text-sm text-copy-muted">{currentPage.description}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onOpenPalette}
            className="inline-flex items-center gap-3 rounded-full border border-line/70 bg-surface px-4 py-2 text-sm text-copy-muted transition hover:border-accent/35 hover:text-copy"
          >
            <span>Quick switch</span>
            <span className="rounded-full border border-line/70 px-2 py-1 text-[0.68rem] uppercase tracking-[0.16em]">
              ⌘K
            </span>
          </button>

          <button
            type="button"
            onClick={onToggleInspector}
            className="inline-flex items-center rounded-full border border-line/70 bg-surface px-4 py-2 text-sm text-copy-muted transition hover:border-line hover:text-copy"
          >
            Inspector
          </button>

          <div className="workbench-chip">
            <span className="inline-block size-2 rounded-full bg-accent" />
            <span>{appConfig.mode}</span>
          </div>

          <div className="workbench-chip max-w-[24rem] truncate">
            <span
              className={`inline-block size-2 rounded-full ${
                healthQuery.data?.llm_connected ? "bg-success" : healthQuery.isError ? "bg-warning" : "bg-line"
              }`}
            />
            <span className="truncate">{healthLabel}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
