import React, { useEffect, useRef } from "react";
import { View } from "react-native";
import { useSharedValue, withSpring } from "react-native-reanimated";
import Svg from "react-native-svg";

import { useAnimatedSvgColor } from "@shared/hooks/useAnimatedSvgColor";
import { RitualPhaseColorName } from "@shared/types/themeTypes";

import useAnimatedPaths from "./AnimatedPaths";
import BackgroundSegments from "./BackgroundSegments";
import Segments from "./Segments";

interface SegmentedProgressBarProps {
  width: number;
  height?: number;
  total: number;
  doneCount: number;
  highlightedIndexes?: number[];
  colors?: {
    done?: string;
    future?: string;
  };
  separatorWidth?: number;
  showSeparators?: boolean;
  phase: RitualPhaseColorName;
  backgroundColorOpacity?: number;
}

const SegmentedProgressBar: React.FC<SegmentedProgressBarProps> = ({
  width,
  height = 10,
  total,
  doneCount,
  highlightedIndexes = [],
  separatorWidth = 1,
  showSeparators = true,
  phase,
  backgroundColorOpacity = 0.7,
}) => {
  const separatorColorFillProps = useAnimatedSvgColor("tabInactive", "stroke");

  const prevDoneCount = useRef(doneCount);

  const segmentWidth = width / total;
  const radius = height / 2;

  const highlightedSet = React.useMemo(
    () => new Set(highlightedIndexes),
    [highlightedIndexes],
  );

  const transitions = useSharedValue(1);

  useEffect(() => {
    prevDoneCount.current < doneCount
      ? (transitions.value = withSpring(1, {
          stiffness: 355,
          damping: 23,
          mass: 1,
        }))
      : (transitions.value = withSpring(0));
    prevDoneCount.current = doneCount;
  }, [doneCount]);

  const paths = useAnimatedPaths({
    total,
    doneCount,
    segmentWidth,
    height,
    radius,
    transitions,
    prevDoneCount,
    highlightedIndexes,
    phase,
    separatorWidth,
    separatorColorFillProps,
  });

  return (
    <View style={{ width, height }}>
      <Svg width={width} height={height}>
        <BackgroundSegments
          width={segmentWidth * total}
          height={height}
          radius={radius}
          backgroundColorOpacity={backgroundColorOpacity}
        />

        <Segments
          total={total}
          doneCount={doneCount}
          highlightedSet={highlightedSet}
          segmentWidth={segmentWidth}
          height={height}
          separatorWidth={separatorWidth}
          showSeparators={showSeparators}
          separatorColorFillProps={separatorColorFillProps}
          animatedPaths={paths}
        />
      </Svg>
    </View>
  );
};

export default SegmentedProgressBar;
