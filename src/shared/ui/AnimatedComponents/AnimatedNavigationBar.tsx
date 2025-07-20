import { useEffect } from "react";
import Animated, { useAnimatedReaction } from "react-native-reanimated";
import { runOnJS } from "react-native-reanimated";
import { interpolateColor } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import * as NavigationBar from "expo-navigation-bar";

import { Colors } from "@shared/constants/Colors";
import { useAnimatedColor } from "@shared/hooks/useAnimatedColor";
import { themeTransitionProgress } from "@shared/stores/themeStore";
import { useThemeStore } from "@shared/stores/themeStore";

type AnimatedNavigationBarProps = {
  isLoaded: boolean;
};

const AnimatedNavigationBar: React.FC<AnimatedNavigationBarProps> = ({
  isLoaded,
}) => {
  const theme = useThemeStore((state) => state.theme);
  const insets = useSafeAreaInsets();
  const bgColorStyle = useAnimatedColor("backgroundSurface");

  useAnimatedReaction(
    () => themeTransitionProgress.value,
    (progress) => {
      runOnJS(NavigationBar.setBackgroundColorAsync)(
        interpolateColor(
          progress,
          [0, 1],
          [Colors.light.backgroundSurface, Colors.dark.backgroundSurface],
        ),
      );
      runOnJS(NavigationBar.setButtonStyleAsync)(
        theme === "dark" ? "dark" : "light",
      );
    },
  );

  useEffect(() => {
    if (isLoaded) {
      NavigationBar.setPositionAsync("absolute");
      NavigationBar.setBackgroundColorAsync("transparent");
      NavigationBar.setButtonStyleAsync(theme === "dark" ? "dark" : "light");
    }
  }, [isLoaded]);

  return (
    <Animated.View
      style={[
        bgColorStyle,
        {
          width: "100%",
          height: insets.bottom,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 10000,
        },
      ]}
    />
  );
};

export default AnimatedNavigationBar;
