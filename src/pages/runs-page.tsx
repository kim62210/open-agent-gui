import { useQuery } from "@tanstack/react-query";
import { PageFrame } from "../components/ui/page-frame";
import { SurfaceCard } from "../components/ui/surface-card";
import { getRuns } from "../lib/api-client";
import { hasStoredCredentials } from "../lib/credentials";

function formatTimestamp(value?: string) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString();
}

export function RunsPage() {
  const hasCredentials = hasStoredCredentials();
  const runsQuery = useQuery({
    queryKey: ["runs"],
    queryFn: getRuns,
    enabled: hasCredentials,
    refetchInterval: 15_000,
  });

  return (
    <PageFrame
      eyebrow="Work / Runs"
      title="Runs"
      description="Inspect recent execution records, confirm that the workbench is pointed at a live backend, and prepare for deeper run detail views in the next phase."
      actions={<div className="workbench-chip border-accent/40 bg-accent-soft text-accent">Execution ledger</div>}
    >
      <div className="space-y-5">
        <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <div className="workbench-card p-4">
            <p className="workbench-label">Auth state</p>
            <p className="mt-3 text-sm font-medium text-copy sm:text-base">
              {hasCredentials ? "Credentials available" : "Credentials required"}
            </p>
          </div>
          <div className="workbench-card p-4">
            <p className="workbench-label">Run count</p>
            <p className="mt-3 text-sm font-medium text-copy sm:text-base">
              {runsQuery.data ? runsQuery.data.length : hasCredentials ? "Loading…" : "—"}
            </p>
          </div>
          <div className="workbench-card p-4">
            <p className="workbench-label">Polling</p>
            <p className="mt-3 text-sm font-medium text-copy sm:text-base">15 seconds</p>
          </div>
          <div className="workbench-card p-4">
            <p className="workbench-label">Mode</p>
            <p className="mt-3 text-sm font-medium text-copy sm:text-base">Operator-first inspection</p>
          </div>
        </section>

        {!hasCredentials ? (
          <SurfaceCard
            title="Authentication needed"
            description="The runs API requires a bearer token or API key. Save one in Settings, then return here."
          >
            <ul className="space-y-2 text-sm leading-6 text-copy-muted">
              <li>Use `/api/auth/login` to obtain an `access_token`.</li>
              <li>Or create an API key in Open Agent and paste it into Settings.</li>
              <li>Once credentials are stored locally, this page will start polling `/api/runs/` automatically.</li>
            </ul>
          </SurfaceCard>
        ) : runsQuery.isError ? (
          <SurfaceCard title="Runs query failed" description="The backend rejected the request or is currently unavailable.">
            <p className="text-sm leading-6 text-copy-muted">
              {runsQuery.error instanceof Error ? runsQuery.error.message : "Unknown error"}
            </p>
          </SurfaceCard>
        ) : (
          <SurfaceCard title="Recent runs" description="A lightweight execution table for the first real backend-connected page.">
            <div className="overflow-hidden rounded-soft border border-line">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead className="bg-surface-strong/60 text-copy-muted">
                  <tr>
                    <th className="px-4 py-3 font-medium">Run</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Updated</th>
                    <th className="px-4 py-3 font-medium">Events</th>
                  </tr>
                </thead>
                <tbody>
                  {runsQuery.data && runsQuery.data.length > 0 ? (
                    runsQuery.data.map((run) => (
                      <tr key={run.id} className="border-t border-line/70 align-top">
                        <td className="px-4 py-3 text-copy">{run.id}</td>
                        <td className="px-4 py-3 text-copy">{run.status}</td>
                        <td className="px-4 py-3 text-copy-muted">{formatTimestamp(run.updated_at ?? run.created_at)}</td>
                        <td className="px-4 py-3 text-copy-muted">{run.events?.length ?? 0}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-4 py-8 text-center text-copy-muted">
                        {runsQuery.isLoading ? "Loading runs…" : "No runs yet."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </SurfaceCard>
        )}
      </div>
    </PageFrame>
  );
}
