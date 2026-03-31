function normalizeBaseUrl(rawValue?: string): string {
  const fallback = "http://127.0.0.1:4821";
  const value = rawValue?.trim();

  if (!value) {
    return fallback;
  }

  return value.endsWith("/") ? value.slice(0, -1) : value;
}

export const appConfig = {
  apiBaseUrl: normalizeBaseUrl(import.meta.env.VITE_OPEN_AGENT_API_BASE_URL),
  appTitle: "Open Agent GUI",
  mode: import.meta.env.MODE,
} as const;
