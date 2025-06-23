import React from "react";
import Animated from "react-native-reanimated";

import { useAnimatedColor } from "@shared/hooks/useAnimatedColor";

type TabBarLabelProps = {
  label: string;
  focused: boolean;
};
const TabBarLabel: React.FC<TabBarLabelProps> = ({ label, focused }) => {
  const animatedColor = useAnimatedColor(
    focused ? "tabActive" : "tabInactive",
    true,
  );
  return (
    <Animated.Text style={animatedColor} className={`text-sm`}>
      {label}
    </Animated.Text>
  );
};

export default React.memo(TabBarLabel, (prev, next) => {
  return prev.label === next.label && prev.focused === next.focused;
});
