import React from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import Svg, { Circle } from "react-native-svg";

import { Ionicons } from "@expo/vector-icons";

import { Colors } from "@shared/constants/Colors";
import ThemedText from "@shared/ui/ThemedText";

import ProgressLabel from "./ProgressLabel";

type Props = {
  progress: number; // 0 - 1
  iconName: keyof typeof Ionicons.glyphMap;
  label: string;
  progressColor?: string;
  backgroundColor?: string;
  scale?: number;
};

// TODO ADD ABILITY to tap and see description
const CircleProgressBar: React.FC<Props> = ({
  progress,
  label,
  progressColor,
  backgroundColor,
  scale = 1,
}) => {
  const { width: screenW } = useWindowDimensions();

  const svgSize = screenW / 3;
  const radius = (svgSize / 2.5) * scale;
  const strokeWidth = radius * 0.2;

  const cx = svgSize / 2;
  const cy = svgSize / 2;
  const adjustedRadius = radius - strokeWidth / 2;
  const circumference = 2 * Math.PI * adjustedRadius;
  const strokeDashOffset = circumference * (1 - progress);

  return (
    <View className="justify-center items-center">
      <View style={{ width: svgSize, height: svgSize }}>
        <Svg width="100%" height="100%">
          {/* Background Circle */}
          <Circle
            cx={cx}
            cy={cy}
            r={adjustedRadius}
            stroke={backgroundColor}
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Progress Circle */}
          <Circle
            cx={cx}
            cy={cy}
            r={adjustedRadius}
            stroke={progressColor}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={strokeDashOffset}
            originX={cx}
            originY={cy}
          />
        </Svg>

        {/* use style to make it reusable across diff projects */}
        <View style={[StyleSheet.absoluteFillObject, styles.center]}>
          <ThemedText
            style={{
              fontWeight: "bold",
              marginLeft: 4,
              fontSize: 16 * scale,
            }}
          >
            +{Math.floor(progress * 100)}%
          </ThemedText>
        </View>
      </View>

      <ProgressLabel text={label} />
    </View>
  );
};

export default CircleProgressBar;

const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});
