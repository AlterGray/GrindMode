import { ActionType } from "@ui/ActionsModal/actionModalTypes";
import { create } from "zustand";
import { PopoverMenuItem } from "../PopoverMenu/types";

type ActionModalOptions = Partial<
  Omit<ActionModalStore, "closeModal" | "setActionModal">
>;

type ActionModalStore = {
  isOpen: boolean;
  text: string;
  actions: ActionType[];
  isMenuAction: boolean;
  menuActions: PopoverMenuItem[];
  closeModal: () => void;
  onCloseDialog: () => void;
  setActionModal: (options: ActionModalOptions) => void;
};

// TODO keep only open/update/close?
export const useActionModalStore = create<ActionModalStore>()((set, get) => ({
  isOpen: false,
  text: "",
  actions: [],
  isMenuAction: false,
  menuActions: [],
  onCloseDialog: () => {},
  closeModal: () => {
    // TODO check if all respective stores has this method
    // TODO better set just default state?
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
  // TODO use partial update
  setActionModal: (options) =>
    set((state) => ({
      ...state,
      ...options,
    })),
}));
