import { Stack } from "expo-router";

import { useThemeColors } from "@shared/hooks/useThemeColors";

const FolderLayout = () => {
  const theme = useThemeColors();
  const backgroundColor = theme.backgroundSurface;
  const textColor = theme.textPrimary;

  const screenOptions = {
    headerStyle: {
      backgroundColor,
    },
    headerTitleStyle: {
      color: textColor,
    },
    headerTintColor: textColor,
  };

  return (
    <Stack screenOptions={screenOptions}>
      <Stack.Screen
        key={"create"}
        name="create"
        options={{ title: "Create folder" }}
      />
    </Stack>
  );
};

export default FolderLayout;
