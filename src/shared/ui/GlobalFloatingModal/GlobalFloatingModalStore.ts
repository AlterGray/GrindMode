import { create } from "zustand";
import { GlobalFloatingModalState } from "./types";
import { getDefaultModalState } from "./getDefaultState";

export const useGlobalFloatingModalStore = create<GlobalFloatingModalState>(
  (set) => ({
    ...getDefaultModalState(),
    openModal: (options) => {
      set((state) => ({
        ...state,
        ...options,
        isOpen: true,
      }));
    },
    closeModal: () =>
      set((state) => ({
        ...state,
        ...getDefaultModalState(),
        isOpen: false,
      })),
  }),
);
