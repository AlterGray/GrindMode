import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";

import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

import { useTheme } from "@shared/hooks/useTheme";
import { useThemeColors } from "@shared/hooks/useThemeColors";
import ActionModal from "@shared/ui/ActionsModal/ActionModal";
import GlobalFloatingModal from "@shared/ui/GlobalFloatingModal/GlobalFloatingModal";
import PopoverMenu from "@shared/ui/PopoverMenu/PopoverMenu";

import "../global.css";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// TODO make shadow of header bar smaller
const RootLayout = () => {
  // TODO
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const { colorScheme } = useTheme();
  // TODO
  const backgroundColor = useThemeColors("backgroundSurface");

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  // TODO stack vs slot
  // TODO do i really need @types/react?
  // react-test-renderer: deprecated?
  // recheck whole package json and npm package versions
  // when and how use: --legacy-peer-deps
  // TODO when user switch screen like when it creates routine then white background apearing
  return (
    <GestureHandlerRootView>
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
    </GestureHandlerRootView>
  );
};

export default RootLayout;
