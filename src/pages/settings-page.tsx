import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { PageFrame } from "../components/ui/page-frame";
import { SurfaceCard } from "../components/ui/surface-card";
import { appConfig } from "../config/env";
import { getHealth, getHostInfo, getVersion } from "../lib/api-client";
import {
  getStoredApiKey,
  getStoredBearerToken,
  hasStoredCredentials,
  setStoredApiKey,
  setStoredBearerToken,
} from "../lib/credentials";

export function SettingsPage() {
  const [bearerToken, setBearerToken] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [savedAt, setSavedAt] = useState<string | null>(null);

  useEffect(() => {
    setBearerToken(getStoredBearerToken());
    setApiKey(getStoredApiKey());
  }, []);

  const healthQuery = useQuery({ queryKey: ["health"], queryFn: getHealth });
  const versionQuery = useQuery({ queryKey: ["version"], queryFn: getVersion });
  const hostInfoQuery = useQuery({ queryKey: ["host-info"], queryFn: getHostInfo });

  function saveCredentials() {
    setStoredBearerToken(bearerToken);
    setStoredApiKey(apiKey);
    setSavedAt(new Date().toLocaleTimeString());
  }

  return (
    <PageFrame
      eyebrow="System / Settings"
      title="Settings"
      description="Connect the workbench to a live Open Agent backend, inspect runtime health, and store local auth material for protected routes."
      actions={<div className="workbench-chip border-accent/40 bg-accent-soft text-accent">Connection control room</div>}
    >
      <div className="space-y-5">
        <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <div className="workbench-card p-4">
            <p className="workbench-label">Backend target</p>
            <p className="mt-3 text-sm font-medium text-copy sm:text-base">{appConfig.apiBaseUrl}</p>
          </div>
          <div className="workbench-card p-4">
            <p className="workbench-label">Version</p>
            <p className="mt-3 text-sm font-medium text-copy sm:text-base">{versionQuery.data?.current ?? "Loading…"}</p>
          </div>
          <div className="workbench-card p-4">
            <p className="workbench-label">LLM health</p>
            <p className="mt-3 text-sm font-medium text-copy sm:text-base">
              {healthQuery.data ? (healthQuery.data.llm_connected ? "Connected" : "Not ready") : "Loading…"}
            </p>
          </div>
          <div className="workbench-card p-4">
            <p className="workbench-label">Credentials</p>
            <p className="mt-3 text-sm font-medium text-copy sm:text-base">
              {hasStoredCredentials() ? "Stored locally" : "Not configured"}
            </p>
          </div>
        </section>

        <section className="grid gap-4 xl:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.9fr)]">
          <SurfaceCard title="Operator credentials" description="Paste a bearer token or API key to unlock protected routes like runs, jobs, and resource operations.">
            <div className="space-y-4">
              <label className="block space-y-2 text-sm text-copy-muted">
                <span className="workbench-label">Bearer token</span>
                <textarea
                  value={bearerToken}
                  onChange={(event) => setBearerToken(event.target.value)}
                  rows={4}
                  className="w-full rounded-soft border border-line bg-canvas px-4 py-3 text-sm text-copy outline-none transition focus:border-accent/50"
                  placeholder="Paste /api/auth/login access_token here"
                />
              </label>

              <label className="block space-y-2 text-sm text-copy-muted">
                <span className="workbench-label">API key</span>
                <input
                  value={apiKey}
                  onChange={(event) => setApiKey(event.target.value)}
                  className="w-full rounded-soft border border-line bg-canvas px-4 py-3 text-sm text-copy outline-none transition focus:border-accent/50"
                  placeholder="Paste X-API-Key here"
                />
              </label>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={saveCredentials}
                  className="inline-flex items-center rounded-full border border-accent/35 bg-accent-soft px-4 py-2 text-sm font-medium text-accent transition hover:border-accent/50"
                >
                  Save locally
                </button>
                {savedAt ? <span className="text-sm text-copy-muted">Saved at {savedAt}</span> : null}
              </div>
            </div>
          </SurfaceCard>

          <SurfaceCard title="Runtime status" description="Live backend state from currently safe endpoints.">
            <dl className="space-y-3 text-sm text-copy-muted">
              <div className="flex items-start justify-between gap-4">
                <dt>Health</dt>
                <dd className="text-right font-medium text-copy">
                  {healthQuery.data ? (healthQuery.data.llm_connected ? "LLM ready" : healthQuery.data.error ?? "Unavailable") : "Loading…"}
                </dd>
              </div>
              <div className="flex items-start justify-between gap-4">
                <dt>Model</dt>
                <dd className="max-w-[14rem] text-right font-medium text-copy">{healthQuery.data?.model ?? "—"}</dd>
              </div>
              <div className="flex items-start justify-between gap-4">
                <dt>Host</dt>
                <dd className="max-w-[14rem] text-right font-medium text-copy">
                  {hostInfoQuery.data
                    ? hostInfoQuery.data.expose
                      ? `${hostInfoQuery.data.lan_ip ?? "LAN"}:${hostInfoQuery.data.port}`
                      : `127.0.0.1:${hostInfoQuery.data.port}`
                    : "Loading…"}
                </dd>
              </div>
              <div className="flex items-start justify-between gap-4">
                <dt>Update status</dt>
                <dd className="font-medium text-copy">
                  {versionQuery.data?.update_available ? `New ${versionQuery.data.latest}` : "Current"}
                </dd>
              </div>
            </dl>
          </SurfaceCard>
        </section>
      </div>
    </PageFrame>
  );
}
