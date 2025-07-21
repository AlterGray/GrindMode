import { RefObject, useEffect } from "react";
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

import { createSegmentPath } from "./utils";

type AnimatedPathsProps = {
  total: number;
  doneCount: number;
  segmentWidth: number;
  height: number;
  separatorWidth: number;
  separatorColorFillProps: Partial<{ stroke: string }>;
  radius: number;
  transitions: SharedValue<number>;
  prevDoneCount: RefObject<number>;
  highlightedIndexes: number[];
  phase: RitualPhaseColorName;
};

const useAnimatedPaths = ({
  total,
  doneCount,
  segmentWidth,
  height,
  radius,
  transitions,
  prevDoneCount,
  highlightedIndexes,
  phase,
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

  const animatedPaths = Array.from({ length: total }).map((_, index) =>
    useAnimatedProps(() => {
      const d = createSegmentPath(
        index,
        interpolate(
          transitions.value,
          [0, 1],
          [
            prevDoneCount.current < doneCount && index === doneCount - 1
              ? 0
              : segmentWidth,
            segmentWidth,
          ],
        ),
        height,
        radius,
        total,
      );

      return {
        d,
        fill: highlightedIndexes.includes(index)
          ? interpolateColor(
              pulsatingTransition.value,
              [0, 1],
              [
                Colors[colorScheme].dangerSoft,
                Colors.ritualPhaseColors[colorScheme]["HIGHTLIGHT"],
              ],
            )
          : interpolateColor(
              themeTransitionProgress.value,
              [0, 1],
              [
                Colors.ritualPhaseColors[colorScheme][phase],
                Colors.ritualPhaseColors[colorScheme][phase],
              ],
            ),
        opacity: highlightedIndexes.includes(index)
          ? interpolate(pulsatingTransition.value, [0, 1], [0.3, 1])
          : 1,
      };
    }),
  );

  return animatedPaths;
};

export default useAnimatedPaths;
