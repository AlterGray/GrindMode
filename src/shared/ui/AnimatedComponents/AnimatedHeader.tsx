import React from "react";
import { View } from "react-native";
import Animated from "react-native-reanimated";

import { useAnimatedColor } from "@shared/hooks/useAnimatedColor";

import ThemedText from "../ThemedText";

// TODO TODO TODO RECHECK ALL TYPES, in many place you have bad ts types,
//  not like below, I mean like ColorType(keyof typeof Colors), etc
type AnimatedHeaderProps = {
  title?: string;
  headerRight?: React.ReactNode;
};

const AnimatedHeader = ({ title, headerRight }: AnimatedHeaderProps) => {
  const animatedStyles = useAnimatedColor("backgroundSurface");

  return (
    <Animated.View
      style={[animatedStyles]}
      className={
        "h-16 flex-row items-center px-4 justify-between shadow-md shadow-black"
      }
    >
      {title ? (
        <ThemedText className="text-lg font-medium">{title}</ThemedText>
      ) : null}
      {headerRight ? <View>{headerRight}</View> : null}
    </Animated.View>
  );
};

export default AnimatedHeader;
