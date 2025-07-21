import { interpolateColor, useAnimatedStyle } from "react-native-reanimated";

import { Colors } from "@shared/constants/Colors";
import { themeTransitionProgress } from "@shared/stores/themeStore";
import { ColorName } from "@shared/types/themeTypes";

export const useAnimatedColor = (color: ColorName, isText?: boolean) => {
  const lightColor = Colors.light[color];
  const darkColor = Colors.dark[color];

  const animatedStyles = useAnimatedStyle(() => ({
    [isText ? "color" : "backgroundColor"]: interpolateColor(
      themeTransitionProgress.value,
      [0, 1],
      [lightColor, darkColor],
    ),
  }));

  return animatedStyles;
};
