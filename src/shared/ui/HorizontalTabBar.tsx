import { Pressable, View } from "react-native";

import { Tooltip } from "@features/rituals/Tooltip";

import ThemedText from "@shared/ui/ThemedText";

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
    <View className="p-1 gap-2 flex-row justify-around bg-light-backgroundSecondary dark:bg-dark-backgroundSurface">
      {tabs.map((tab) => (
        <Pressable
          key={tab.label}
          onPress={() => {
            onChange(tab.id);
          }}
          className={`flex-row justify-around p-2 flex-auto ${activeTab === tab.id ? "bg-light-listItemBorder dark:bg-dark-selectedListItemBackground" : ""}`}
        >
          <ThemedText className="text-center font-medium">
            {tab.label}
          </ThemedText>
          {/* TODO change colors as it hard to see */}
          {tab.isWarning && tab.id === activeTab && (
            <Tooltip
              text="You don't have enough completitions for this time period"
              iconColor="#555"
              iconName="alert-circle-outline"
              variant="warning"
            />
          )}
        </Pressable>
      ))}
    </View>
  );
};

export default HorizontalTabBar;
