import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { makeMutable } from "react-native-reanimated";

import { useSubscribeStoreWithSelector } from "@shared/hooks/useSubscribeStoreWithSelector";
import { storage } from "@shared/lib/storage";

type hiddenTab = "index" | "proofs";

type SettingsStore = {
  hiddenTabs: hiddenTab[];
  addHiddenTab: (tab: hiddenTab) => void;
  removeHiddenTab: (tab: hiddenTab) => void;
};

export const themeTransitionProgress = makeMutable(0);

const getSettingsFromStorage = () => {
  const themeString = storage.getString("settings");
  if (themeString) {
    return JSON.parse(themeString);
  }
  return { hiddenTabs: [] };
};

export const useSettingsStore = create<SettingsStore>()(
  subscribeWithSelector(
    immer((set) => ({
      hiddenTabs: getSettingsFromStorage().hiddenTabs,
      addHiddenTab: (tab: hiddenTab) => {
        set((state) => {
          state.hiddenTabs.push(tab);
        });
      },
      removeHiddenTab: (tab: hiddenTab) => {
        set((state) => {
          state.hiddenTabs = state.hiddenTabs.filter((t) => t !== tab);
        });
      },
    })),
  ),
);

export const useSettingsStoreWithSubscribe = () =>
  useSubscribeStoreWithSelector(useSettingsStore, (state) => state, "settings");
