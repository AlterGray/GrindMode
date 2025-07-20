import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { StatusBar } from "expo-status-bar";

import { useAnimatedColor } from "@shared/hooks/useAnimatedColor";
import { useTheme } from "@shared/hooks/useTheme";

const AnimatedStatusBar = () => {
  const { colorScheme } = useTheme();
  const bgAnimStyle = useAnimatedColor("backgroundSurface");
  const insets = useSafeAreaInsets();

  return (
    <>
      <StatusBar
        translucent
        style={colorScheme === "dark" ? "light" : "dark"}
        backgroundColor={"transparent"}
      />
      <Animated.View
        pointerEvents="none"
        style={[
          bgAnimStyle,
          {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 999,
            width: "100%",
            height: insets.top,
          },
        ]}
      />
    </>
  );
};

export default AnimatedStatusBar;
