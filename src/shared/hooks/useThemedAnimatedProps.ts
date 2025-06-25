import { interpolateColor, useAnimatedProps } from "react-native-reanimated";

import { Colors } from "@shared/constants/Colors";
import { themeTransitionProgress } from "@shared/stores/themeStore";
import { ColorName } from "@shared/types/themeTypes";

// TODO
export const useThemedAnimatedProps = (colorName: ColorName) => {
  const light = Colors.light[colorName] ?? "red"; // TODO
  const dark = Colors.dark[colorName] ?? "blue"; // TODO

  const colorProps = useAnimatedProps(() => ({
    color: interpolateColor(
      themeTransitionProgress.value,
      [0, 1],
      [light, dark],
    ),
  }));

  return colorProps;
};
