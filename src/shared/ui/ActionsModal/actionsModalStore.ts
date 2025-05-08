import { ActionType } from "@ui/ActionsModal/actionModalTypes";
import { create } from "zustand";
import { PopoverMenuItem } from "./PopoverMenu";

type ActionModalStore = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  text: string;
  setText: (text: string) => void;
  actions: ActionType[];
  isMenuAction: boolean;
  setIsMenuAction: (isMenuAction: boolean) => void;
  menuActions: PopoverMenuItem[];
  setMenuActions: (menuActions: PopoverMenuItem[]) => void;
  setActions: (actions: ActionType[]) => void;
  onCloseDialog: () => void;
  setOnCloseDialog: (action: () => void) => void;
};

export const useActionModalStore = create<ActionModalStore>()((set) => ({
  isOpen: false,
  setIsOpen: (isModalOpen) => set(() => ({ isOpen: isModalOpen })),
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
}));
