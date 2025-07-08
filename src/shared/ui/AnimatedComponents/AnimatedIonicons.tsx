import { ComponentProps } from "react";
import Animated from "react-native-reanimated";

import { Ionicons } from "@expo/vector-icons";

import { useAnimatedColor } from "@shared/hooks/useAnimatedColor";

type AnimatedIoniconsProps = ComponentProps<typeof Ionicons> & {
  animatedIconColor?: Partial<{ color: string }>;
};

export const AnimatedIonicons: React.FC<AnimatedIoniconsProps> = ({
  name,
  size,
  animatedIconColor,
}) => {
  const defaultIconColor = useAnimatedColor("icon", true);

  return (
    <Animated.Text style={animatedIconColor || defaultIconColor}>
      <Ionicons name={name} size={size} />
    </Animated.Text>
  );
};
