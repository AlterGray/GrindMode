import { useEffect } from "react";
import {
  interpolate,
  interpolateColor,
  useAnimatedProps,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

import { Colors } from "@shared/constants/Colors";
import { useTheme } from "@shared/hooks/useTheme";
import { themeTransitionProgress } from "@shared/stores/themeStore";
import { RitualPhaseColorName } from "@shared/types/themeTypes";

type AnimatedPathsProps = {
  phase: RitualPhaseColorName;
};

export const useSegmentProps = ({ phase }: AnimatedPathsProps) => {
  const { colorScheme } = useTheme();

  const pulsatingTransition = useSharedValue(0);

  useEffect(() => {
    pulsatingTransition.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 300 }),
        withTiming(0, { duration: 300 }),
        withTiming(1, { duration: 300 }),
      ),
      2,
    );
  }, []);

  const done = useAnimatedProps(() => {
    const resolvedFill = interpolateColor(
      themeTransitionProgress.value,
      [0, 1],
      [
        Colors.ritualPhaseColors[colorScheme][phase],
        Colors.ritualPhaseColors[colorScheme][phase],
      ],
    );

    // TODO animated "d" only for last segment
    return {
      fill: resolvedFill,
    };
  });

  const missed = useAnimatedProps(() => {
    const resolvedFill = interpolateColor(
      themeTransitionProgress.value,
      [0, 1],
      [
        Colors.ritualPhaseColors[colorScheme]["HIGHTLIGHT"],
        Colors.ritualPhaseColors[colorScheme]["HIGHTLIGHT"],
      ],
    );
    const resolvedOpacity = interpolate(
      pulsatingTransition.value,
      [0, 1],
      [0.3, 1],
    );
    // TODO animated "d" only for last segment
    return {
      fill: resolvedFill,
      opacity: resolvedOpacity,
    };
  });

  return { done, missed };
};
