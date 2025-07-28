import { Stack } from "expo-router";

import { useThemeColors } from "@shared/hooks/useThemeColors";
import { i18n } from "@shared/lib/utils/i18n/i18n-js";

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
        options={{ title: i18n.t("createFolder") }}
      />
    </Stack>
  );
};

export default FolderLayout;
