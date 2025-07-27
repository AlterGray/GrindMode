import React, { useEffect, useRef } from "react";
import { View } from "react-native";
import { useSharedValue, withSpring } from "react-native-reanimated";
import Svg from "react-native-svg";

import { useAnimatedSvgColor } from "@shared/hooks/useAnimatedSvgColor";
import { getRandomArbitrary } from "@shared/lib/utils/common";
import { RitualPhaseColorName } from "@shared/types/themeTypes";

import BackgroundSegments from "./BackgroundSegments";
import Segments from "./Segments";
import { useSegmentBouncedProps } from "./useSegmentBouncedProps";
import { useSegmentProps } from "./useSegmentProps";

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
    if (prevDoneCount.current < doneCount) {
      transitions.value = withSpring(1, {
        stiffness: 1000,
        damping: 23,
        mass: Math.floor(getRandomArbitrary(3, 6)),
      });
    } else {
      transitions.value = withSpring(0);
    }
    prevDoneCount.current = doneCount;
  }, [doneCount]);

  const bouncedPathProps = useSegmentBouncedProps({
    doneCount,
    segmentWidth,
    transitions,
    highlightedIndexes,
    phase,
    total,
    height,
    radius,
    isDiff: prevDoneCount.current < doneCount,
  });

  const pathProps = useSegmentProps({
    phase,
    key: highlightedIndexes.join("-"),
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
          radius={radius}
          separatorWidth={separatorWidth}
          showSeparators={showSeparators}
          separatorColorFillProps={separatorColorFillProps}
          bouncedPathProps={bouncedPathProps}
          pathProps={pathProps}
          isDiff={prevDoneCount.current < doneCount}
        />
      </Svg>
    </View>
  );
};

export default SegmentedProgressBar;
