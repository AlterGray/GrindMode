import { storage } from "@lib/storage";
import { create } from "zustand";

type ThemeState = {
  isDark: boolean;
  colorScheme: "light" | "dark";
  toggleTheme: () => void;
};

// TODO make it better?
const getStoredTheme = () => {
  const storedTheme = storage.getString("theme");
  return storedTheme === "dark";
};

// TODO how create Works?
export const useThemeStore = create<ThemeState>()((set) => ({
  isDark: getStoredTheme(),
  colorScheme: getStoredTheme() ? "dark" : "light",
  toggleTheme: () =>
    set((state) => {
      const newIsDark = !state.isDark;
      storage.set("theme", newIsDark ? "dark" : "light");
      return {
        isDark: newIsDark,
        colorScheme: newIsDark ? "dark" : "light",
      };
    }),
}));
