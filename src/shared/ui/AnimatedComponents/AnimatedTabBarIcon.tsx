import { Ionicons } from "@expo/vector-icons";

import { useAnimatedColor } from "@shared/hooks/useAnimatedColor";
import { AnimatedIonicons } from "@shared/ui/AnimatedComponents/AnimatedIonicons";

type AnimatedTabBarIconProps = {
  size: number;
  focused: boolean;
  icon: keyof typeof Ionicons.glyphMap;
};

const AnimatedTabBarIcon = ({
  size,
  focused,
  icon,
}: AnimatedTabBarIconProps) => {
  const animatedActiveColor = useAnimatedColor("tabActive", true);
  const animatedInactiveColor = useAnimatedColor("tabInactive", true);
  const iconColor = focused ? animatedActiveColor : animatedInactiveColor;
  return (
    <AnimatedIonicons name={icon} size={size} animatedIconColor={iconColor} />
  );
};

export default AnimatedTabBarIcon;
