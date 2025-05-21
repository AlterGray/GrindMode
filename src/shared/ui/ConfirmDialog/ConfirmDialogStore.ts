import { create } from "zustand";
import { ConfirmDialogStore } from "./types";
import { getDefaultState } from "./getDefaultState";

const useConfirmDialogStore = create<ConfirmDialogStore>((set) => ({
  ...getDefaultState(),
  setConfirmDialog: (options) => {
    set((state) => ({
      ...state,
      ...options,
      isOpen: options.isOpen !== undefined ? options.isOpen : state.isOpen,
    }));
  },
  closeConfirmModal: () => {
    set(() => ({
      ...getDefaultState(),
    }));
  },
}));

export default useConfirmDialogStore;
