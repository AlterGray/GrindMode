import { Stack } from "expo-router";

import { useThemeColors } from "@shared/hooks/useThemeColors";
import { i18n } from "@shared/lib/utils/i18n/i18n-js";

const TimeLayout = () => {
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
        name="create-timer"
        options={{ title: i18n.t("createTimer") }}
      />
      <Stack.Screen
        name="create-tracker"
        options={{ title: i18n.t("createTracker") }}
      />
    </Stack>
  );
};

export default TimeLayout;
