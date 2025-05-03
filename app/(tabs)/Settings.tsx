import React from "react";
import { ThemedView } from "@/components/ui/ThemedView";
import { useThemeStore } from "@/stores/themeStore";
import StyledButton from "@/components/ui/StyledButton";

const settings = () => {
  const { toggleTheme } = useThemeStore();

  return (
    <ThemedView className="flex-1 items-center justify-center">
      <StyledButton text="Switch theme" onPress={toggleTheme} />
    </ThemedView>
  );
};

export default settings;
