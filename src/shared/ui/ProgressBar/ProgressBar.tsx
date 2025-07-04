import React from "react";
import { View } from "react-native";
import Svg, { Line, Path } from "react-native-svg";

import { Colors } from "@shared/constants/Colors";
import { useThemeColors } from "@shared/hooks/useThemeColors";
import { useThemeStore } from "@shared/stores/themeStore";
import { RitualPhaseColorName } from "@shared/types/themeTypes";

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
  const theme = useThemeStore((state) => state.theme);
  const phaseColorFillProps =
    Colors.ritualPhaseColors[theme === "dark" ? "dark" : "light"][phase];
  const backgroundColorFillProps = useThemeColors("background");
  const separatorColorFillProps = useThemeColors("tabInactive");
  const highlightColorFillProps = useThemeColors("tabActive");

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

  // Генеруємо path з заокругленням лівого або правого краю
  const createSegmentPath = (index: number) => {
    const x = index * segmentWidth;
    const y = 0;
    const w = segmentWidth;
    const h = height;

    if (index === 0) {
      // Заокруглення зліва
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
      // Заокруглення справа
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
      // Без заокруглень
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
            <Path
              key={`seg-${i}`}
              d={createSegmentPath(i)}
              fill={getColorProps(i)}
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
              <Line
                key={`sep-${i}`}
                x1={x}
                y1={0}
                x2={x}
                y2={height}
                strokeWidth={separatorWidth}
                stroke={separatorColorFillProps}
              />
            );
          })}
      </Svg>
    </View>
  );
};

export default SeparatedProgressBar;
