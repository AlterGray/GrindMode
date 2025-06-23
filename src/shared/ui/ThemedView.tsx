import { View, ViewProps } from "react-native";
import Animated from "react-native-reanimated";

import { useAnimatedColor } from "@shared/hooks/useAnimatedColor";

export type ThemedViewProps = ViewProps & {
  className?: string;
  children?: React.ReactNode;
  ref?: React.RefObject<View | null>;
};

const ThemedView: React.FC<ThemedViewProps> = ({
  children,
  className = "",
  ref,
  ...props
}) => {
  const animatedStyles = useAnimatedColor("background");

  return (
    <Animated.View
      ref={ref}
      style={animatedStyles}
      className={className}
      {...props}
    >
      {children ? children : null}
    </Animated.View>
  );
};

export default ThemedView;
