import { ActionType } from "@ui/ActionsModal/actionModalTypes";
import { create } from "zustand";

type ActionModalStore = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  text: string;
  setText: (text: string) => void;
  actions: ActionType[];
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
  setActions: (actions) => set(() => ({ actions })),
  onCloseDialog: () => {},
  setOnCloseDialog: (action) => set(() => ({ onCloseDialog: action })),
}));
