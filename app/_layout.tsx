import "react-native-reanimated";

import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { ThemeProvider } from "@shared/providers/ThemeProvider";
import { useThemeStore } from "../src/shared/stores/themeStore";
import { Colors } from "../src/constants/Colors";
import { useColorScheme } from "nativewind";

import "../global.css";
import ConfirmDialog from "@shared/ui/ConfirmDialog/ConfirmDialog";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// TODO make shadow of header bar smaller
const RootLayout = () => {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const { colorScheme, isDark } = useThemeStore();
  const { setColorScheme } = useColorScheme();

  const backgroundColor = isDark
    ? Colors.dark.backgroundSurface
    : Colors.light.backgroundSurface;

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    setColorScheme(colorScheme);
  }, [colorScheme]);

  if (!loaded) {
    return null;
  }

  // TODO stack vs slot
  // TODO do i really need @types/react?
  // react-test-renderer: deprecated?
  // recheck whole package json and npm package versions
  // when and how use: --legacy-peer-deps
  return (
    <ThemeProvider>
      <Stack
        screenOptions={{
          navigationBarColor: backgroundColor,
          statusBarBackgroundColor: backgroundColor,
          statusBarStyle: colorScheme === "dark" ? "light" : "dark",
          headerShown: false,
        }}
      >
        <Stack.Screen name="(tabs)" />
      </Stack>
      <ConfirmDialog />
    </ThemeProvider>
  );
};

export default RootLayout;
