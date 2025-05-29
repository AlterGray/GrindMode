import React from "react";
import ThemedView from "@shared/ui/ThemedView";
import { useThemeStore } from "@shared/stores/themeStore";
import StyledButton from "@shared/ui/StyledButton";

const settings = () => {
  const { toggleTheme } = useThemeStore();

  return (
    <ThemedView className="flex-1 items-center justify-center">
      <StyledButton title="Switch theme" onPress={toggleTheme} />
    </ThemedView>
  );
};

export default settings;
