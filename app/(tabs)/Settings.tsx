import React from "react";
import ThemedView from "@ui/ThemedView";
import { useThemeStore } from "@shared/stores/themeStore";
import StyledButton from "@ui/StyledButton";

const settings = () => {
  const { toggleTheme } = useThemeStore();

  return (
    <ThemedView className="flex-1 items-center justify-center">
      <StyledButton title="Switch theme" onPress={toggleTheme} />
    </ThemedView>
  );
};

export default settings;
