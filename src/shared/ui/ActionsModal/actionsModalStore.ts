import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { ActionType } from "@shared/ui/ActionsModal/actionModalTypes";
import { PopoverMenuItem } from "@shared/ui/PopoverMenu/types";

type ActionModalOptions = Partial<
  Omit<ActionModalStore, "closeActionModal" | "openActionModal" | "isOpen">
>;

type ActionModalStore = {
  isOpen: boolean;
  text: string;
  actions: ActionType[];
  isMenuAction: boolean;
  menuActions: PopoverMenuItem[];
  closeActionModal: () => void;
  onCloseDialog: () => void;
  openActionModal: (options: ActionModalOptions) => void;
};

export const useActionModalStore = create<ActionModalStore>()(
  immer((set, get) => ({
    isOpen: false,
    text: "",
    actions: [],
    isMenuAction: false,
    menuActions: [],
    onCloseDialog: () => {},
    closeActionModal: () => {
      const { onCloseDialog } = get();
      onCloseDialog?.(); // Call the callback before closing

      set((state) => {
        state.isOpen = false;
        state.text = "";
        state.actions = [];
        state.isMenuAction = false;
        state.menuActions = [];
        state.onCloseDialog = () => {};
      });
    },
    openActionModal: (options) => {
      set((state) => {
        Object.assign(state, options);
        state.isOpen = true;
      });
    },
  })),
);
