import { Colors } from "@shared/constants/Colors";
import { ColorName, Theme } from "@shared/types/commonTypes";

import { useTheme } from "./useTheme";

export function useThemeColors(): Theme;
export function useThemeColors(colorName: ColorName): Theme[ColorName];
export function useThemeColors(colorName?: ColorName) {
  const { colorScheme } = useTheme();
  const theme = Colors[colorScheme];

  if (colorName) {
    return theme[colorName];
  }

  return theme;
}
