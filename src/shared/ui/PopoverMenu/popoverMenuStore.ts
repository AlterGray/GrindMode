import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { LayoutChangeEvent } from "react-native";

import { PopoverMenuItem } from "./types";

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

export const usePopoverMenuStore = create<PopoverMenuStore>()(
  immer((set) => ({
    visible: false,
    items: [],
    position: { x: 0, y: 0 },
    hideMenu: () => {
      set((state) => {
        state.visible = false;
        state.position = { x: 0, y: 0 };
      });
    },
    setPopoverMenu: ({ visible, items, position, handleLayoutChange }) => {
      set((state) => {
        if (visible !== undefined) state.visible = visible;
        if (items !== undefined) state.items = items;
        if (position !== undefined) state.position = position;
        if (handleLayoutChange !== undefined)
          state.handleLayoutChange = handleLayoutChange;
      });
    },
  })),
);
