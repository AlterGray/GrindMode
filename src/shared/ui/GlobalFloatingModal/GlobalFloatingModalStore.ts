import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { getDefaultModalState } from "./getDefaultState";
import { GlobalFloatingModalState } from "./types";

export const useGlobalFloatingModalStore = create<GlobalFloatingModalState>()(
  immer((set) => ({
    ...getDefaultModalState(),

    openModal: (options) =>
      set((state) => {
        Object.assign(state, options);
        state.isOpen = true;
      }),

    closeModal: () =>
      set((state) => {
        Object.assign(state, getDefaultModalState());
        state.isOpen = false;
      }),
  })),
);
