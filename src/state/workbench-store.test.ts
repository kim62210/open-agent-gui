import { describe, expect, it } from "vitest";

describe("useChatStore", () => {
  it("tracks draft and a streaming assistant reply", async () => {
    const module = (await import("./workbench-store")) as Record<string, unknown>;

    expect(module.useChatStore).toEqual(expect.any(Function));

    const useChatStore = module.useChatStore as {
      getState: () => {
        draft: string;
        messages: Array<{ role: string; content: string; status?: string }>;
        stream: { status: string; error: string | null };
        resetConversation: () => void;
        setDraft: (value: string) => void;
        startAssistantTurn: (userContent: string) => void;
        appendAssistantDelta: (delta: string) => void;
        completeAssistantTurn: (content?: string) => void;
      };
    };

    useChatStore.getState().resetConversation();
    useChatStore.getState().setDraft("Draft prompt");

    expect(useChatStore.getState().draft).toBe("Draft prompt");

    useChatStore.getState().startAssistantTurn("Hello operator");
    useChatStore.getState().appendAssistantDelta("Hello");
    useChatStore.getState().appendAssistantDelta(" world");
    useChatStore.getState().completeAssistantTurn();

    expect(useChatStore.getState().messages).toEqual([
      { role: "user", content: "Hello operator" },
      { role: "assistant", content: "Hello world", status: "complete" },
    ]);
    expect(useChatStore.getState().stream).toEqual({ status: "idle", error: null });
  });

  it("stores request errors on the stream state", async () => {
    const module = (await import("./workbench-store")) as Record<string, unknown>;

    expect(module.useChatStore).toEqual(expect.any(Function));

    const useChatStore = module.useChatStore as {
      getState: () => {
        messages: Array<{ role: string; content: string; status?: string }>;
        stream: { status: string; error: string | null };
        resetConversation: () => void;
        startAssistantTurn: (userContent: string) => void;
        failAssistantTurn: (message: string) => void;
      };
    };

    useChatStore.getState().resetConversation();
    useChatStore.getState().startAssistantTurn("Need a summary");
    useChatStore.getState().failAssistantTurn("Backend unavailable");

    expect(useChatStore.getState().messages).toEqual([
      { role: "user", content: "Need a summary" },
      { role: "assistant", content: "", status: "error" },
    ]);
    expect(useChatStore.getState().stream).toEqual({ status: "error", error: "Backend unavailable" });
  });
});
