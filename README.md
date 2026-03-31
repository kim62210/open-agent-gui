# Open Agent GUI

Phase 0 frontend shell for Open Agent.

## Stack

- React + TypeScript + Vite
- TanStack Router
- TanStack Query
- Zustand
- Tailwind CSS

## Local development

```bash
pnpm install
pnpm dev
```

## Environment

Copy `.env.example` to `.env` if you want to override the backend base URL.

```bash
VITE_OPEN_AGENT_API_BASE_URL=http://127.0.0.1:4821
```

## Included in Phase 0

- Local workbench shell with grouped sidebar, top bar, page frame, and right inspector placeholder
- Command palette placeholder with keyboard shortcut
- Initial information architecture routes for Chat, Runs, Workspaces, Pages, MCP, Jobs, Settings, and Admin
- Query client and backend base URL configuration scaffold
