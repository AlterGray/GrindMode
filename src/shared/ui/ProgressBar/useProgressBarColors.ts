import {
  interpolateColor,
  useAnimatedProps,
  useAnimatedStyle,
} from "react-native-reanimated";

import { Colors } from "@shared/constants/Colors";
import { themeTransitionProgress } from "@shared/stores/themeStore";
import { RitualPhaseColorName } from "@shared/types/themeTypes";

export const useProgressBarColors = (light: string, dark: string) => {
  const animatedStyles = useAnimatedStyle(() => ({
    color: interpolateColor(
      themeTransitionProgress.value,
      [0, 1],
      [light, dark],
    ),
  }));

  return animatedStyles;
};

export const usePhaseAnimatedColors = (
  colorName: RitualPhaseColorName,
  isSeparator?: boolean,
) => {
  const animatedPathProps = useAnimatedProps(() => ({
    [isSeparator ? "stroke" : "fill"]: interpolateColor(
      themeTransitionProgress.value,
      [0, 1],
      [
        Colors.ritualPhaseColors.light[colorName],
        Colors.ritualPhaseColors.dark[colorName],
      ],
    ),
  }));

  return animatedPathProps;
};
