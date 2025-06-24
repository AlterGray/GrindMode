import { useAnimatedColor } from "@shared/hooks/useAnimatedColor";
import { IoniconsName } from "@shared/types/commonTypes";

import { AnimatedIonicons } from "../AnimatedComponents/AnimatedIonicons";

type TabBarIconProps = {
  iconName: IoniconsName;
  animatedColor: ReturnType<typeof useAnimatedColor>;
};
const TabBarIcon: React.FC<TabBarIconProps> = ({ iconName, animatedColor }) => {
  return (
    <AnimatedIonicons
      name={iconName}
      size={26}
      customColorStyle={animatedColor}
    />
  );
};

export default TabBarIcon;
