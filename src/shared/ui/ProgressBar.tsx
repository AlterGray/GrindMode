import React from "react";
import { View } from "react-native";
import Svg, { Line, Rect } from "react-native-svg";

interface SeparatedProgressBarProps {
  progress: number; // 0 to 1
  width: number;
  height?: number;
  segments?: number;
  showSeparators?: boolean;
  fillColor?: string;
  backgroundColor?: string;
  separatorColor?: string;
  separatorWidth?: number;
  backgroundOpacity?: number;
}

export const SeparatedProgressBar: React.FC<SeparatedProgressBarProps> = ({
  progress,
  width,
  height = 10,
  segments = 10,
  showSeparators = true,
  fillColor = "#3b82f6",
  backgroundColor = "#e5e7eb",
  separatorColor = "#ffffff88",
  separatorWidth = 1,
  backgroundOpacity = 1,
}) => {
  const clampedProgress = Math.min(Math.max(progress, 0), 1);
  const progressWidth = clampedProgress * width;

  const segmentSpacing = width / segments;

  return (
    <View>
      <Svg width={width} height={height}>
        {/* Background bar */}
        <Rect
          x={0}
          y={0}
          width={width}
          height={height}
          rx={height / 2}
          fill={backgroundColor}
          opacity={backgroundOpacity}
        />

        {/* Progress bar */}
        <Rect
          x={0}
          y={0}
          width={progressWidth}
          height={height}
          rx={height / 2}
          fill={fillColor}
        />

        {/* Optional vertical separators */}
        {showSeparators &&
          Array.from({ length: segments - 1 }).map((_, i) => {
            const x = segmentSpacing * (i + 1);
            return (
              <Line
                key={i}
                x1={x}
                y1={0}
                x2={x}
                y2={height}
                stroke={separatorColor}
                strokeWidth={separatorWidth}
              />
            );
          })}
      </Svg>
    </View>
  );
};
