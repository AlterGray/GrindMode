import React from "react";
import { View } from "react-native";
import Svg from "react-native-svg";

import { useAnimatedSvgColor } from "@shared/hooks/useAnimatedSvgColor";
import { RitualPhaseColorName } from "@shared/types/themeTypes";

import { AnimatedLine, AnimatedPath } from "../AnimatedComponents/AnimatedSvgs";
import { usePhaseAnimatedColors } from "./useProgressBarColors";

interface SeparatedProgressBarProps {
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

// TODO make it more flexible
const SeparatedProgressBar: React.FC<SeparatedProgressBarProps> = ({
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
  const phaseColorFillProps = usePhaseAnimatedColors(phase);
  const backgroundColorFillProps = useAnimatedSvgColor("background", "fill");
  const separatorColorFillProps = useAnimatedSvgColor("tabInactive", "stroke");
  const highlightColorFillProps = useAnimatedSvgColor("tabActive", "fill");

  const segmentWidth = width / total;
  const radius = height / 2;

  const highlightedSet = React.useMemo(
    () => new Set(highlightedIndexes),
    [highlightedIndexes],
  );

  const getColorProps = (i: number) => {
    if (highlightedSet.has(i)) return highlightColorFillProps;
    if (i < doneCount) return phaseColorFillProps;
    return backgroundColorFillProps;
  };

  // Generate path with rounded corners on the left or right side
  const createSegmentPath = (index: number) => {
    const x = index * segmentWidth;
    const y = 0;
    const w = segmentWidth;
    const h = height;

    if (index === 0) {
      // rounded from the left
      return `
        M ${x + radius},${y}
        H ${x + w}
        V ${y + h}
        H ${x + radius}
        A ${radius},${radius} 0 0 1 ${x},${y + h - radius}
        V ${y + radius}
        A ${radius},${radius} 0 0 1 ${x + radius},${y}
        Z
      `;
    } else if (index === total - 1) {
      // rounded from the right
      return `
        M ${x},${y}
        H ${x + w - radius}
        A ${radius},${radius} 0 0 1 ${x + w},${y + radius}
        V ${y + h - radius}
        A ${radius},${radius} 0 0 1 ${x + w - radius},${y + h}
        H ${x}
        Z
      `;
    } else {
      // without rounded corners
      return `
        M ${x},${y}
        H ${x + w}
        V ${y + h}
        H ${x}
        Z
      `;
    }
  };

  return (
    <View style={{ width, height }}>
      <Svg width={width} height={height}>
        {Array.from({ length: total }).map((_, i) => {
          const isHighlighted = highlightedSet.has(i);
          const scale = isHighlighted ? 0.85 : 1;
          const x = i * segmentWidth;
          const translateX = x + segmentWidth / 2;
          const translateY = height / 2;

          const transform = `
            translate(${translateX} ${translateY})
            scale(${scale})
            translate(${-translateX} ${-translateY})
          `;

          return (
            <AnimatedPath
              key={`seg-${i}`}
              d={createSegmentPath(i)}
              animatedProps={getColorProps(i)}
              opacity={
                !isHighlighted && i >= doneCount ? backgroundColorOpacity : 1
              }
              transform={transform}
            />
          );
        })}

        {showSeparators &&
          Array.from({ length: total - 1 }).map((_, i) => {
            const x = segmentWidth * (i + 1);
            return (
              <AnimatedLine
                key={`sep-${i}`}
                x1={x}
                y1={0}
                x2={x}
                y2={height}
                strokeWidth={separatorWidth}
                animatedProps={separatorColorFillProps}
              />
            );
          })}
      </Svg>
    </View>
  );
};

export default SeparatedProgressBar;
