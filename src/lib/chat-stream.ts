import { appConfig } from "../config/env";
import { getStoredApiKey, getStoredBearerToken } from "./credentials";

export interface ChatRequestMessage {
  role: "user" | "assistant" | "tool";
  content: string;
}

export interface ChatStreamEvent {
  type: string;
  content?: string;
  delta?: string;
  full_response?: {
    choices?: Array<{
      message?: {
        content?: string | null;
      };
    }>;
  };
  [key: string]: unknown;
}

interface StreamChatOptions {
  messages: ChatRequestMessage[];
  signal?: AbortSignal;
  forcedWorkflow?: string;
  skipRouting?: boolean;
  onEvent: (event: ChatStreamEvent) => void | Promise<void>;
}

function createChatStreamUrl() {
  return `${appConfig.apiBaseUrl}/api/chat/stream`;
}

function createChatHeaders() {
  const bearerToken = getStoredBearerToken();
  const apiKey = getStoredApiKey();

  return {
    Accept: "text/event-stream",
    "Content-Type": "application/json",
    ...(bearerToken ? { Authorization: `Bearer ${bearerToken}` } : {}),
    ...(apiKey ? { "X-API-Key": apiKey } : {}),
  };
}

function parseEventBlock(block: string): ChatStreamEvent | null {
  const dataLines = block
    .split("\n")
    .filter((line) => line.startsWith("data:"))
    .map((line) => line.slice(5).trimStart());

  if (dataLines.length === 0) {
    return null;
  }

  return JSON.parse(dataLines.join("\n")) as ChatStreamEvent;
}

async function* readStreamChunks(stream: ReadableStream<Uint8Array>) {
  const reader = stream.getReader();

  try {
    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        break;
      }

      if (value) {
        yield value;
      }
    }
  } finally {
    reader.releaseLock();
  }
}

export async function* parseChatStream(source: AsyncIterable<string | Uint8Array>) {
  const decoder = new TextDecoder();
  let buffer = "";

  for await (const chunk of source) {
    buffer += typeof chunk === "string" ? chunk : decoder.decode(chunk, { stream: true });
    buffer = buffer.replace(/\r\n/g, "\n");

    let boundaryIndex = buffer.indexOf("\n\n");

    while (boundaryIndex >= 0) {
      const block = buffer.slice(0, boundaryIndex).trim();
      buffer = buffer.slice(boundaryIndex + 2);

      if (block) {
        const event = parseEventBlock(block);

        if (event) {
          yield event;
        }
      }

      boundaryIndex = buffer.indexOf("\n\n");
    }
  }

  buffer += decoder.decode();
  buffer = buffer.replace(/\r\n/g, "\n").trim();

  if (buffer) {
    const event = parseEventBlock(buffer);

    if (event) {
      yield event;
    }
  }
}

export async function streamChat({ messages, signal, forcedWorkflow, skipRouting, onEvent }: StreamChatOptions) {
  const body: Record<string, unknown> = { messages };

  if (forcedWorkflow) {
    body.forced_workflow = forcedWorkflow;
  }

  if (skipRouting) {
    body.skip_routing = true;
  }

  const response = await fetch(createChatStreamUrl(), {
    method: "POST",
    headers: createChatHeaders(),
    body: JSON.stringify(body),
    signal,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Open Agent request failed: ${response.status} ${response.statusText}`);
  }

  if (!response.body) {
    throw new Error("Open Agent did not return a readable stream.");
  }

  for await (const event of parseChatStream(readStreamChunks(response.body))) {
    await onEvent(event);
  }
}
