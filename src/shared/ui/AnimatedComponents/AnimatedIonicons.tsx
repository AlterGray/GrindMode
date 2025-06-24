import { ComponentProps } from "react";
import Animated from "react-native-reanimated";

import { Ionicons } from "@expo/vector-icons";

import { useThemedAnimatedProps } from "@shared/hooks/useThemedAnimatedProps";

const AnimatedIcon = Animated.createAnimatedComponent(Ionicons);

type AnimatedIoniconsProps = ComponentProps<typeof Ionicons> & {
  customColorProps?: Partial<{ color: string }>;
};

export const AnimatedIonicons: React.FC<AnimatedIoniconsProps> = ({
  name,
  size,
  customColorProps,
}) => {
  const colorProps = useThemedAnimatedProps("icon");

  return (
    <AnimatedIcon
      name={name}
      size={size}
      animatedProps={customColorProps ?? colorProps}
    />
  );
};
