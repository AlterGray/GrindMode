import { useEffect } from "react";
import {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { Colors } from "@shared/constants/Colors";

import { useTheme } from "./useTheme";

export const useAnimatedColor = (
  color: keyof typeof Colors.light & keyof typeof Colors.dark,
  isText?: boolean,
) => {
  const { colorScheme } = useTheme();
  const lightColor = Colors.light[color];
  const darkColor = Colors.dark[color];

  const colorValue = useSharedValue<number>(colorScheme === "light" ? 0 : 1);

  useEffect(() => {
    colorValue.value = withTiming(colorScheme === "light" ? 0 : 1, {
      duration: 250,
    });
  }, [colorScheme, color]);

  const animatedStyles = useAnimatedStyle(() => ({
    [isText ? "color" : "backgroundColor"]: interpolateColor(
      colorValue.value,
      [0, 1],
      [lightColor, darkColor],
    ),
  }));

  return animatedStyles;
};
