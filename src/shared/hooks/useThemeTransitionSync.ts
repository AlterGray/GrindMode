import { useEffect } from "react";
import { runOnUI, withTiming } from "react-native-reanimated";

import {
  themeTransitionProgress,
  useThemeStore,
} from "@shared/stores/themeStore";

export const useThemeTransitionSync = () => {
  const theme = useThemeStore((s) => s.theme);

  useEffect(() => {
    runOnUI(() => {
      themeTransitionProgress.value = withTiming(theme === "dark" ? 1 : 0, {
        duration: 300,
      });
    })();
  }, [theme]);
};
