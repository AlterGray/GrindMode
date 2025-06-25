import { useEffect } from "react";
import {
  interpolateColor,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { Colors } from "@shared/constants/Colors";
import { ColorName } from "@shared/types/themeTypes";

import { useTheme } from "./useTheme";

export const usePropsAnimatedColor = (
  colorName: ColorName,
  isSeparator?: boolean,
) => {
  const { colorScheme } = useTheme();
  const colorValue = useSharedValue(colorScheme === "light" ? 0 : 1);

  useEffect(() => {
    colorValue.value = withTiming(colorScheme === "light" ? 0 : 1, {
      duration: 250,
    });
  }, [colorScheme]);

  const animatedPathProps = useAnimatedProps(() => ({
    [isSeparator ? "stroke" : "fill"]: interpolateColor(
      colorValue.value,
      [0, 1],
      [Colors.light[colorName], Colors.dark[colorName]],
    ),
  }));

  return animatedPathProps;
};
