import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

import { useFolderStoreWithSubscribe } from "@features/folder/folderStore";
import { useRecalculateMissedRituals } from "@features/rituals/hooks/useRecalculateMissedRituals";
import { useRitualDayWatcher } from "@features/rituals/hooks/useRitualDayWatcher";
import { useRitualStoreWithSubscribe } from "@features/rituals/ritualStore";
import { useStatisticStoreWithSubscribe } from "@features/rituals/statisticStore";

import { useTheme } from "@shared/hooks/useTheme";
import { useThemeTransitionSync } from "@shared/hooks/useThemeTransitionSync";
import {
  useThemeStore,
  useThemeStoreWithSubscribe,
} from "@shared/stores/themeStore";
import ActionModal from "@shared/ui/ActionsModal/ActionModal";
import AnimatedNavigationBar from "@shared/ui/AnimatedComponents/AnimatedNavigationBar";
import AnimatedStatusBar from "@shared/ui/AnimatedComponents/AnimatedStatusBar";
import GlobalFloatingModal from "@shared/ui/GlobalFloatingModal/GlobalFloatingModal";
import PopoverMenu from "@shared/ui/PopoverMenu/PopoverMenu";

import "../global.css";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  // TODO why your code base so big, probably something wrong?
  // TODO even if we pass there store created without "subscribeWithSelector" TS don't show error
  useRitualStoreWithSubscribe();
  useFolderStoreWithSubscribe();
  useStatisticStoreWithSubscribe();
  useRitualDayWatcher();
  useRecalculateMissedRituals();
  useThemeStoreWithSubscribe();

  useThemeTransitionSync();

  // TODO
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const { setScheme } = useTheme();
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // TODO subscribe? TODO
  useEffect(() => {
    setScheme(theme); // or maybe setState if you're syncing to system theme
  }, [theme]);

  if (!loaded) {
    return null;
  }

  // TODO stack vs slot
  // TODO do i really need @types/react?
  // react-test-renderer: deprecated?
  // recheck whole package json and npm package versions
  // when and how use: --legacy-peer-deps
  // TODO when user switch screen like when it creates ritual then white background apearing
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["left", "right"]}>
      <AnimatedStatusBar />
      <GestureHandlerRootView>
        <Stack
          screenOptions={{
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
      <AnimatedNavigationBar isLoaded={loaded} />
    </SafeAreaView>
  );
};

export default RootLayout;
