import { Tooltip } from "@features/rituals/Tooltip";

import { useAnimatedColor } from "@shared/hooks/useAnimatedColor";
import { i18n } from "@shared/lib/utils/i18n/i18n-js";
import AnimatedThemedText from "@shared/ui/AnimatedThemedText";

import { AnimatedPressable } from "./AnimatedComponents/AnimatedReactComponents";
import AnimatedThemedView from "./AnimatedThemedView";

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
  const getAnimatedActiveBgColor = (active: boolean) =>
    useAnimatedColor(active ? "horizontalTabBackground" : "backgroundSurface");

  // ALLOW TO CHANGE TIME WITH SWIPE, ADD SWIPE-ANIMATION FOR ALL SWITCHES EVEN WITH TOUCH
  return (
    <AnimatedThemedView className="p-1 gap-2 flex-row justify-around">
      {tabs.map((tab) => (
        <AnimatedPressable
          key={tab.id}
          style={getAnimatedActiveBgColor(activeTab === tab.id)}
          onPress={() => {
            onChange(tab.id);
          }}
          className={"flex-row justify-around p-2 flex-auto"}
        >
          <AnimatedThemedText className="text-center font-medium">
            {tab.label}
          </AnimatedThemedText>
          {/* TODO change colors as it hard to see */}
          {tab.isWarning && tab.id === activeTab && (
            <Tooltip
              text={i18n.t("dontHaveEnoughtDays")}
              iconName="alert-circle-outline"
              variant="warning"
            />
          )}
        </AnimatedPressable>
      ))}
    </AnimatedThemedView>
  );
};

export default HorizontalTabBar;
