import { memo } from "react";

import AnimatedThemedView from "./AnimatedThemedView";
import TabButton from "./HorizontalTab/TabButton";

type HorizontalTabBarProps = {
  tabs: { label: string; isWarning: boolean; id: string }[];
  activeTab: string;
  onChange: (id: string) => void;
};

const HorizontalTabBar: React.FC<HorizontalTabBarProps> = ({
  tabs,
  activeTab,
  onChange,
}) => {
  // ALLOW TO CHANGE TIME WITH SWIPE, ADD SWIPE-ANIMATION FOR ALL SWITCHES EVEN WITH TOUCH
  return (
    <AnimatedThemedView className="p-1 gap-2 flex-row justify-around">
      {tabs.map((tab) => (
        <TabButton
          isActive={tab.id === activeTab}
          tab={tab}
          onChange={onChange}
        />
      ))}
    </AnimatedThemedView>
  );
};

export default memo(HorizontalTabBar);
