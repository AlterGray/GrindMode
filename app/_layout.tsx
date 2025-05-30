import "react-native-reanimated";

import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { ThemeProvider } from "@shared/providers/ThemeProvider";
import { useThemeStore } from "@shared/stores/themeStore";
import { useColorScheme } from "nativewind";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import PopoverMenu from "@shared/ui/PopoverMenu/PopoverMenu";
import ActionModal from "@shared/ui/ActionsModal/ActionModal";
import { useThemeColors } from "@shared/hooks/useThemeColors";
import GlobalFloatingModal from "@shared/ui/GlobalFloatingModal/GlobalFloatingModal";

import "../global.css";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// TODO make shadow of header bar smaller
const RootLayout = () => {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const colorScheme = useThemeStore((state) => state.colorScheme);
  // TODO
  const { setColorScheme } = useColorScheme();
  const backgroundColor = useThemeColors("backgroundSurface");

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // TODO fix theme changing
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
    <GestureHandlerRootView>
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
        {/* // TODO extract to modals */}
        <GlobalFloatingModal />
        <PopoverMenu />
        <ActionModal />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
};

export default RootLayout;
