import { useQuery } from "@tanstack/react-query";
import { appConfig } from "../../config/env";
import { getHostInfo, getVersion } from "../../lib/api-client";
import type { NavigationItem } from "../../lib/navigation";
import { SurfaceCard } from "../ui/surface-card";

type InspectorPanelProps = {
  currentPage: NavigationItem;
};

export function InspectorPanel({ currentPage }: InspectorPanelProps) {
  const versionQuery = useQuery({ queryKey: ["version"], queryFn: getVersion });
  const hostInfoQuery = useQuery({ queryKey: ["host-info"], queryFn: getHostInfo });

  return (
    <aside className="hidden w-[20rem] shrink-0 xl:block">
      <div className="sticky top-[6.25rem] space-y-4">
        <SurfaceCard
          title="Inspector"
          description="Reserved for detail context, inline metadata, and focused actions in later phases."
        >
          <dl className="space-y-3 text-sm text-copy-muted">
            <div className="flex items-start justify-between gap-3">
              <dt>Current surface</dt>
              <dd className="font-medium text-copy">{currentPage.label}</dd>
            </div>
            <div className="flex items-start justify-between gap-3">
              <dt>IA group</dt>
              <dd className="font-medium text-copy">{currentPage.group}</dd>
            </div>
            <div className="flex items-start justify-between gap-3">
              <dt>Backend</dt>
              <dd className="max-w-[10rem] text-right font-medium text-copy">{appConfig.apiBaseUrl}</dd>
            </div>
            <div className="flex items-start justify-between gap-3">
              <dt>Version</dt>
              <dd className="font-medium text-copy">{versionQuery.data?.current ?? "…"}</dd>
            </div>
            <div className="flex items-start justify-between gap-3">
              <dt>Host</dt>
              <dd className="max-w-[10rem] text-right font-medium text-copy">
                {hostInfoQuery.data?.expose
                  ? `${hostInfoQuery.data.lan_ip ?? "LAN"}:${hostInfoQuery.data.port}`
                  : `127.0.0.1:${hostInfoQuery.data?.port ?? 4821}`}
              </dd>
            </div>
          </dl>
        </SurfaceCard>

        <SurfaceCard title="Phase 0 notes" description="What is deliberately left out for now.">
          <ul className="space-y-3 text-sm leading-6 text-copy-muted">
            <li>Real API resources and mutations are intentionally deferred.</li>
            <li>Selection-aware detail panels land when entity models exist.</li>
            <li>Command palette is present as a shell, not as a full command system.</li>
          </ul>
        </SurfaceCard>
      </div>
    </aside>
  );
}
