import { ComponentProps } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

import { useThemeColors } from "@shared/hooks/useThemeColors";

type AnimatedIoniconsProps = ComponentProps<typeof Ionicons> & {
  iconColor?: string;
};

export const AnimatedIonicons: React.FC<AnimatedIoniconsProps> = ({
  name,
  size,
  iconColor,
}) => {
  const defaultIconColor = useThemeColors("icon");

  return (
    // <Text>
    <Ionicons name={name} size={size} color={iconColor || defaultIconColor} />
    // </Text>
  );
};
