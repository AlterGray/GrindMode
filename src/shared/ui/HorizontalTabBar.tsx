import { Pressable, View } from "react-native";

import ThemedText from "@shared/ui/ThemedText";

type HorizontalTabBarProps = {
  tabs: { label: string }[];
  activeTab: number;
  onChange: (index: number) => void;
};

const HorizontalTabBar: React.FC<HorizontalTabBarProps> = ({
  tabs,
  activeTab,
  onChange,
}) => {
  // ALLOW TO CHANGE TIME WITH SWIPE, ADD SWIPE-ANIMATION FOR ALL SWITCHES EVEN WITH TOUCH
  return (
    <View className="p-1 gap-2 flex-row justify-around bg-light-backgroundSecondary dark:bg-dark-backgroundSurface">
      {tabs.map((tab, index) => (
        <Pressable
          key={tab.label}
          onPress={() => {
            onChange(index);
          }}
          className={`p-2 flex-1 ${activeTab === index ? "bg-light-listItemBorder dark:bg-dark-selectedListItemBackground" : ""}`}
        >
          <ThemedText className="text-center font-medium">
            {tab.label}
          </ThemedText>
        </Pressable>
      ))}
    </View>
  );
};

export default HorizontalTabBar;
