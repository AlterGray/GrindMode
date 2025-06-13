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
};

const ProgressCircle: React.FC<Props> = ({
  progress,
  iconName,
  label,
  progressColor,
  backgroundColor,
}) => {
  const { width: screenW } = useWindowDimensions();

  const svgSize = screenW / 3;
  const radius = svgSize / 2.5;
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

        {/* Label (positioned in the center) */}
        <View style={[StyleSheet.absoluteFillObject, styles.center]}>
          <Ionicons name={iconName} size={20} color={Colors.light.warning} />
          <ThemedText style={{ fontWeight: "bold", marginLeft: 4 }}>
            {label}
          </ThemedText>
        </View>
      </View>

      <ProgressLabel text={label} />
    </View>
  );
};

export default ProgressCircle;

const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});
