import { View, ViewProps } from "react-native";
import Animated from "react-native-reanimated";

import { useAnimatedColor } from "@shared/hooks/useAnimatedColor";

export type ThemedViewProps = ViewProps & {
  className?: string;
  children?: React.ReactNode;
  ref?: React.RefObject<View | null>;
  backgroundColor?: "surface" | "secondary" | "normal";
};

const AnimatedThemedView: React.FC<ThemedViewProps> = ({
  children,
  className = "",
  ref,
  backgroundColor = "surface",
  ...props
}) => {
  const backgroundColorMap: Record<
    "surface" | "secondary" | "normal",
    "backgroundSurface" | "backgroundSecondary" | "background"
  > = {
    surface: "backgroundSurface",
    secondary: "backgroundSecondary",
    normal: "background",
  };

  const animatedBgColor = useAnimatedColor(backgroundColorMap[backgroundColor]);

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
