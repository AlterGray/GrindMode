import { ComponentProps } from "react";
import Animated from "react-native-reanimated";
import Ionicons from "react-native-vector-icons/Ionicons";

import { useAnimatedColor } from "@shared/hooks/useAnimatedColor";

type AnimatedIoniconsProps = ComponentProps<typeof Ionicons> & {
  animatedStyle?: Partial<{ color: string }>;
};

export const AnimatedIonicons: React.FC<AnimatedIoniconsProps> = ({
  name,
  size,
  animatedStyle,
}) => {
  const colorProps = useAnimatedColor("icon", true);

  return (
    <Animated.Text style={animatedStyle ?? colorProps}>
      <Ionicons name={name} size={size} />
    </Animated.Text>
  );
};
