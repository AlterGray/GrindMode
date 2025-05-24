import { create } from "zustand";
import { ConfirmModalStore } from "./types";
import { getDefaultModalState } from "./getDefaultState";

const useConfirmModalStore = create<ConfirmModalStore>((set) => ({
  ...getDefaultModalState(),
  openConfirmModal: (options) => {
    set((state) => ({
      ...state,
      ...options,
      isOpen: true,
    }));
  },
  closeConfirmModal: () =>
    set((state) => ({
      ...state,
      ...getDefaultModalState(),
      isOpen: false,
    })),
}));

export default useConfirmModalStore;
