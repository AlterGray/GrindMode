import React from "react";
import { View, useWindowDimensions } from "react-native";
import { AnimatedProps } from "react-native-reanimated";
import Svg from "react-native-svg";
import type { PathProps } from "react-native-svg";

import { AnimatedPath } from "@shared/ui/AnimatedComponents/AnimatedSvgs";
import AnimatedThemedText from "@shared/ui/AnimatedThemedText";

type LabeledProgressBarProps = {
  progress: number; // expected range: 0 to 1
  barHeight?: number;
  animatedBgColor: AnimatedProps<PathProps>;
  animatedProgressColor: AnimatedProps<PathProps>;
  label?: string; // left label
};

const LabeledProgressBar: React.FC<LabeledProgressBarProps> = React.memo(
  ({
    progress,
    barHeight = 10,
    animatedBgColor,
    animatedProgressColor,
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
    const progressPath =
      progress > 0 ? `M${startX} ${halfHeight} L${endX} ${halfHeight}` : "";

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
        <AnimatedThemedText
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
        </AnimatedThemedText>

        {/* Right Percentage */}
        <AnimatedThemedText
          style={{
            position: "absolute",
            right: 0,
            top: -7,
            fontWeight: "bold",
            fontSize: 14,
          }}
        >
          {`${Math.round(clampedProgress * 100)}%`}
        </AnimatedThemedText>

        <Svg width={barWidth} height={barHeight}>
          {/* Background bar */}
          <AnimatedPath
            animatedProps={animatedBgColor}
            d={backgroundPath}
            strokeWidth={barHeight}
            strokeLinecap="round"
          />

          {/* Progress bar */}
          <AnimatedPath
            animatedProps={animatedProgressColor}
            d={progressPath}
            strokeWidth={barHeight}
            strokeLinecap="round"
          />
        </Svg>
      </View>
    );
  },
);

export default LabeledProgressBar;
