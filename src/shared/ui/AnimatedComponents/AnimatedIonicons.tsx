import { ComponentProps } from "react";
import Animated from "react-native-reanimated";

import { Ionicons } from "@expo/vector-icons";

import { useAnimatedColor } from "@shared/hooks/useAnimatedColor";

const AnimatedIcon = Animated.createAnimatedComponent(Ionicons);

type AnimatedIoniconsProps = ComponentProps<typeof Ionicons> & {
  customColorStyle?: Partial<{ color: string }>;
};

export const AnimatedIonicons: React.FC<AnimatedIoniconsProps> = ({
  name,
  size,
  customColorStyle,
}) => {
  const colorProps = useAnimatedColor("icon", true);

  return (
    <AnimatedIcon
      name={name}
      size={size}
      style={customColorStyle ?? colorProps}
    />
  );
};
