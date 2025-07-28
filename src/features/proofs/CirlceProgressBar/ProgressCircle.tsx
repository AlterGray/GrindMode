import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { AnimatedProps } from "react-native-reanimated";
import Svg, { PathProps } from "react-native-svg";

import { Ionicons } from "@expo/vector-icons";

import { i18n } from "@shared/lib/utils/i18n/i18n-js";
import { AnimatedCircle } from "@shared/ui/AnimatedComponents/AnimatedSvgs";
import AnimatedThemedText from "@shared/ui/AnimatedThemedText";

import ProgressLabel from "./ProgressLabel";

// TODO move to another folder??
type ProgressCircleProps = {
  progress: number;
  progressTitle: string;
  label: string;
  animatedBgColor: AnimatedProps<PathProps>;
  animatedProgressColor: AnimatedProps<PathProps>;
  scale?: number;
  // TODO DECLARATIVE VS IMPERATIVE
  isLocked?: boolean;
  onPress?: () => void;
};

function roundToPrecision(num: number, precision = 3) {
  const factor = 10 ** precision;
  return Math.round(num * factor) / factor;
}

// TODO remove hardcodes
const ProgressCircle: React.FC<ProgressCircleProps> = ({
  progress,
  progressTitle,
  label,
  animatedBgColor,
  animatedProgressColor,
  scale = 1,
  isLocked,
  onPress,
}) => {
  const { width: screenWidth } = useWindowDimensions();

  const EPSILON = 0.0001;
  const clampedProgress = progress < EPSILON ? 0 : Math.min(progress, 1);
  const size = screenWidth * 0.25 * scale;
  const radius = size / 2.5;
  const strokeWidth = radius * 0.2;
  const cx = size / 2;
  const cy = size / 2.5;
  const adjustedRadius = radius - strokeWidth / 2;
  const rawCircumference = 2 * Math.PI * adjustedRadius;
  const circumference = roundToPrecision(rawCircumference, 2);
  const strokeDashOffset = circumference * (1 - clampedProgress);
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[{ width: size + 8, alignItems: "center" }]}
    >
      <View style={{ width: size, height: size - cy / 2 }}>
        <Svg width={size} height={size}>
          <AnimatedCircle
            animatedProps={animatedBgColor}
            cx={cx}
            cy={cy}
            r={adjustedRadius}
            strokeWidth={strokeWidth}
            fill="none"
          />
          <AnimatedCircle
            animatedProps={animatedProgressColor}
            cx={cx}
            cy={cy}
            r={adjustedRadius}
            strokeWidth={strokeWidth}
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
            { justifyContent: "center", alignItems: "center" },
          ]}
        >
          {isLocked ? (
            <>
              <Ionicons name="lock-closed" size={20 * scale} color="gray" />
              <AnimatedThemedText
                style={{ fontWeight: "bold", fontSize: 12 * scale }}
              >
                {i18n.t("locked")}
              </AnimatedThemedText>
            </>
          ) : (
            <AnimatedThemedText
              style={{ fontWeight: "bold", fontSize: 14 * scale }}
            >
              {progressTitle}
            </AnimatedThemedText>
          )}
        </View>
      </View>

      <ProgressLabel isLocked={isLocked} text={label} />
    </TouchableOpacity>
  );
};

export default ProgressCircle;
