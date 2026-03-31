import { create } from "zustand";
import type { ChatRequestMessage, ChatStreamEvent } from "../lib/api-client";
import { streamChat } from "../lib/api-client";

type ChatRole = "user" | "assistant";
type ChatMessageStatus = "complete" | "streaming" | "error";
type StreamStatus = "idle" | "streaming" | "error";

export interface ChatMessage {
  role: ChatRole;
  content: string;
  status?: ChatMessageStatus;
}

interface ChatStreamState {
  status: StreamStatus;
  error: string | null;
}

interface ChatState {
  draft: string;
  messages: ChatMessage[];
  stream: ChatStreamState;
  dismissError: () => void;
  setDraft: (value: string) => void;
  resetConversation: () => void;
  startAssistantTurn: (userContent: string) => void;
  appendAssistantDelta: (delta: string) => void;
  completeAssistantTurn: (content?: string) => void;
  failAssistantTurn: (message: string) => void;
  sendMessage: (content: string) => Promise<void>;
}

function toRequestMessages(messages: ChatMessage[]): ChatRequestMessage[] {
  return messages
    .filter((message) => message.content.trim().length > 0)
    .map((message) => ({ role: message.role, content: message.content }));
}

function extractDelta(event: ChatStreamEvent) {
  if (event.type === "token" && typeof event.content === "string") {
    return event.content;
  }

  if (event.type === "content_delta") {
    if (typeof event.delta === "string") {
      return event.delta;
    }

    if (typeof event.content === "string") {
      return event.content;
    }
  }

  return "";
}

function extractFinalContent(event: ChatStreamEvent) {
  const message = event.full_response?.choices?.[0]?.message;

  return typeof message?.content === "string" ? message.content : "";
}

function updateLatestAssistantMessage(messages: ChatMessage[], updater: (message: ChatMessage) => ChatMessage) {
  const assistantIndex = [...messages].reverse().findIndex((message) => message.role === "assistant");

  if (assistantIndex < 0) {
    return messages;
  }

  const targetIndex = messages.length - 1 - assistantIndex;

  return messages.map((message, index) => (index === targetIndex ? updater(message) : message));
}

export const useChatStore = create<ChatState>((set, get) => ({
  draft: "",
  messages: [],
  stream: { status: "idle", error: null },
  dismissError: () => set((state) => ({ stream: { status: state.stream.status === "error" ? "idle" : state.stream.status, error: null } })),
  setDraft: (value) => set((state) => ({ draft: value, stream: { status: state.stream.status, error: null } })),
  resetConversation: () => set({ draft: "", messages: [], stream: { status: "idle", error: null } }),
  startAssistantTurn: (userContent) => {
    const trimmed = userContent.trim();

    if (!trimmed) {
      return;
    }

    set((state) => ({
      draft: "",
      messages: [...state.messages, { role: "user", content: trimmed }, { role: "assistant", content: "", status: "streaming" }],
      stream: { status: "streaming", error: null },
    }));
  },
  appendAssistantDelta: (delta) => {
    if (!delta) {
      return;
    }

    set((state) => ({
      messages: updateLatestAssistantMessage(state.messages, (message) => ({
        ...message,
        content: `${message.content}${delta}`,
        status: "streaming",
      })),
    }));
  },
  completeAssistantTurn: (content) =>
    set((state) => ({
      messages: updateLatestAssistantMessage(state.messages, (message) => ({
        ...message,
        content: message.content || content || "",
        status: "complete",
      })),
      stream: { status: "idle", error: null },
    })),
  failAssistantTurn: (message) =>
    set((state) => ({
      messages: updateLatestAssistantMessage(state.messages, (chatMessage) => ({
        ...chatMessage,
        status: "error",
      })),
      stream: { status: "error", error: message },
    })),
  sendMessage: async (content) => {
    const trimmed = content.trim();
    const state = get();

    if (!trimmed || state.stream.status === "streaming") {
      return;
    }

    const requestMessages = toRequestMessages(state.messages);
    let streamErrored = false;

    get().startAssistantTurn(trimmed);

    try {
      await streamChat({
        messages: [...requestMessages, { role: "user", content: trimmed }],
        onEvent: (event) => {
          const delta = extractDelta(event);

          if (delta) {
            get().appendAssistantDelta(delta);
            return;
          }

          if (event.type === "done") {
            get().completeAssistantTurn(extractFinalContent(event));
            return;
          }

          if (event.type === "error") {
            streamErrored = true;
            const errorMessage = typeof event.content === "string" ? event.content : "Streaming failed.";

            get().failAssistantTurn(errorMessage);
          }
        },
      });

      if (!streamErrored) {
        const currentState = get();

        if (currentState.stream.status === "streaming") {
          currentState.completeAssistantTurn();
        }
        return;
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Chat request failed.";

      get().failAssistantTurn(message);
      return;
    }
  },
}));
