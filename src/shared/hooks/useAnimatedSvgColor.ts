import { interpolateColor, useAnimatedProps } from "react-native-reanimated";

import { Colors } from "@shared/constants/Colors";
import { themeTransitionProgress } from "@shared/stores/themeStore";
import { ColorName } from "@shared/types/themeTypes";

export const useAnimatedSvgColor = (
  color: ColorName,
  property: "stroke" | "fill",
) => {
  const lightColor = Colors.light[color];
  const darkColor = Colors.dark[color];

  const animatedProps = useAnimatedProps(() => ({
    [property === "stroke" ? "stroke" : "fill"]: interpolateColor(
      themeTransitionProgress.value,
      [0, 1],
      [lightColor, darkColor],
    ),
  }));

  return animatedProps;
};
