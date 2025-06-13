import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import Svg, { Circle } from "react-native-svg";

import ThemedText from "@shared/ui/ThemedText";

import ProgressLabel from "./ProgressLabel";

type Props = {
  progress: number;
  label: string;
  progressColor?: string;
  backgroundColor?: string;
  scale?: number;
  onPress?: () => void;
};

const ProgressCircle: React.FC<Props> = ({
  progress,
  label,
  progressColor = "#888",
  backgroundColor = "#ccc",
  scale = 1,
  onPress,
}) => {
  const { width: screenWidth } = useWindowDimensions();

  const size = screenWidth * 0.25 * scale;
  const radius = size / 2.5;
  const strokeWidth = radius * 0.2;
  const cx = size / 2;
  const cy = size / 2;
  const adjustedRadius = radius - strokeWidth / 2;
  const circumference = 2 * Math.PI * adjustedRadius;
  const strokeDashOffset = circumference * (1 - progress);

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[styles.container, { width: size + 8, alignItems: "center" }]}
    >
      <View style={{ width: size, height: size }}>
        <Svg width={size} height={size}>
          <Circle
            cx={cx}
            cy={cy}
            r={adjustedRadius}
            stroke={backgroundColor}
            strokeWidth={strokeWidth}
            fill="none"
          />
          <Circle
            cx={cx}
            cy={cy}
            r={adjustedRadius}
            stroke={progressColor}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={strokeDashOffset}
            strokeLinecap="round"
            transform={`rotate(-90 ${cx} ${cy})`}
          />
        </Svg>

        <View style={[StyleSheet.absoluteFillObject, styles.center]}>
          <ThemedText style={{ fontWeight: "bold", fontSize: 16 * scale }}>
            {Math.floor(progress * 100)}%
          </ThemedText>
        </View>
      </View>

      <ProgressLabel text={label} />
    </TouchableOpacity>
  );
};

export default ProgressCircle;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
});
