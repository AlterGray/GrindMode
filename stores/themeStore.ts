import { storage } from "@/lib/storage";
import { create } from "zustand";

type ThemeState = {
  isDark: boolean;
  colorScheme: "light" | "dark";
  toggleTheme: () => void;
  setTheme: (isDark: boolean) => void;
};

// TODO make it better?
const getStoredTheme = () => {
  const storedTheme = storage.getString("theme");
  return storedTheme === "dark";
};

export const useThemeStore = create<ThemeState>((set) => ({
  isDark: getStoredTheme(),
  colorScheme: getStoredTheme() ? "dark" : "light",
  toggleTheme: () =>
    set((state) => {
      const nextColorScheme = state.isDark ? "light" : "dark";
      storage.set("theme", nextColorScheme);
      return {
        isDark: !state.isDark,
        colorScheme: nextColorScheme,
      };
    }),
  setTheme: (isDark) =>
    set(() => {
      const nextColorScheme = isDark ? "dark" : "light";
      storage.set("theme", nextColorScheme);

      return {
        isDark,
        colorScheme: nextColorScheme,
      };
    }),
}));
