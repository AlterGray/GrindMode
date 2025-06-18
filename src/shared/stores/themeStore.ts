import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { useSubscribeStoreWithSelector } from "@shared/hooks/useSubscribeStoreWithSelector";
import { storage } from "@shared/lib/storage";

type ThemeMode = "light" | "dark" | "system";

type ThemeStore = {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
};

const getThemeFromStorage = () => {
  const themeString = storage.getString("theme");
  if (themeString) {
    return JSON.parse(themeString);
  }
  return "light";
};

export const useThemeStore = create<ThemeStore>()(
  subscribeWithSelector(
    immer((set) => ({
      theme: getThemeFromStorage(),
      setTheme: (theme: ThemeMode) => {
        set((state) => {
          state.theme = theme;
        });
      },
      toggleTheme: () => {
        set((state) => {
          if (state.theme === "light") {
            state.theme = "dark";
          } else {
            state.theme = "light";
          }
        });
      },
    })),
  ),
);

export const useThemeStoreWithSubscribe = () =>
  useSubscribeStoreWithSelector(useThemeStore, (state) => state.theme, "theme");
