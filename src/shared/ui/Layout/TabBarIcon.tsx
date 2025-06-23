import { useThemedAnimatedProps } from "@shared/hooks/useThemedAnimatedProps";
import { IoniconsName } from "@shared/types/commonTypes";

import { AnimatedIonicons } from "../AnimatedComponents/AnimatedIonicons";

type TabBarIconProps = {
  iconName: IoniconsName;
  animatedColor: ReturnType<typeof useThemedAnimatedProps>;
};
const TabBarIcon: React.FC<TabBarIconProps> = ({ iconName, animatedColor }) => {
  return (
    <AnimatedIonicons
      name={iconName}
      size={26}
      customColorProps={animatedColor}
    />
  );
};

export default TabBarIcon;
