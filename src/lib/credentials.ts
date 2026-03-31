const BEARER_TOKEN_KEY = "open-agent-gui/bearer-token";
const API_KEY_KEY = "open-agent-gui/api-key";

function isBrowser() {
  return typeof window !== "undefined";
}

export function getStoredBearerToken() {
  if (!isBrowser()) return "";
  return window.localStorage.getItem(BEARER_TOKEN_KEY) ?? "";
}

export function getStoredApiKey() {
  if (!isBrowser()) return "";
  return window.localStorage.getItem(API_KEY_KEY) ?? "";
}

export function setStoredBearerToken(value: string) {
  if (!isBrowser()) return;
  if (!value.trim()) {
    window.localStorage.removeItem(BEARER_TOKEN_KEY);
    return;
  }
  window.localStorage.setItem(BEARER_TOKEN_KEY, value.trim());
}

export function setStoredApiKey(value: string) {
  if (!isBrowser()) return;
  if (!value.trim()) {
    window.localStorage.removeItem(API_KEY_KEY);
    return;
  }
  window.localStorage.setItem(API_KEY_KEY, value.trim());
}

export function hasStoredCredentials() {
  return Boolean(getStoredBearerToken() || getStoredApiKey());
}
