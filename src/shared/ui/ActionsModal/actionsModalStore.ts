import { ActionType } from "@ui/ActionsModal/actionModalTypes";
import { create } from "zustand";
import { PopoverMenuItem } from "./PopoverMenu";

type ActionModalStore = {
  isOpen: boolean;
  text: string;
  setText: (text: string) => void;
  actions: ActionType[];
  isMenuAction: boolean;
  setIsMenuAction: (isMenuAction: boolean) => void;
  menuActions: PopoverMenuItem[];
  setMenuActions: (menuActions: PopoverMenuItem[]) => void;
  setActions: (actions: ActionType[]) => void;
  closeModal: () => void;
  onCloseDialog: () => void;
  setOnCloseDialog: (action: () => void) => void;
  openModal: (
    text?: string,
    actions?: ActionType[],
    isMenuAction?: boolean,
    menuActions?: PopoverMenuItem[],
    onCloseDialog?: () => void,
  ) => void;
};

export const useActionModalStore = create<ActionModalStore>()((set, get) => ({
  isOpen: false,
  text: "",
  setText: (text) => set(() => ({ text })),
  actions: [],
  isMenuAction: false,
  setIsMenuAction: (isMenuAction) => set(() => ({ isMenuAction })),
  menuActions: [],
  setMenuActions: (menuActions) => set(() => ({ menuActions })),
  setActions: (actions) => set(() => ({ actions })),
  onCloseDialog: () => {},
  setOnCloseDialog: (action) => set(() => ({ onCloseDialog: action })),
  // TODO use partial update
  openModal: (text, actions, isMenuAction, menuActions, onCloseDialog) => {
    set((state) => ({
      isOpen: true,
      text: text ?? state.text,
      actions: actions ?? state.actions,
      isMenuAction: isMenuAction ?? state.isMenuAction,
      menuActions: menuActions ?? state.menuActions,
      onCloseDialog: onCloseDialog ?? state.onCloseDialog,
    }));
  },
  closeModal: () => {
    const { onCloseDialog } = get();
    onCloseDialog?.(); // Call the callback before closing
    set(() => ({
      isOpen: false,
      text: "",
      actions: [],
      isMenuAction: false,
      menuActions: [],
      onCloseDialog: () => {},
    }));
  },
}));
