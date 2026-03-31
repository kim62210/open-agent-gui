import { create } from "zustand";

export { useChatStore } from "./chat-store";

type WorkbenchState = {
  inspectorOpen: boolean;
  commandPaletteOpen: boolean;
  toggleInspector: () => void;
  openCommandPalette: () => void;
  closeCommandPalette: () => void;
  toggleCommandPalette: () => void;
};

export const useWorkbenchStore = create<WorkbenchState>((set) => ({
  inspectorOpen: true,
  commandPaletteOpen: false,
  toggleInspector: () => set((state) => ({ inspectorOpen: !state.inspectorOpen })),
  openCommandPalette: () => set({ commandPaletteOpen: true }),
  closeCommandPalette: () => set({ commandPaletteOpen: false }),
  toggleCommandPalette: () => set((state) => ({ commandPaletteOpen: !state.commandPaletteOpen })),
}));
