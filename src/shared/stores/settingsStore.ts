import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { makeMutable } from "react-native-reanimated";

import { TABS } from "@shared/constants/common";
import { useSubscribeStoreWithSelector } from "@shared/hooks/useSubscribeStoreWithSelector";
import { storage } from "@shared/lib/storage";
import { TabType } from "@shared/types/commonTypes";

type SettingsStore = {
  hiddenTabs: Record<string, TabType>;
  addHiddenTab: (tab: TabType) => void;
  removeHiddenTab: (tab: TabType) => void;
};

export const themeTransitionProgress = makeMutable(0);

const getSettingsFromStorage = (): { hiddenTabs: Record<string, TabType> } => {
  const settingsString = storage.getString("settings");
  if (settingsString) {
    let settings = JSON.parse(settingsString);
    return { hiddenTabs: settings.hiddenTabs };
  }

  return { hiddenTabs: TABS };
};

export const useSettingsStore = create<SettingsStore>()(
  subscribeWithSelector(
    immer((set) => ({
      hiddenTabs: getSettingsFromStorage().hiddenTabs,
      addHiddenTab: (tab: TabType) =>
        set((state) => {
          if (!state.hiddenTabs[tab.name].hidden) {
            state.hiddenTabs[tab.name].hidden = true;
          }
        }),
      removeHiddenTab: (tab: TabType) =>
        set((state) => {
          if (state.hiddenTabs[tab.name].hidden) {
            state.hiddenTabs[tab.name].hidden = false;
          }
        }),
    })),
  ),
);

export const useSettingsStoreWithSubscribe = () =>
  useSubscribeStoreWithSelector(useSettingsStore, (state) => state, "settings");
