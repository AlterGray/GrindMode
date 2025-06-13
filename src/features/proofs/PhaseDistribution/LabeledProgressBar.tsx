import React from "react";
import { View, useWindowDimensions } from "react-native";
import Svg, { Path } from "react-native-svg";

import ThemedText from "@shared/ui/ThemedText";

type LabeledProgressBarProps = {
  progress: number; // expected range: 0 to 1
  barHeight?: number;
  backgroundColor?: string;
  progressColor?: string;
  label?: string; // left label
};

const LabeledProgressBar: React.FC<LabeledProgressBarProps> = React.memo(
  ({
    progress,
    barHeight = 10,
    backgroundColor = "#ccc",
    progressColor = "#333",
    label = "",
  }) => {
    const { width } = useWindowDimensions();

    const barWidth = width * 0.9;
    const halfHeight = barHeight / 2;

    const clampedProgress = Math.min(Math.max(progress, 0), 1);

    const padding = barHeight / 2;
    const startX = padding;
    const backgroundPath = `M${startX} ${halfHeight} L${barWidth - padding} ${halfHeight}`;

    const endX = startX + (barWidth - 2 * padding) * clampedProgress;
    const progressPath = `M${startX} ${halfHeight} L${endX} ${halfHeight}`;

    return (
      <View
        style={{
          width: barWidth,
          height: barHeight + 24, // extra vertical space for labels
          alignSelf: "center",
          position: "relative",
          justifyContent: "center",
        }}
      >
        {/* Left Label */}
        <ThemedText
          style={{
            position: "absolute",
            left: 0,
            top: -7,
            fontWeight: "bold",
            fontSize: 14,
          }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {label}
        </ThemedText>

        {/* Right Percentage */}
        <ThemedText
          style={{
            position: "absolute",
            right: 0,
            top: -7,
            fontWeight: "bold",
            fontSize: 14,
          }}
        >
          {`${Math.round(clampedProgress * 100)}%`}
        </ThemedText>

        <Svg width={barWidth} height={barHeight}>
          {/* Background bar */}
          <Path
            d={backgroundPath}
            stroke={backgroundColor}
            strokeWidth={barHeight}
            strokeLinecap="round"
          />

          {/* Progress bar */}
          <Path
            d={progressPath}
            stroke={progressColor}
            strokeWidth={barHeight}
            strokeLinecap="round"
          />
        </Svg>
      </View>
    );
  },
);

export default LabeledProgressBar;
