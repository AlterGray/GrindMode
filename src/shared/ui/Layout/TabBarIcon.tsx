import { useAnimatedColor } from "@shared/hooks/useAnimatedColor";
import { IoniconsName } from "@shared/types/commonTypes";

import { AnimatedIonicons } from "../AnimatedComponents/AnimatedIonicons";

type TabBarIconProps = {
  iconName: IoniconsName;
  animatedColor: ReturnType<typeof useAnimatedColor>;
  color?: string;
};
const TabBarIcon: React.FC<TabBarIconProps> = ({
  iconName,
  animatedColor,
  color,
}) => {
  return (
    <AnimatedIonicons
      name={iconName}
      size={26}
      customColorProps={animatedColor}
      color={color}
    />
  );
};

export default TabBarIcon;
