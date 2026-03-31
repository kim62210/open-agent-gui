import { Outlet } from "@tanstack/react-router";
import { AppShell } from "../components/layout/app-shell";

export function RootRouteComponent() {
  return <Outlet />;
}

export function ShellRouteComponent() {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}
