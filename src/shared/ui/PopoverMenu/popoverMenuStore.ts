import { create } from "zustand";
import { PopoverMenuItem } from "./types";
import { LayoutChangeEvent } from "react-native";

type PopoverMenuStore = {
  items: PopoverMenuItem[];
  visible: boolean;
  position: { x: number; y: number };
  handleLayoutChange?: (e: LayoutChangeEvent) => void;
  hideMenu: () => void;
  setPopoverMenu: (
    state: Partial<Omit<PopoverMenuStore, "setPopoverMenu" | "hideMenu">>,
  ) => void;
};

const usePopoverMenuStore = create<PopoverMenuStore>()((set) => ({
  visible: false,
  items: [],
  position: { x: 0, y: 0 },
  hideMenu: () =>
    set(() => ({
      visible: false,
      position: { x: 0, y: 0 },
    })),
  // TODO can we refactor it?
  setPopoverMenu: ({ visible, items, position, handleLayoutChange }) =>
    set((state) => ({
      visible: visible ?? state.visible,
      items: items ?? state.items,
      position: position ?? state.position,
      handleLayoutChange: handleLayoutChange ?? state.handleLayoutChange,
    })),
}));

export { usePopoverMenuStore };
