import { useEffect } from "react";
import {
  interpolateColor,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { Colors } from "@shared/constants/Colors";
import { useTheme } from "@shared/hooks/useTheme";
import { RitualPhaseColorName } from "@shared/types/themeTypes";

export const useProgressBarColors = (light: string, dark: string) => {
  const { colorScheme } = useTheme();
  const colorValue = useSharedValue<number>(colorScheme === "light" ? 0 : 1);

  useEffect(() => {
    colorValue.value = withTiming(colorScheme === "light" ? 0 : 1, {
      duration: 250,
    });
  }, [colorScheme]);

  const animatedStyles = useAnimatedStyle(() => ({
    color: interpolateColor(colorValue.value, [0, 1], [light, dark]),
  }));

  return animatedStyles;
};

export const usePhaseAnimatedColors = (
  colorName: RitualPhaseColorName,
  isSeparator?: boolean,
) => {
  const { colorScheme } = useTheme();
  const colorValue = useSharedValue<number>(colorScheme === "light" ? 0 : 1);

  useEffect(() => {
    colorValue.value = withTiming(colorScheme === "light" ? 0 : 1, {
      duration: 250,
    });
  }, [colorScheme]);

  const animatedPathProps = useAnimatedProps(() => ({
    [isSeparator ? "stroke" : "fill"]: interpolateColor(
      colorValue.value,
      [0, 1],
      [
        Colors.ritualPhaseColors.light[colorName],
        Colors.ritualPhaseColors.dark[colorName],
      ],
    ),
  }));

  return animatedPathProps;
};
