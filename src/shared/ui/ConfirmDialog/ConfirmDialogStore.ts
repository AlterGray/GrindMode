import { create } from "zustand";
import { ConfirmDialogStore } from "./types";
import { getDefaultDialogState } from "./getDefaultState";

const useConfirmDialogStore = create<ConfirmDialogStore>((set) => ({
  ...getDefaultDialogState(),
  setConfirmDialog: (options) => {
    set((state) => ({
      ...state,
      ...options,
      isOpen: options.isOpen !== undefined ? options.isOpen : true,
    }));
  },
  closeConfirmDialog: () =>
    set((state) => ({
      ...state,
      ...getDefaultDialogState(),
      isOpen: false,
    })),
}));

export default useConfirmDialogStore;
