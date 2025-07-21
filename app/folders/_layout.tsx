import { Stack } from "expo-router";

import { useThemeColors } from "@shared/hooks/useThemeColors";

const FolderLayout = () => {
  const theme = useThemeColors();

  const screenOptions = {
    headerStyle: {
      backgroundColor: theme.backgroundSurface,
    },
    headerTitleStyle: {
      color: theme.textPrimary,
    },
    headerTintColor: theme.textPrimary,
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
