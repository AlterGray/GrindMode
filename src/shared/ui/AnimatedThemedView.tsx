import { View, ViewProps } from "react-native";
import Animated from "react-native-reanimated";

import { useAnimatedColor } from "@shared/hooks/useAnimatedColor";

export type ThemedViewProps = ViewProps & {
  className?: string;
  children?: React.ReactNode;
  ref?: React.RefObject<View | null>;
};

const AnimatedThemedView: React.FC<ThemedViewProps> = ({
  children,
  className = "",
  ref,
  ...props
}) => {
  const animatedBgColor = useAnimatedColor("backgroundSurface");
  return (
    <Animated.View
      style={animatedBgColor}
      ref={ref}
      className={className}
      {...props}
    >
      {children ? children : null}
    </Animated.View>
  );
};

export default AnimatedThemedView;
