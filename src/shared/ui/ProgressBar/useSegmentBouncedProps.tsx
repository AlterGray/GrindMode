import { useEffect } from "react";
import {
  SharedValue,
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

import { calcSegments, createRoundedPath } from "./utils";

type AnimatedPathsProps = {
  doneCount: number;
  segmentWidth: number;
  transitions: SharedValue<number>;
  highlightedIndexes: number[];
  phase: RitualPhaseColorName;
  total: number;
  height: number;
  radius: number;
  isDiff: boolean;
};

export const useSegmentBouncedProps = ({
  doneCount,
  segmentWidth,
  transitions,
  highlightedIndexes,
  phase,
  total,
  height,
  radius,
  isDiff,
}: AnimatedPathsProps) => {
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

  const allSegments = calcSegments(doneCount, highlightedIndexes);

  const segs = useAnimatedProps(() => {
    const x = segmentWidth * allSegments[allSegments.length - 1].start;
    const normalWidth =
      segmentWidth *
      (allSegments[allSegments.length - 1].end -
        allSegments[allSegments.length - 1].start);
    const animatedWidth = interpolate(
      transitions.value,
      [0, 1],
      [
        segmentWidth *
          (allSegments[allSegments.length - 1].end -
            allSegments[allSegments.length - 1].start -
            1),
        normalWidth,
      ],
    );
    const resolvedWidth = isDiff ? animatedWidth : normalWidth;
    const resolvedFill = interpolateColor(
      themeTransitionProgress.value,
      [0, 1],
      [
        Colors.ritualPhaseColors[colorScheme][phase],
        Colors.ritualPhaseColors[colorScheme][phase],
      ],
    );

    const d = createRoundedPath({
      x,
      width: resolvedWidth,
      height,
      radius,
      roundLeft: allSegments[allSegments.length - 1].start === 0,
      roundRight: allSegments[allSegments.length - 1].end === total,
    });

    // TODO animated "d" only for last segment
    return {
      d,
      fill: resolvedFill,
    };
  });

  return segs;
};
