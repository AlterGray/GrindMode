import { Colors } from "@/constants/Colors";
import { useThemeStore } from "@shared/stores/themeStore";
import { ColorName, Theme } from "@shared/types/commonTypes";

export function useThemeColors(): Theme;
export function useThemeColors(colorName: ColorName): Theme[ColorName];
export function useThemeColors(colorName?: ColorName) {
  const isDark = useThemeStore((theme) => theme.isDark);
  const theme = isDark ? Colors.dark : Colors.light;

  if (colorName) {
    return theme[colorName];
  }

  return theme;
}
