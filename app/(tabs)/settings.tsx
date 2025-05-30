import React from "react";
import ThemedView from "@shared/ui/ThemedView";
import StyledButton from "@shared/ui/StyledButton";
import { useTheme } from "@shared/hooks/useTheme";

const settings = () => {
  const { toggleTheme } = useTheme();

  return (
    <ThemedView className="flex-1 items-center justify-center">
      <StyledButton title="Switch theme" onPress={toggleTheme} />
    </ThemedView>
  );
};

export default settings;
