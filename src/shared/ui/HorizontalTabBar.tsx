import { useState } from "react";
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
  return (
    <View className="p-1.5 gap-2 flex-row justify-between bg-light-backgroundSecondary dark:bg-dark-backgroundSurface">
      {tabs.map((tab, index) => (
        <Pressable
          key={tab.label}
          onPress={() => {
            onChange(index);
          }}
          className={`p-3 ${activeTab === index ? "bg-light-listItemBorder dark:bg-dark-selectedListItemBackground" : ""}`}
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
