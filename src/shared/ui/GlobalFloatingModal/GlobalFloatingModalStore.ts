import { create } from "zustand";

import { getDefaultModalState } from "./getDefaultState";
import { GlobalFloatingModalState } from "./types";

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
