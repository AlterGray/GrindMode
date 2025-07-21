import Animated from "react-native-reanimated";

import { useAnimatedColor } from "@shared/hooks/useAnimatedColor";

type AnimatedTabBarLabelProps = {
  children: React.ReactNode;
  focused: boolean;
};

const AnimatedTabBarLabel = ({
  children,
  focused,
}: AnimatedTabBarLabelProps) => {
  const animatedActiveColor = useAnimatedColor("tabActive", true);
  const animatedInactiveColor = useAnimatedColor("tabInactive", true);
  const textColor = focused ? animatedActiveColor : animatedInactiveColor;
  return (
    <Animated.Text key={focused.toString()} style={textColor}>
      {children}
    </Animated.Text>
  );
};

export default AnimatedTabBarLabel;
