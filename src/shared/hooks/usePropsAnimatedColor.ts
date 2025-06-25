// TODO bad naming & useThemedAnimatedProps.ts has bad naming too
import { interpolateColor, useAnimatedProps } from "react-native-reanimated";

import { Colors } from "@shared/constants/Colors";
import { themeTransitionProgress } from "@shared/stores/themeStore";
import { ColorName } from "@shared/types/themeTypes";

export const usePropsAnimatedColor = (
  colorName: ColorName,
  isSeparator?: boolean,
) => {
  const animatedPathProps = useAnimatedProps(() => ({
    [isSeparator ? "stroke" : "fill"]: interpolateColor(
      themeTransitionProgress.value,
      [0, 1],
      [Colors.light[colorName], Colors.dark[colorName]],
    ),
  }));

  return animatedPathProps;
};
