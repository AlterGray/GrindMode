import { useEffect } from "react";
import {
  interpolateColor,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { Colors } from "@shared/constants/Colors";

import { useTheme } from "./useTheme";

// TODO
export const useThemedAnimatedProps = (
  colorName: keyof (typeof Colors)["light"] & keyof (typeof Colors)["dark"],
) => {
  const { colorScheme } = useTheme();
  const colorValue = useSharedValue(colorScheme === "light" ? 0 : 1);

  useEffect(() => {
    colorValue.value = withTiming(colorScheme === "light" ? 0 : 1, {
      duration: 250,
    });
  }, [colorScheme]);

  const light = Colors.light[colorName] ?? "red";
  const dark = Colors.dark[colorName] ?? "blue";

  const colorProps = useAnimatedProps(() => ({
    color: interpolateColor(colorValue.value, [0, 1], [light, dark]),
  }));

  return colorProps;
};
