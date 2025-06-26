import { useAnimatedColor } from "@shared/hooks/useAnimatedColor";
import { IoniconsName } from "@shared/types/commonTypes";

import { useActionModalStore } from "../ActionsModal/actionsModalStore";
import { AnimatedIonicons } from "../AnimatedComponents/AnimatedIonicons";

type TabBarIconProps = {
  iconName: IoniconsName;
  focused: boolean;
};
const TabBarIcon: React.FC<TabBarIconProps> = ({ iconName, focused }) => {
  // TODO lift it up to the layout and share with label?
  const isModalOpen = useActionModalStore((s) => s.isOpen);

  const activeColor = useAnimatedColor("tabActive", true);
  const inactiveColor = useAnimatedColor("tabInactive", true);
  const disabledColor = useAnimatedColor("tabDisabled", true);

  const resolveTextColor = (focused: boolean) => {
    if (isModalOpen) return disabledColor;
    if (focused) return activeColor;
    return inactiveColor;
  };

  return (
    <AnimatedIonicons
      name={iconName}
      size={26}
      animatedStyle={resolveTextColor(focused)}
    />
  );
};

export default TabBarIcon;
