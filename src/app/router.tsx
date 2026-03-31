import { createRootRouteWithContext, createRoute, createRouter, redirect } from "@tanstack/react-router";
import type { QueryClient } from "@tanstack/react-query";
import { AdminPage } from "../pages/admin-page";
import { ChatPage } from "../pages/chat-page";
import { JobsPage } from "../pages/jobs-page";
import { McpPage } from "../pages/mcp-page";
import { NotFoundPage } from "../pages/not-found-page";
import { PagesPage } from "../pages/pages-page";
import { RunsPage } from "../pages/runs-page";
import { SettingsPage } from "../pages/settings-page";
import { WorkspacesPage } from "../pages/workspaces-page";
import { queryClient } from "./query-client";
import { RootRouteComponent, ShellRouteComponent } from "./router-layouts";

type RouterContext = {
  queryClient: QueryClient;
};

const rootRoute = createRootRouteWithContext<RouterContext>()({
  component: RootRouteComponent,
  notFoundComponent: NotFoundPage,
});

const shellRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "shell",
  component: ShellRouteComponent,
});

const indexRoute = createRoute({
  getParentRoute: () => shellRoute,
  path: "/",
  beforeLoad: () => {
    throw redirect({ to: "/chat" });
  },
});

const chatRoute = createRoute({
  getParentRoute: () => shellRoute,
  path: "chat",
  component: ChatPage,
});

const runsRoute = createRoute({
  getParentRoute: () => shellRoute,
  path: "runs",
  component: RunsPage,
});

const workspacesRoute = createRoute({
  getParentRoute: () => shellRoute,
  path: "workspaces",
  component: WorkspacesPage,
});

const pagesRoute = createRoute({
  getParentRoute: () => shellRoute,
  path: "pages",
  component: PagesPage,
});

const mcpRoute = createRoute({
  getParentRoute: () => shellRoute,
  path: "mcp",
  component: McpPage,
});

const jobsRoute = createRoute({
  getParentRoute: () => shellRoute,
  path: "jobs",
  component: JobsPage,
});

const settingsRoute = createRoute({
  getParentRoute: () => shellRoute,
  path: "settings",
  component: SettingsPage,
});

const adminRoute = createRoute({
  getParentRoute: () => shellRoute,
  path: "admin",
  component: AdminPage,
});

const routeTree = rootRoute.addChildren([
  shellRoute.addChildren([
    indexRoute,
    chatRoute,
    runsRoute,
    workspacesRoute,
    pagesRoute,
    mcpRoute,
    jobsRoute,
    settingsRoute,
    adminRoute,
  ]),
]);

export const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
  defaultPreload: "intent",
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
