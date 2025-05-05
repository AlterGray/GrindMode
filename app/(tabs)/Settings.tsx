import React from "react";
import { ThemedView } from "@/components/common/ThemedView";
import { useThemeStore } from "@/stores/themeStore";
import StyledButton from "@/components/common/StyledButton";

const settings = () => {
  const { toggleTheme } = useThemeStore();

  return (
    <ThemedView className="flex-1 items-center justify-center">
      <StyledButton text="Switch theme" onPress={toggleTheme} />
    </ThemedView>
  );
};

export default settings;
