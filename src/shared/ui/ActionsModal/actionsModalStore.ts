import { ActionType } from "@ui/ActionsModal/actionModalTypes";
import { create } from "zustand";
import { PopoverMenuItem } from "../PopoverMenu/types";

type ActionModalStore = {
  isOpen: boolean;
  text: string;
  actions: ActionType[];
  isMenuAction: boolean;
  menuActions: PopoverMenuItem[];
  closeModal: () => void;
  onCloseDialog: () => void;
  setActionModal: (
    isOpen?: boolean,
    text?: string,
    actions?: ActionType[],
    isMenuAction?: boolean,
    menuActions?: PopoverMenuItem[],
    onCloseDialog?: () => void,
  ) => void;
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
  setActionModal: (
    isOpen,
    text,
    actions,
    isMenuAction,
    menuActions,
    onCloseDialog,
  ) =>
    set((state) => ({
      isOpen: isOpen ?? state.isOpen,
      text: text ?? state.text,
      actions: actions ?? state.actions,
      isMenuAction: isMenuAction ?? state.isMenuAction,
      menuActions: menuActions ?? state.menuActions,
      onCloseDialog: onCloseDialog ?? state.onCloseDialog,
    })),
}));
