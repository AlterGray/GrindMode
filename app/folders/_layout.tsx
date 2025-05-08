import { Colors } from "@/constants/Colors";
import { useThemeStore } from "@shared/stores/themeStore";
import { Stack } from "expo-router";

const FolderLayout = () => {
  const isDark = useThemeStore((state) => state.isDark);
  const theme = isDark ? Colors.dark : Colors.light;
  const backgroundColor = theme.backgroundSecondary;
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
