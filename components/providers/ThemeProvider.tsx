import React, { useEffect } from "react";
import { useColorScheme } from "react-native";
import { useThemeStore } from "@/stores/themeStore";
import { ThemedView } from "../ui/ThemedView";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useColorScheme();
  const { setTheme } = useThemeStore();

  useEffect(() => {
    setTheme(systemColorScheme === "dark");
  }, [systemColorScheme, setTheme]);

  return <ThemedView className="flex-1">{children}</ThemedView>;
}
