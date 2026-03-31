import { describe, expect, it } from "vitest";
import { parseChatStream } from "./chat-stream";

async function* createChunks(chunks: Array<string | Uint8Array>) {
  for (const chunk of chunks) {
    yield chunk;
  }
}

describe("parseChatStream", () => {
  it("parses chunked SSE data frames into chat events", async () => {
    const events = [];

    for await (const event of parseChatStream(
      createChunks([
        'data: {"type":"token","content":"Hel',
        'lo"}\n\n',
        'data: {"type":"content_delta","delta":" world"}\n\n',
        'data: {"type":"done","full_response":{"choices":[{"message":{"content":"Hello world"}}]}}\n\n',
      ]),
    )) {
      events.push(event);
    }

    expect(events).toEqual([
      { type: "token", content: "Hello" },
      { type: "content_delta", delta: " world" },
      {
        type: "done",
        full_response: {
          choices: [{ message: { content: "Hello world" } }],
        },
      },
    ]);
  });

  it("ignores non-data lines and empty event blocks", async () => {
    const events = [];

    for await (const event of parseChatStream(
      createChunks([
        ": keep-alive\n\n",
        "event: token\n",
        'data: {"type":"token","content":"hi"}\n\n',
      ]),
    )) {
      events.push(event);
    }

    expect(events).toEqual([{ type: "token", content: "hi" }]);
  });
});
