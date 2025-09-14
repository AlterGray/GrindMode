import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { AnimatedProps } from "react-native-reanimated";
import Svg, { PathProps } from "react-native-svg";

import { AnimatedCircle } from "@shared/ui/AnimatedComponents/AnimatedSvgs";
import AnimatedThemedText from "@shared/ui/AnimatedThemedText";
import StyledButton from "@shared/ui/StyledButton";

type TimerCircleProps = {
  progress: number;
  progressTitle: string;
  animatedBgColor: AnimatedProps<PathProps>;
  animatedProgressColor: AnimatedProps<PathProps>;
  onPress?: () => void;
  parentSize: { width: number; height: number };
  extraButtonTitle?: string;
  onExtraButtonPress?: () => void;
};

function roundToPrecision(num: number, precision = 2) {
  const factor = 10 ** precision;
  return Math.round(num * factor) / factor;
}

const MIN_SIZE = 28; // absolute minimum circle area to avoid bad math

const TimerCircle: React.FC<TimerCircleProps> = ({
  progress,
  progressTitle,
  animatedBgColor,
  animatedProgressColor,
  onPress,
  parentSize = { width: 100, height: 100 },
  extraButtonTitle,
  onExtraButtonPress,
}) => {
  const EPSILON = 0.0001;
  const clampedProgress = progress < EPSILON ? 0 : Math.min(progress, 1);

  // 1) derive a usable square from parent
  const containerWidth = Math.max(0, parentSize.width || 0);
  const containerHeight = Math.max(0, parentSize.height || 0);
  const available = Math.max(
    MIN_SIZE,
    Math.min(containerWidth, containerHeight),
  );

  // 2) leave a small padding so circle never touches edges
  const baseSize = Math.max(MIN_SIZE, available);

  // 3) stroke width relative to base size, with a safe minimum
  const strokeWidth = Math.max(2, Math.round(baseSize * 0.08));

  // 4) because stroke has caps, give extra room for half the stroke on each side
  const svgSize = Math.ceil(baseSize + strokeWidth);

  // center + radius
  const cx = svgSize / 2;
  const cy = svgSize / 2;
  const radius = baseSize / 2;

  const rawCircumference = 2 * Math.PI * radius;
  const circumference = roundToPrecision(rawCircumference, 2);
  const strokeDashOffset = circumference * (1 - clampedProgress);

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[{ width: svgSize, alignItems: "center" }]}
    >
      <View style={{ width: svgSize, height: svgSize }}>
        <Svg width={svgSize} height={svgSize}>
          {/* background track */}
          <AnimatedCircle
            animatedProps={animatedBgColor}
            cx={cx}
            cy={cy}
            r={radius}
            strokeWidth={strokeWidth / 2}
            fill="none"
          />
          {/* progress stroke */}
          <AnimatedCircle
            animatedProps={animatedProgressColor}
            cx={cx}
            cy={cy}
            r={radius}
            strokeWidth={strokeWidth * 0.8}
            fill="none"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={strokeDashOffset}
            strokeLinecap="round"
            transform={`rotate(-90 ${cx} ${cy})`}
          />
        </Svg>

        <View
          style={[
            StyleSheet.absoluteFillObject,
            { justifyContent: "center", alignItems: "center", gap: 4 },
          ]}
        >
          <AnimatedThemedText style={{ fontWeight: "semibold", fontSize: 24 }}>
            {progressTitle}
          </AnimatedThemedText>
          {extraButtonTitle && (
            <StyledButton
              title={extraButtonTitle}
              onPress={onExtraButtonPress}
              variant="secondary-sharped-10"
              className="bg-light-buttonPrimaryBackground dark:bg-dark-buttonPrimaryBackground"
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TimerCircle;
