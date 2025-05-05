import React, { useEffect } from "react";
import { useColorScheme } from "react-native";
import { useThemeStore } from "@/stores/themeStore";
import { ThemedView } from "../common/ThemedView";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useColorScheme();
  const { toggleTheme, isDark } = useThemeStore();

  useEffect(() => {
    if (systemColorScheme === "dark" && !isDark) toggleTheme();
  }, [systemColorScheme, toggleTheme]);

  return <ThemedView className="flex-1">{children}</ThemedView>;
}
