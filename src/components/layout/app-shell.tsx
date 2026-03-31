import type { PropsWithChildren } from "react";
import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import { resolveNavigationItem } from "../../lib/navigation";
import { useWorkbenchStore } from "../../state/workbench-store";
import { CommandPalette } from "../command-palette/command-palette";
import { InspectorPanel } from "./inspector-panel";
import { Sidebar } from "./sidebar";
import { TopBar } from "./top-bar";

export function AppShell({ children }: PropsWithChildren) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const currentPage = resolveNavigationItem(pathname);
  const inspectorOpen = useWorkbenchStore((state) => state.inspectorOpen);
  const commandPaletteOpen = useWorkbenchStore((state) => state.commandPaletteOpen);
  const openCommandPalette = useWorkbenchStore((state) => state.openCommandPalette);
  const closeCommandPalette = useWorkbenchStore((state) => state.closeCommandPalette);
  const toggleInspector = useWorkbenchStore((state) => state.toggleInspector);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const target = event.target;
      const isEditable =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLElement
          ? target.isContentEditable
          : false;

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        openCommandPalette();
      }

      if (event.key === "Escape" && !isEditable) {
        closeCommandPalette();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeCommandPalette, openCommandPalette]);

  return (
    <div className="min-h-screen bg-canvas text-copy">
      <div className="mx-auto flex min-h-screen max-w-[1900px] flex-col md:flex-row">
        <Sidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          <TopBar
            currentPage={currentPage}
            onOpenPalette={openCommandPalette}
            onToggleInspector={toggleInspector}
          />

          <main className="flex-1 px-4 py-4 sm:px-6 lg:px-8">
            <div className="mx-auto flex w-full max-w-7xl items-start gap-6">
              <div className="min-w-0 flex-1">{children}</div>
              {inspectorOpen ? <InspectorPanel currentPage={currentPage} /> : null}
            </div>
          </main>
        </div>
      </div>

      <CommandPalette open={commandPaletteOpen} onClose={closeCommandPalette} />
    </div>
  );
}
