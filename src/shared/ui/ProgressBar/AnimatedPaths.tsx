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

export const useAnimatedPaths = ({
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

  const segs = allSegments.map((segment, i) =>
    useAnimatedProps(() => {
      const x = segmentWidth * segment.start;
      const normalWidth = segmentWidth * (segment.end - segment.start);
      const animatedWidth = interpolate(
        transitions.value,
        [0, 1],
        [segmentWidth * (segment.end - segment.start - 1), normalWidth],
      );
      const resolvedWidth =
        i === allSegments.length - 1 && isDiff ? animatedWidth : normalWidth;
      const resolvedOpacity =
        segment.type === "missed"
          ? interpolate(pulsatingTransition.value, [0, 1], [0.3, 1])
          : 1;
      const resolvedFill = interpolateColor(
        themeTransitionProgress.value,
        [0, 1],
        [
          Colors.ritualPhaseColors[colorScheme][
            segment.type === "done" ? phase : "HIGHTLIGHT"
          ],
          Colors.ritualPhaseColors[colorScheme][
            segment.type === "done" ? phase : "HIGHTLIGHT"
          ],
        ],
      );

      const d = createRoundedPath({
        x,
        width: resolvedWidth,
        height,
        radius,
        roundLeft: segment.start === 0,
        roundRight: segment.end === total,
      });

      // TODO animated "d" only for last segment
      return {
        d,
        fill: resolvedFill,
        opacity: resolvedOpacity,
      };
    }),
  );

  return segs;
};
