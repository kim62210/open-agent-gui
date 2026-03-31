import { appConfig } from "../config/env";
import { getStoredApiKey, getStoredBearerToken } from "./credentials";
export type { ChatRequestMessage, ChatStreamEvent } from "./chat-stream";
export { parseChatStream, streamChat } from "./chat-stream";

type ApiRequestOptions = RequestInit & {
  path: string;
};

function createUrl(path: string): string {
  return `${appConfig.apiBaseUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export async function apiRequest<TResponse>({ path, headers, ...init }: ApiRequestOptions): Promise<TResponse> {
  const bearerToken = getStoredBearerToken();
  const apiKey = getStoredApiKey();

  const response = await fetch(createUrl(path), {
    ...init,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(bearerToken ? { Authorization: `Bearer ${bearerToken}` } : {}),
      ...(apiKey ? { "X-API-Key": apiKey } : {}),
      ...headers,
    },
  });

  if (!response.ok) {
    throw new Error(`Open Agent request failed: ${response.status} ${response.statusText}`);
  }

  if (response.status === 204) {
    return undefined as TResponse;
  }

  return (await response.json()) as TResponse;
}

export type HealthResponse = {
  server: string;
  llm_connected: boolean;
  model: string;
  error: string | null;
};

export type VersionResponse = {
  current: string;
  latest: string | null;
  update_available: boolean;
};

export type HostInfoResponse = {
  expose: boolean;
  port: number;
  lan_ip?: string;
};

export type RunEvent = {
  type: string;
  timestamp?: string;
  [key: string]: unknown;
};

export type RunDetail = {
  id: string;
  status: string;
  created_at?: string;
  updated_at?: string;
  request_messages?: unknown[];
  response_payload?: Record<string, unknown> | null;
  error_message?: string | null;
  events?: RunEvent[];
};

export function getHealth() {
  return apiRequest<HealthResponse>({ path: "/api/settings/health" });
}

export function getVersion() {
  return apiRequest<VersionResponse>({ path: "/api/settings/version" });
}

export function getHostInfo() {
  return apiRequest<HostInfoResponse>({ path: "/api/host-info" });
}

export function getRuns() {
  return apiRequest<RunDetail[]>({ path: "/api/runs/" });
}
